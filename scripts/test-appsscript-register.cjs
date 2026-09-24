/**
 * Regression tests for integrations/pgak-leads-appsscript.gs.
 *
 *   npm run test:appsscript
 *
 * The script itself only ever runs inside Apps Script, so this harness stubs
 * the four globals it touches (SpreadsheetApp, MailApp, LockService,
 * PropertiesService) and loads the .gs file as ordinary ES5 JavaScript. That
 * is enough to exercise the part that actually went wrong, without deploying
 * anything or sending real mail.
 *
 * WHY THIS EXISTS
 * The duplicate branch used to answer a hardcoded
 *
 *   emails: { director: 'already sent', aditya: 'already sent' }
 *
 * for any lead_id already in the sheet, without reading what had been
 * recorded. A recipient whose send had FAILED could therefore never be
 * recovered: every retry reported success, resent nothing, and the alert was
 * lost for good while the response said the opposite. These tests pin the
 * repaired behaviour — recover the unsettled recipient, never re-send the
 * settled one, never append a second row, and never invent a status.
 */

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const GS = path.join(__dirname, "..", "integrations", "pgak-leads-appsscript.gs");

/** A sheet backed by a plain array of rows, with 1-based ranges. */
function fakeSheet(header, rows) {
  const grid = [header.slice(), ...rows.map((r) => r.slice())];
  return {
    appended: 0,
    getLastRow: () => grid.length,
    getLastColumn: () => header.length,
    getRange(row, col, numRows, numCols) {
      const self = this;
      return {
        getValue: () => grid[row - 1][col - 1],
        setValue(v) {
          grid[row - 1][col - 1] = v;
          return this;
        },
        getValues() {
          const out = [];
          for (let r = 0; r < (numRows || 1); r++) {
            const line = [];
            for (let c = 0; c < (numCols || 1); c++) line.push(grid[row - 1 + r][col - 1 + c]);
            out.push(line);
          }
          return out;
        },
        setValues: () => this,
        setNumberFormat: () => this,
        setFontWeight: () => this,
        setBackground: () => this,
        setFontColor: () => this,
        setWrap: () => this,
        setHorizontalAlignment: () => this,
        setVerticalAlignment: () => this,
        setNote: () => this,
        setDataValidation: () => this,
        clearDataValidations: () => this,
        get _self() {
          return self;
        },
      };
    },
    appendRow(values) {
      grid.push(values.slice());
      this.appended += 1;
    },
    deleteRow(r) {
      grid.splice(r - 1, 1);
    },
    setFrozenRows: () => {},
    setColumnWidth: () => {},
    getName: () => "Leads",
    getSheetId: () => 123456,
    getParent: () => ({ getUrl: () => "https://docs.google.com/spreadsheets/d/TEST/edit" }),
    _grid: grid,
  };
}

/** Loads the .gs with stubbed Apps Script globals. Returns the sandbox. */
function loadScript({ header, rows, quota = 100, sendFails = [] }) {
  const sheet = fakeSheet(header, rows);
  const sent = [];
  const sandbox = {
    console,
    Logger: { log: () => {} },
    LockService: {
      getScriptLock: () => ({ waitLock: () => {}, releaseLock: () => {} }),
    },
    PropertiesService: {
      getScriptProperties: () => ({
        getProperty: (k) =>
          ({ SECRET: "s3cret", RECIPIENTS: "director@securedengineers.com,mittaladitya18@gmail.com" })[k] || "",
      }),
    },
    SpreadsheetApp: {
      getActive: () => ({
        getSheetByName: () => sheet,
        insertSheet: () => sheet,
        getUrl: () => "https://docs.google.com/spreadsheets/d/TEST/edit",
      }),
    },
    MailApp: {
      getRemainingDailyQuota: () => quota,
      sendEmail(opts) {
        if (sendFails.includes(opts.to)) throw new Error("simulated send failure");
        sent.push(opts.to);
      },
    },
    Utilities: {
      formatDate: (d) => new Date(d).toISOString().replace("T", " ").slice(0, 19),
      computeHmacSha256Signature: () => [1, 2, 3],
      base64Decode: (s) => Buffer.from(s, "base64"),
      newBlob: (b) => ({ getDataAsString: () => Buffer.from(b).toString("utf8") }),
    },
  };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(GS, "utf8"), sandbox, { filename: "pgak-leads-appsscript.gs" });
  return { sandbox, sheet, sent };
}

/** Column order must match COLUMNS in the .gs; read it from the script itself. */
function headerFrom(sandbox) {
  return sandbox.COLUMNS.map((c) => c.head);
}

function rowFor(sandbox, overrides) {
  return sandbox.COLUMNS.map((c) => (c.key in overrides ? overrides[c.key] : ""));
}

const PAYLOAD = {
  lead_id: "test-recovery-0001",
  name: "TEST recovery",
  phone: "+919000000099",
  city: "Ludhiana",
  requirement: "Existing CCTV upgrade",
  is_test: "TEST",
};

