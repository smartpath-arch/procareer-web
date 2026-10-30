# Official HR Directory — SmartPath, SkillSpace & ProCareer

Public pages listing the official HR contacts (name and phone), so candidates can check whether someone contacting them is listed.
The data lives in a **Google Sheet**. The pages come from a **Google Apps Script Web App** that reads the sheet. Edit the sheet and the pages update by themselves, with no code changes.
It does not depend on any program's backend.

## Three branded pages, one project

One deployment serves a separate page for each program. The content, wording and layout are identical. Only the name, logo and colors change, matching each program's website:

| Program    | Page address                       | Colors                              |
| ---------- | ---------------------------------- | ----------------------------------- |
| SmartPath  | `<web app URL>?program=smartpath`  | Dark blue + yellow (smartpath.id)   |
| SkillSpace | `<web app URL>?program=skillspace` | Light blue + white (skillspace.id)  |
| ProCareer  | `<web app URL>?program=procareer`  | Purple + soft yellow (procareer.id) |

Link each program's website to its own address.
A URL without `?program=`, or with an unknown value, shows the SmartPath page (`CONFIG.DEFAULT_PROGRAM`).
All three read the **same `HR_Directory` sheet**, so one edit updates all three pages.

- **Names and logos:** `PROGRAMS` in `Code.gs`. The logos load from each program's own website. If one fails to load, the name appears as text instead.
- **Colors:** the _PROGRAM THEMES_ block at the top of `Index.html`'s `<style>`, one block per program.

## Files

| File         | Goes into Apps Script?                 | What it does                                                                                     |
| ------------ | -------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `Code.gs`    | **Yes**                                | Backend: settings (`CONFIG`, `PROGRAMS`), serves the pages, reads the sheet, one-time setup.     |
| `Index.html` | **Yes**, as an HTML file named `Index` | The page: layout, the three color themes, and the script that loads and refreshes the directory. |
| `preview.js` | No                                     | Local preview with fake data (see _Running it locally_).                                         |
| `README.md`  | No                                     | This guide.                                                                                      |

## How it works

```
Google Sheet (HR_Directory)  →  Code.gs getHRDirectory()  →  Index.html (visitor's browser)
   edited by HR/admins           runs as the owner account      calls it on open + every 60 s
```

- The page asks the server for the directory as soon as it opens, then again every 60 seconds.
- The server returns only **Name and Phone** for rows where **Active** is ticked. IDs, PhotoURL, the Active column and the spreadsheet ID never reach the browser.
- The server remembers each read for 20 seconds (`CONFIG.CACHE_SECONDS`), so many visitors don't each hit the sheet.
  **An edit in the sheet therefore appears on open pages within about 1–1.5 minutes.** It is not instant.
- While a visitor's tab is in the background, it stops checking and checks again when they return.

---

## Setup (one time)

### 1. Create the Google Sheet

1. Go to **sheets.google.com** and create a blank spreadsheet, e.g. _SmartPath HR Directory_.
   Create it with the account that will own the website, ideally a SmartPath team account rather than a personal one.
2. You can let the script build the tab for you (step 4), or do it by hand:
   - Rename the tab at the bottom to `HR_Directory`.
   - In row 1, type the headers `ID`, `Name`, `Phone`, `PhotoURL`, `Active` (columns A–E).
   - Select column C, then **Format → Number → Plain text**. _Do this before typing numbers_, or Sheets drops the leading 0.
   - Select E2 downwards, then **Insert → Checkbox**.
   - Enter the five records and tick **Active** for each.

| ID  | Name               | Phone          | PhotoURL | Active |
| --- | ------------------ | -------------- | -------- | ------ |
| 1   | Bramantyo Adiyatma | 0813-8904-8345 |          | ☑     |
| 2   | Hikmah Sabrina     | 0857-4596-1430 |          | ☑     |
| 3   | Aulia Sisma        | 0857-4868-0052 |          | ☑     |
| 4   | Annisa Sumangun    | 0851-7973-1332 |          | ☑     |
| 5   | Mira Anastasia     | 0896-3594-2751 |          | ☑     |

### 2. Copy the spreadsheet ID

The ID is the long code in the sheet's address bar:

```
https://docs.google.com/spreadsheets/d/1AbCdEfGhIjKlMnOpQrStUvWxYz0123456789/edit#gid=0
                                       └──────────── spreadsheet ID ────────────┘
```

