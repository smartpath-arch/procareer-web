/**
 * Official HR Directory — SmartPath, SkillSpace & ProCareer
 * Google Apps Script Web App that reads its data from a Google Sheet.
 *
 * One deployment serves three branded pages, chosen by the URL:
 *   <web app URL>?program=smartpath
 *   <web app URL>?program=skillspace
 *   <web app URL>?program=procareer
 * All three show the same HR list from the same sheet; only the name, logo
 * and colors differ (colors are in Index.html, "PROGRAM THEMES").
 *
 * Functions the web page can call (through google.script.run):
 *   doGet(e)           serves the page
 *   getHRDirectory()   returns the active HR records (name, phone, photo only)
 *
 * Admin-only function, run by hand from the Apps Script editor:
 *   setupHRDirectory() creates / prepares the HR_Directory sheet
 *   (it refuses to run when called from the public page)
 *
 * Every other function name ends with "_". Apps Script treats those as
 * private, so the public page cannot call them.
 */

/* ================================ CONFIG ================================ */

const CONFIG = {
  // ID of the Google Sheet that holds the directory. It is the long code in
  // the sheet's address:
  //   https://docs.google.com/spreadsheets/d/1Icw37A3yJDyU8gpOTUsRKCtJyOwTxZ_zeDdVViZvIDk/edit
  // Leave '' only if setupHRDirectory() should find or create the sheet for
  // you (see README.md).
  SPREADSHEET_ID: '1Icw37A3yJDyU8gpOTUsRKCtJyOwTxZ_zeDdVViZvIDk',

  // Name of the tab (worksheet) inside that spreadsheet.
  SHEET_NAME: 'HR_Directory',

  // Seconds the server reuses one read of the sheet before reading it again.
  // The page re-checks every 60 seconds, so with 20 here an edit in the sheet
  // shows up on open pages within about 1–1.5 minutes. 0 turns caching off.
  CACHE_SECONDS: 20,

  // Program shown when the URL has no (or an unknown) ?program= value.
  DEFAULT_PROGRAM: 'smartpath'
};

// The three branded versions of the page. The key is the ?program= value.
// logoUrl: the official logo from each program's own website. If it ever
// fails to load, the page shows the program name as text instead.
const PROGRAMS = {
  smartpath: {
    name: 'SmartPath',
    logoUrl: 'https://smartpath.id/assets/common/navbar/logo-smartpath.svg'
  },
  skillspace: {
    name: 'SkillSpace',
    logoUrl: 'https://skillspace.id/assets/common/navbar/logoheaderskillspace.svg'
  },
  procareer: {
    name: 'ProCareer',
    logoUrl: 'https://procareer.id/assets/common/navbar/logonavbarprocareer.svg'
  }
};

/* ======================================================================== */

const HEADERS = ['ID', 'Name', 'Phone', 'PhotoURL', 'Active'];

// Inserted by setupHRDirectory() only when the sheet has no records yet.
const INITIAL_RECORDS = [
  [1, 'Bramantyo Adiyatma', '0813-8904-8345', '', true],
  [2, 'Hikmah Sabrina',     '0857-4596-1430', '', true],
  [3, 'Aulia Sisma',        '0857-4868-0052', '', true],
  [4, 'Annisa Sumangun',    '0851-7973-1332', '', true],
  [5, 'Mira Anastasia',     '0896-3594-2751', '', true]
];

const CACHE_KEY = 'hr_directory_v1';
const SPREADSHEET_ID_PROPERTY = 'HR_DIRECTORY_SPREADSHEET_ID';

/* ============================== WEB APP ================================= */