test("settled recipients are read from the sheet, not invented", () => {
  const boot = loadScript({ header: [], rows: [] });
  const header = headerFrom(boot.sandbox);
  const existing = rowFor(boot.sandbox, {
    lead_id: PAYLOAD.lead_id,
    mail_director: "accepted by Gmail 2026-09-23 13:48:19",
    mail_aditya: "accepted by Gmail 2026-09-23 13:48:19",
  });

  const { sandbox, sheet, sent } = loadScript({ header, rows: [existing] });
  const res = sandbox.record_(PAYLOAD);

  assert.equal(res.ok, true);
  assert.equal(res.row, "duplicate");
  assert.equal(sheet.appended, 0, "a duplicate must never append a row");
  assert.equal(sent.length, 0, "a recorded acceptance must never be re-sent");
  // The truthful recorded values, not the old hardcoded 'already sent'.
  assert.match(res.emails.director, /^accepted by Gmail/);
  assert.match(res.emails.aditya, /^accepted by Gmail/);
  assert.notEqual(res.emails.director, "already sent");
});

test("a failed recipient is recovered and the settled one is left alone", () => {
  const boot = loadScript({ header: [], rows: [] });
  const header = headerFrom(boot.sandbox);
  const existing = rowFor(boot.sandbox, {
    lead_id: PAYLOAD.lead_id,
    mail_director: "failed",
    mail_aditya: "accepted by Gmail 2026-09-23 13:48:19",
  });

  const { sandbox, sheet, sent } = loadScript({ header, rows: [existing] });
  const res = sandbox.record_(PAYLOAD);

  assert.equal(sheet.appended, 0, "recovery must not append a second row");
  assert.deepEqual(sent, ["director@securedengineers.com"], "only the failed recipient is re-sent");
  assert.equal(res.row, "duplicate-recovered");
  assert.match(res.emails.director, /^accepted by Gmail/, "director now recorded as accepted");
  assert.match(res.emails.aditya, /^accepted by Gmail 2026-09-23/, "aditya's original record is preserved");
});

test("an unattempted (empty) recipient is retried rather than assumed sent", () => {
  const boot = loadScript({ header: [], rows: [] });
  const header = headerFrom(boot.sandbox);
  const existing = rowFor(boot.sandbox, {
    lead_id: PAYLOAD.lead_id,
    mail_director: "",
    mail_aditya: "",
  });

  const { sandbox, sheet, sent } = loadScript({ header, rows: [existing] });
  const res = sandbox.record_(PAYLOAD);

  assert.equal(sheet.appended, 0);
  assert.equal(sent.length, 2, "both blank recipients are attempted");
  assert.equal(res.row, "duplicate-recovered");
});

test("a quota refusal is recorded honestly, not as an acceptance", () => {
  const boot = loadScript({ header: [], rows: [] });
  const header = headerFrom(boot.sandbox);
  const existing = rowFor(boot.sandbox, {
    lead_id: PAYLOAD.lead_id,
    mail_director: "failed",
    mail_aditya: "accepted by Gmail 2026-09-23 13:48:19",
  });

  const { sandbox, sheet, sent } = loadScript({ header, rows: [existing], quota: 0 });
  const res = sandbox.record_(PAYLOAD);

  assert.equal(sent.length, 0);
  assert.match(res.emails.director, /quota exhausted/);
  // The settled recipient must not be overwritten by this call's refusal.
  assert.match(res.emails.aditya, /^accepted by Gmail 2026-09-23/);
  assert.equal(sheet.appended, 0);
});

test("recovery that fails again stays failed instead of reporting success", () => {
  const boot = loadScript({ header: [], rows: [] });
  const header = headerFrom(boot.sandbox);
  const existing = rowFor(boot.sandbox, {
    lead_id: PAYLOAD.lead_id,
    mail_director: "failed",
    mail_aditya: "accepted by Gmail 2026-09-23 13:48:19",
  });

  const { sandbox, res, sheet } = (() => {
    const loaded = loadScript({
      header,
      rows: [existing],
      sendFails: ["director@securedengineers.com"],
    });
    return { ...loaded, res: loaded.sandbox.record_(PAYLOAD) };
  })();

  assert.equal(res.emails.director, "failed");
  assert.ok(res.error.length > 0, "the failure is reported, not swallowed");
  assert.equal(sheet.appended, 0);
  assert.ok(sandbox);
});

test("a genuinely new lead still writes one row and mails both", () => {
  const boot = loadScript({ header: [], rows: [] });
  const header = headerFrom(boot.sandbox);

  const { sandbox, sheet, sent } = loadScript({ header, rows: [] });
  const res = sandbox.record_(PAYLOAD);

  assert.equal(res.row, "new");
  assert.equal(sheet.appended, 1);
  assert.equal(sent.length, 2);
  assert.match(res.emails.director, /^accepted by Gmail/);
  assert.match(res.emails.aditya, /^accepted by Gmail/);
});

test("mailSettled_ only trusts a recorded Gmail acceptance", () => {
  const { sandbox } = loadScript({ header: [], rows: [] });
  assert.equal(sandbox.mailSettled_("accepted by Gmail 2026-09-23 13:48:19"), true);
  for (const unsettled of ["", "   ", "failed", "not sent — daily mail quota exhausted", "pending", "unknown"]) {
    assert.equal(sandbox.mailSettled_(unsettled), false, `must be recoverable: "${unsettled}"`);
  }
});
