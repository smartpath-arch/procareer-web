/**
 * Local preview server — for development only. Do NOT copy into Apps Script.
 *
 * On Apps Script, Index.html is filled in by Google (the <? ?> tags) and gets
 * its HR data from the Google Sheet through google.script.run. Neither exists
 * on your computer, so this script:
 *   1. renders the <? ?> tags the way Apps Script does, and
 *   2. adds a fake google.script.run that returns SAMPLE data below.
 *
 * Usage:  node preview.js      then open the address it prints
 *
 * Pick the program with ?program=smartpath | skillspace | procareer
 * (same as on the real web app; no value = SmartPath).
 *
 * Add &state=... to the address to try other situations:
 *   ?state=photos   two records have photo URLs (one working, one broken)
 *   ?state=empty    the sheet has no active records
 *   ?state=error    the sheet cannot be reached
 *   ?state=flaky    first load works, later refreshes fail
 *   ?state=slow     4-second delay, to see the loading skeleton
 *   &refresh=5      refresh every 5 seconds instead of every 60
 */

var http = require("http");
var fs = require("fs");
var path = require("path");
var vm = require("vm");

var PORT = Number(process.env.PORT) || 3000;
var MAX_PORT_TRIES = 10;
var TEMPLATE = path.join(__dirname, "Index.html");
var CODE_GS = path.join(__dirname, "Code.gs");

/* Loads Code.gs (re-read on every request) so the preview uses the same
   PROGRAMS list and ?program= rules as the real web app. */
function getProgram(value) {
  var sandbox = { console: console };
  vm.createContext(sandbox);
  vm.runInContext(
    fs.readFileSync(CODE_GS, "utf8") + "\n;this.__getProgram = getProgram_;",
    sandbox,
  );
  return sandbox.__getProgram(value);
}

// Fake sheet data — preview only. The real data lives in the Google Sheet.
var SAMPLE = [
  { name: "Bramantyo Adiyatma", phone: "0813-8904-8345", photoUrl: "" },
  { name: "Hikmah Sabrina", phone: "0857-4596-1430", photoUrl: "" },
  { name: "Aulia Sisma", phone: "0857-4868-0052", photoUrl: "" },
  { name: "Annisa Sumangun", phone: "0851-7973-1332", photoUrl: "" },
  { name: "Mira Anastasia", phone: "0896-3594-2751", photoUrl: "" },
];

var MOCK_SCRIPT =
  "<script>(" +
  function (sample) {
    var params = new URLSearchParams(location.search);
    var state = params.get("state") || "ok";
    if (params.get("refresh"))
      window.HR_REFRESH_MS = Number(params.get("refresh")) * 1000;
    if (state === "photos") {
      sample[0].photoUrl = "https://picsum.photos/seed/hr-preview/300";
      sample[1].photoUrl = "https://example.invalid/broken-photo.jpg";
    }
    var calls = 0;
    function runner() {
      var onOk = function () {},
        onFail = function () {};
      var api = {
        withSuccessHandler: function (fn) {
          onOk = fn;
          return api;
        },
        withFailureHandler: function (fn) {
          onFail = fn;
          return api;
        },
        getHRDirectory: function () {
          calls++;
          setTimeout(
            function () {
              if (state === "error" || (state === "flaky" && calls > 1)) {
                onFail(new Error("Directory is temporarily unavailable."));
              } else {
                onOk(
                  state === "empty" ? [] : JSON.parse(JSON.stringify(sample)),
                );
              }
            },
            state === "slow" ? 4000 : 500,
          );
        },
      };
      return api;
    }
    window.google = { script: {} };
    Object.defineProperty(window.google.script, "run", { get: runner });
    console.info("[preview] fake google.script.run, state =", state);
  } +
  ")(" +
  JSON.stringify(SAMPLE) +
  ");</script>";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* Turns the template into JavaScript and runs it, like HtmlTemplate.evaluate().
   templateValues = what Code.gs's doGet() puts on the template. */
function render(templateValues) {
  var template = fs.readFileSync(TEMPLATE, "utf8");
  var code = 'var __out = "";\n';
  var tag = /<\?(=?)([\s\S]*?)\?>/g;
  var last = 0;
  var match;
  while ((match = tag.exec(template))) {
    code +=
      "__out += " + JSON.stringify(template.slice(last, match.index)) + ";\n";
    code += match[1]
      ? "__out += __escape(" + match[2] + ");\n"
      : match[2] + "\n";
    last = tag.lastIndex;
  }
  code +=
    "__out += " + JSON.stringify(template.slice(last)) + ";\nreturn __out;";

  var names = Object.keys(templateValues);
  var args = names.map(function (n) {
    return templateValues[n];
  });
  var html = Function.apply(null, ["__escape"].concat(names, code)).apply(
    null,
    [escapeHtml].concat(args),
  );
  return html.replace("</head>", MOCK_SCRIPT + "\n</head>");
}

var server = http.createServer(function (req, res) {
  var url = new URL(req.url, "http://localhost");
  if (url.pathname !== "/" && url.pathname !== "/index.html") {
    res.writeHead(404);
    return res.end("Not found");
  }
  try {
    var html = render({
      program: getProgram(url.searchParams.get("program")),
      year: new Date().getFullYear(),
    });
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Error in Index.html or Code.gs:\n\n" + err.stack);
    console.error(err.message);
  }
});

server.on("listening", function () {
  console.log(
    "Preview running at http://localhost:" +
      server.address().port +
      "  (Ctrl+C to stop)",
  );
});

/* If the port is busy (e.g. another preview is still running), try the next one */
var port = PORT;
var triesLeft = MAX_PORT_TRIES;
server.on("error", function (err) {
  if (err.code === "EADDRINUSE" && triesLeft > 0) {
    console.log("Port " + port + " is in use, trying " + (port + 1) + "...");
    port++;
    triesLeft--;
    server.listen(port);
  } else {
    console.error("Could not start preview: " + err.message);
    process.exit(1);
  }
});

server.listen(port);