### 3. Create the Apps Script project

1. In the sheet, choose **Extensions → Apps Script**. This creates a script attached to the sheet. That's the recommended way.
   (A standalone project from **script.google.com** also works. Then the spreadsheet ID in the next step is required.)
2. Rename the project, e.g. _SmartPath HR Directory_.
3. Open `Code.gs`, delete the sample code, paste in this repo's `Code.gs`.
4. Click **+ → HTML**, name it `Index` (the editor adds `.html`), delete its contents, and paste in this repo's `Index.html`.
5. In `Code.gs`, paste the ID between the quotes:
   ```js
   SPREADSHEET_ID: '1AbCdEfGhIjKlMnOpQrStUvWxYz0123456789',
   ```
6. Save with **Ctrl+S**.

### 4. Run the setup function

1. In the toolbar's function menu, choose **`setupHRDirectory`**, then click **Run**.
2. The first time, Google asks for permission. Click **Review permissions**, pick the owner account, and choose **Allow**.
   For an unverified script, click **Advanced → Go to … (unsafe)**. That's normal for your own script.
3. Check the **Execution log**. It should say _Setup complete_ and show the spreadsheet link.

The setup:

- creates the `HR_Directory` tab and header row if missing
- formats Phone as plain text and Active as checkboxes
- inserts the 5 records **only if the tab has no records yet**

Running it again never overwrites or duplicates anything.
If `SPREADSHEET_ID` is empty and the script isn't attached to a sheet, setup creates a new spreadsheet once and reuses it afterwards. The log prints its ID; paste that into `CONFIG` anyway.

### 5. Deploy as a Web App

1. **Deploy → New deployment**, gear icon, then **Web app**.
2. Set:
   - **Description:** `v1`
   - **Execute as: Me (owner account)**
   - **Who has access: Anyone**
3. Click **Deploy** and copy the **Web app URL** (ending in `/exec`).
4. Add the program to the end of the URL for each website:
   - SmartPath → `…/exec?program=smartpath`
   - SkillSpace → `…/exec?program=skillspace`
   - ProCareer → `…/exec?program=procareer`
5. Open each address in an **incognito window**. Each should load without a sign-in, in its own colors.

### 6. Updating the code later

Edit, save, then **Deploy → Manage deployments → ✏️ → Version: New version → Deploy**.
Always edit the existing deployment. A _new_ deployment gets a different URL, which would break the links on the three websites.
**Changing HR records never needs a redeploy.** Just edit the sheet.

---

## Security and permissions

There are two different accounts involved:

|                                             | Owner account (deploys the app)          | Public visitor                  |
| ------------------------------------------- | ---------------------------------------- | ------------------------------- |
| Opens the spreadsheet?                      | Yes, the script reads it as this account | **No**, never touches the sheet |
| Sees the spreadsheet ID / internal columns? | Yes                                      | **No**, only name, phone, photo |
| Can change records?                         | Yes, in Google Sheets                    | **No**                          |

- **Execute as: Me** lets the script read the sheet with the owner's access. The sheet's own sharing can stay restricted to HR/admins, so do **not** share the sheet publicly.
- Visitors can call only two functions: `doGet` (the page) and `getHRDirectory` (read-only).
  `setupHRDirectory` checks who is running it and refuses unless it's run from the editor. Every other function ends in `_`, which Apps Script keeps private.
- No API keys or credentials are in the page. Errors show visitors a generic message. The details go to **Apps Script → Executions** for the owner.

**Things that can block public access. Check them before going live:**

- A **Google Workspace admin may hide "Anyone"**, allowing only "Anyone within _organization_". Candidates outside SmartPath would then be asked to sign in.
  Ask IT to allow public web apps, or deploy from an account that may publish them.
- If the owner account loses access to the sheet, or is deleted, the page stops working. Use a long-lived team account.
- Google shows a small banner on Apps Script pages. It can't be removed.

---

## Managing HR records (for HR/admins)

Everything is done in the `HR_Directory` tab.

| To…                    | Do this                                                             |
| ---------------------- | ------------------------------------------------------------------- |
| Add an HR              | Add a row: new ID, Name, Phone, optional PhotoURL, tick **Active**. |
| Hide an HR temporarily | Untick **Active**.                                                  |
| Remove an HR           | Delete the row, or untick Active to keep a record.                  |
| Change order           | Rows show in sheet order (top to bottom). Move the row.             |