function doGet(e) {
  // Accepts both  …/exec?program=skillspace  and  …/exec/skillspace
  const requested = (e && e.parameter && e.parameter.program) || (e && e.pathInfo) || '';
  const program = getProgram_(requested);
  const template = HtmlService.createTemplateFromFile('Index');
  template.program = program;
  template.year = new Date().getFullYear();
  return template.evaluate()
    .setTitle('List HRD Resmi ' + program.name)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * Returns the HR records marked Active, in sheet order, as
 *   [{ name: '...', phone: '...' }, ...]
 * Nothing else from the sheet (IDs, the Active flag, the spreadsheet ID) is
 * sent to the browser. Errors are logged in full for the owner and reported
 * to the visitor only as a generic message.
 */
function getHRDirectory() {
  const cached = readCache_();
  if (cached) return cached;

  try {
    const contacts = readActiveContacts_();
    writeCache_(contacts);
    return contacts;
  } catch (err) {
    console.error('getHRDirectory failed: ' + (err && err.stack ? err.stack : err));
    throw new Error('Directory is temporarily unavailable.');
  }
}

/* ============================ ADMIN SETUP =============================== */

/**
 * Run this once from the Apps Script editor (select it, click Run).
 * Safe to run again: it never overwrites or duplicates existing records.
 *  1. Opens the spreadsheet (CONFIG.SPREADSHEET_ID, the sheet this script is
 *     attached to, or a new spreadsheet if neither exists).
 *  2. Creates the HR_Directory tab if missing and writes the header row.
 *  3. Formats Phone as plain text so leading zeros are kept.
 *  4. Turns the Active column into checkboxes.
 *  5. Inserts the five initial HR records only if the tab has no records.
 */
function setupHRDirectory() {
  assertRunFromEditor_();

  const spreadsheet = getSpreadsheet_(true);
  let sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME);
    console.log('Created tab "' + CONFIG.SHEET_NAME + '".');
  }

  // Plain-text Phone column must be set before any number is written.
  sheet.getRange('C:C').setNumberFormat('@');

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    console.log('Wrote header row.');
  } else {
    const current = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1)).getValues()[0];
    const columns = findColumns_(current);
    const missing = HEADERS.filter(function (h) { return columns[h] === -1 && h !== 'ID'; });
    if (missing.length) {
      console.warn('Header row is missing: ' + missing.join(', ') +
        '. Add these column names to row 1 — existing data was not changed.');
    }
  }

  sheet.getRange(1, 1, 1, HEADERS.length)
    .setFontWeight('bold')
    .setBackground('#E6EDFF');
  sheet.setFrozenRows(1);

  if (String(sheet.getRange('E1').getValue()).trim().toLowerCase() === 'active' && sheet.getMaxRows() > 1) {
    sheet.getRange(2, 5, sheet.getMaxRows() - 1, 1)
      .setDataValidation(SpreadsheetApp.newDataValidation().requireCheckbox().build());
  }

  if (sheet.getLastRow() <= 1) {
    sheet.getRange(2, 1, INITIAL_RECORDS.length, HEADERS.length).setValues(INITIAL_RECORDS);
    console.log('Inserted ' + INITIAL_RECORDS.length + ' initial HR records.');
  } else {
    console.log('Records already exist — initial records were not inserted.');
  }

  sheet.setColumnWidth(2, 220);
  sheet.setColumnWidth(3, 150);
  sheet.setColumnWidth(4, 320);
  clearCache_();

  console.log('Setup complete.\nSpreadsheet: ' + spreadsheet.getUrl() +
    '\nSpreadsheet ID: ' + spreadsheet.getId() +
    (CONFIG.SPREADSHEET_ID ? '' :
      '\nTip: paste this ID into CONFIG.SPREADSHEET_ID in Code.gs so the setup is explicit.'));
}

/* ============================== HELPERS ================================= */

/* "SkillSpace" or "skillspace/" -> { id: 'skillspace', name: 'SkillSpace', logoUrl: '...' }.
   Unknown or missing values fall back to CONFIG.DEFAULT_PROGRAM. */
function getProgram_(value) {
  const key = String(value || '').trim().toLowerCase().replace(/^\/+|\/+$/g, '');
  const id = Object.prototype.hasOwnProperty.call(PROGRAMS, key) ? key : CONFIG.DEFAULT_PROGRAM;
  return { id: id, name: PROGRAMS[id].name, logoUrl: PROGRAMS[id].logoUrl || '' };
}

/**
 * Finds the spreadsheet, in this order:
 *   CONFIG.SPREADSHEET_ID → the ID saved by an earlier setup run →
 *   the spreadsheet this script is attached to → (setup only) a new one.
 */
function getSpreadsheet_(createIfMissing) {
  if (CONFIG.SPREADSHEET_ID) {
    return SpreadsheetApp.openById(String(CONFIG.SPREADSHEET_ID).trim());
  }

  const props = PropertiesService.getScriptProperties();
  const savedId = props.getProperty(SPREADSHEET_ID_PROPERTY);
  if (savedId) return SpreadsheetApp.openById(savedId);

  const attached = SpreadsheetApp.getActiveSpreadsheet();
  if (attached) {
    props.setProperty(SPREADSHEET_ID_PROPERTY, attached.getId());
    return attached;
  }

  if (!createIfMissing) {
    throw new Error('No spreadsheet configured. Set CONFIG.SPREADSHEET_ID in Code.gs or run setupHRDirectory().');
  }

  const created = SpreadsheetApp.create('SmartPath HR Directory');
  created.getSheets()[0].setName(CONFIG.SHEET_NAME);
  props.setProperty(SPREADSHEET_ID_PROPERTY, created.getId());
  console.log('Created a new spreadsheet: ' + created.getUrl());
  return created;
}

function readActiveContacts_() {
  const sheet = getSpreadsheet_(false).getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    throw new Error('Tab "' + CONFIG.SHEET_NAME + '" not found. Run setupHRDirectory() or check CONFIG.SHEET_NAME.');
  }

  const values = sheet.getDataRange().getValues(); // the single read per refresh
  if (values.length < 2) return [];

  const col = findColumns_(values[0]);
  const missing = ['Name', 'Phone', 'Active'].filter(function (h) { return col[h] === -1; });
  if (missing.length) {
    throw new Error('Header row is missing column(s): ' + missing.join(', '));
  }

  const contacts = [];
  for (let r = 1; r < values.length; r++) {
    const row = values[r];
    const rowNumber = r + 1;
    if (!isActive_(row[col.Active])) continue;

    const name = cleanText_(row[col.Name], 120);
    const phone = cleanPhone_(row[col.Phone], rowNumber);
    if (!name || !phone) {
      console.warn('Row ' + rowNumber + ' is Active but has no Name or Phone — skipped.');
      continue;
    }

    contacts.push({
      name: name,
      phone: phone,
    });
  }
  return contacts;
}

/* Maps header names to column indexes (-1 if absent). Case, spaces and
   underscores are ignored, so "Photo URL" and "photo_url" both work. */
function findColumns_(headerRow) {
  const normalized = headerRow.map(function (h) {
    return String(h).toLowerCase().replace(/[\s_]/g, '');
  });
  const columns = {};
  HEADERS.forEach(function (h) {
    columns[h] = normalized.indexOf(h.toLowerCase());
  });
  return columns;
}

function isActive_(value) {
  if (value === true) return true;
  return /^(true|yes|ya|1|aktif|benar)$/i.test(String(value).trim());
}

function cleanText_(value, maxLength) {
  return String(value == null ? '' : value).replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

/* Phone cells should be plain text. If one was typed as a number, Sheets has
   already dropped the leading 0 — restore it and warn the admin. */
function cleanPhone_(value, rowNumber) {
  if (typeof value === 'number') {
    let digits = String(Math.trunc(value));
    if (digits.charAt(0) !== '0' && digits.indexOf('62') !== 0) digits = '0' + digits;
    console.warn('Row ' + rowNumber + ': Phone is stored as a number. Format column C as Plain text and retype it (e.g. 0813-8904-8345).');
    return digits;
  }
  return cleanText_(value, 40);
}

/* Accepts only https links. Google Drive "share" links are converted to a
   direct image link (the file must still be shared for viewing). */
function cleanPhotoUrl_(value, rowNumber) {
  const url = cleanText_(value, 2000);
  if (!url) return '';

  const drive = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:[^#]*&)?id=)([\w-]{20,})/);
  if (drive) return 'https://lh3.googleusercontent.com/d/' + drive[1];

  if (!/^https:\/\/\S+$/i.test(url)) {
    console.warn('Row ' + rowNumber + ': PhotoURL must start with https:// — ignored.');
    return '';
  }
  return url;
}

/* setupHRDirectory() runs as the web app owner when called from the public
   page, so it must refuse unless the person running it IS that account —
   which is only the case in the Apps Script editor. */
function assertRunFromEditor_() {
  const activeUser = Session.getActiveUser().getEmail();
  const effectiveUser = Session.getEffectiveUser().getEmail();
  if (!activeUser || activeUser !== effectiveUser) {
    throw new Error('setupHRDirectory() can only be run from the Apps Script editor.');
  }
}

function readCache_() {
  if (!(CONFIG.CACHE_SECONDS > 0)) return null;
  try {
    const json = CacheService.getScriptCache().get(CACHE_KEY);
    return json ? JSON.parse(json) : null;
  } catch (err) {
    console.warn('Cache read failed: ' + err);
    return null;
  }
}

function writeCache_(contacts) {
  if (!(CONFIG.CACHE_SECONDS > 0)) return;
  try {
    const json = JSON.stringify(contacts);
    if (json.length < 90000) { // CacheService values are limited to 100 KB
      CacheService.getScriptCache().put(CACHE_KEY, json, CONFIG.CACHE_SECONDS);
    }
  } catch (err) {
    console.warn('Cache write failed: ' + err);
  }
}

function clearCache_() {
  try {
    CacheService.getScriptCache().remove(CACHE_KEY);
  } catch (err) {
    console.warn('Cache clear failed: ' + err);
  }
}