- Type phone numbers as text, e.g. `0813-8904-8345`.
  If one was typed as a number, the site restores the leading 0 and logs a warning, but fix the cell.
- Only rows with Name, Phone **and** Active ticked are shown.
- Column order can change, and headers are matched by name. Don't rename the headers.

## Profile photos

The current card design is **text-only (name and phone)**, and `getHRDirectory()` does not send `PhotoURL` to the page.
The `PhotoURL` column is kept in the sheet for later. Showing photos again needs `photoUrl` added back in `readActiveContacts_()` (Code.gs) and an image in the card (Index.html).
The notes below apply when that happens.

The `PhotoURL` must be a link that opens the image **in an incognito window, with no sign-in**, starting with `https://`.

**Recommended:** host the photos on SmartPath's own website, CMS or CDN, then paste each image's direct link (right-click the image → _Copy image address_).

**Google Drive works, with caveats:**

1. The file must be shared as **Anyone with the link → Viewer**. A private Drive file will _not_ display, because visitors aren't signed in to your account.
   Many Workspace organizations block "Anyone with the link" sharing. Check with IT first.
2. Paste the normal Drive share link into `PhotoURL`. The script converts it to a direct image link (`https://lh3.googleusercontent.com/d/<FILE_ID>`).
3. That direct-image format isn't an officially documented Google API and could change. Your own hosting is more reliable.

**Get the people's and organization's consent** before publishing HR photos on a public page.

---

## Running it locally

Double-clicking `Index.html` shows raw template code, because Apps Script normally fills it in. Use the preview instead (needs [Node.js](https://nodejs.org)):

```bash
node preview.js
```

Open the address it prints (usually http://localhost:3000; if 3000 is busy it uses 3001, 3002…).
The preview uses **fake sample data**, not your Google Sheet. It reads `PROGRAMS` from `Code.gs`, so names and logos match the real app.

| Address                                     | Shows                                                            |
| ------------------------------------------- | ---------------------------------------------------------------- |
| `/?program=smartpath`                       | SmartPath page                                                   |
| `/?program=skillspace`                      | SkillSpace page                                                  |
| `/?program=procareer`                       | ProCareer page                                                   |
| `/?program=procareer&state=empty`           | No active records                                                |
| `/?program=procareer&state=error`           | Sheet unreachable on first load                                  |
| `/?program=procareer&state=flaky&refresh=3` | First load works, later refreshes fail (last data stays visible) |
| `/?program=procareer&state=slow`            | Loading skeleton                                                 |

## Testing checklist (on the deployed `/exec` URL)

- [ ] Each of the three `?program=` addresses opens in incognito with no sign-in, with the right logo, colors and tab title (_List HRD Resmi SmartPath / SkillSpace / ProCareer_).
- [ ] All active records show with correct name and phone on all three pages. No WhatsApp buttons, search or forms.
- [ ] Untick **Active** for one person in the sheet. Within about 1–1.5 minutes they disappear from an open page, without refreshing.
- [ ] Tick it again and they reappear. Edit a name and the change appears.
- [ ] Untick everyone: an empty message shows. Re-tick them afterwards.
- [ ] On a phone: one card per row, no sideways scrolling, numbers readable.
- [ ] Each program's website links to its own `?program=` address.
- [ ] **Apps Script → Executions** shows no repeated errors.

## Troubleshooting

| Symptom                                    | Likely cause                                                                                                         |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| "Daftar HR belum dapat dimuat"             | Wrong `SPREADSHEET_ID`, tab not named `HR_Directory`, or a missing header. Check **Executions** for the exact error. |
| Visitors asked to sign in                  | Deployment access isn't **Anyone**, or Workspace policy blocks it.                                                   |
| Phone missing its leading 0                | Column C isn't Plain text. Format it and retype the number.                                                          |
| Wrong colors / always SmartPath            | The link is missing `?program=…` or has a typo. Check the link on that program's website.                            |
| Program name shows as text instead of logo | The logo URL in `PROGRAMS` (Code.gs) moved or is blocked. Update it to the current logo address.                     |
| Code change not visible                    | You saved but didn't deploy a **new version** of the existing deployment.                                            |
