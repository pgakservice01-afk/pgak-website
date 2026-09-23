/**
 * PGAK — Master Leads: sheet writer and lead-alert mailer.
 *
 * Bound to the spreadsheet "PGAK — Master Leads" (owner:
 * director@securedengineers.com). Deployed as a web app: Execute as *me*,
 * access *Anyone*. "Anyone" is required because Vercel's servers call it
 * without a Google session — the request is what proves itself, not the caller:
 *
 *   __ts   epoch ms, must be within SKEW_MS
 *   __b64  base64 of the UTF-8 JSON payload
 *   __sig  HMAC-SHA256 hex over "<__ts>.<__b64>" with SECRET
 *
 * The payload is signed as base64 because computeHmacSha256Signature does not
 * default to UTF-8: signing raw JSON rejected every lead containing an en dash
 * ("5–15") or Hindi text, while ASCII payloads passed (verified live 23 Sep).
 *
 * An unsigned, mis-signed or stale request is rejected and writes nothing.
 * The same lead_id twice never adds a second row and never re-sends the email.
 *
 * Setup, once, after pasting this file:
 *   1. Project Settings → Script properties:
 *        SECRET      the shared secret (same value as Vercel LEAD_REGISTER_SECRET)
 *        RECIPIENTS  director@securedengineers.com,mittaladitya18@gmail.com
 *   2. Run `setupSheet` once (authorise when asked) — it builds the Leads tab.
 *   3. Deploy → New deployment → Web app → Execute as: Me, Who has access:
 *      Anyone → copy the /exec URL into Vercel as LEAD_REGISTER_URL.
 *   4. Run `selfTest` to write and then delete a TEST row and email yourself.
 */

var TAB = 'Leads';
var SKEW_MS = 5 * 60 * 1000;
var TZ = 'Asia/Kolkata';

/** Column order. Sales-editable block sits in the middle, on purpose. */
var COLUMNS = [
  // identity and requirement
  { key: 'lead_id',        head: 'Lead ID',                 width: 150, owner: 'system' },
  { key: 'received_at',    head: 'Received (IST)',           width: 155, owner: 'system' },
  { key: 'name',           head: 'Contact name',             width: 150, owner: 'system' },
  { key: 'phone',          head: 'Phone / WhatsApp',         width: 140, owner: 'system', text: true },
  { key: 'email',          head: 'Email',                    width: 180, owner: 'system' },
  { key: 'company',        head: 'Company',                  width: 160, owner: 'sales' },
  { key: 'city',           head: 'Project city / PIN',       width: 150, owner: 'system', text: true },
  { key: 'category',       head: 'Enquiry category',         width: 130, owner: 'system' },
  { key: 'requirement',    head: 'Requirement',              width: 160, owner: 'system' },
  { key: 'product',        head: 'Product / service asked',  width: 190, owner: 'system' },
  { key: 'cameras',        head: 'Camera count',             width: 130, owner: 'system' },
  { key: 'message',        head: 'Project requirements',     width: 280, owner: 'system' },
  { key: 'timeline',       head: 'Timeline',                 width: 120, owner: 'system' },
  // attribution
  { key: 'source',         head: 'Source / channel',         width: 170, owner: 'system' },
  { key: 'landing_page',   head: 'Landing page',             width: 190, owner: 'system' },
  { key: 'submitted_from', head: 'Submitted from',           width: 190, owner: 'system' },
  { key: 'form_id',        head: 'Form',                     width: 150, owner: 'system' },
  { key: 'utm_source',     head: 'UTM source',               width: 110, owner: 'system' },
  { key: 'utm_medium',     head: 'UTM medium',               width: 110, owner: 'system' },
  { key: 'utm_campaign',   head: 'UTM campaign',             width: 130, owner: 'system' },
  { key: 'utm_content',    head: 'UTM content',              width: 120, owner: 'system' },
  { key: 'click_ids',      head: 'Ad / click IDs',           width: 150, owner: 'system' },
  // sales follow-up (people own these; the integration never overwrites them)
  { key: 'owner',          head: 'Assigned owner',           width: 140, owner: 'sales' },
  { key: 'status',         head: 'Lead status',              width: 150, owner: 'sales' },
  { key: 'first_contact',  head: 'First contact (IST)',      width: 150, owner: 'sales' },
  { key: 'next_followup',  head: 'Next follow-up (IST)',     width: 150, owner: 'sales' },
  { key: 'notes',          head: 'Last follow-up notes',     width: 320, owner: 'sales' },
  { key: 'outcome',        head: 'Outcome / lost reason',    width: 180, owner: 'sales' },
  // delivery and audit
  { key: 'erp_ref',        head: 'ERP reference',            width: 150, owner: 'system' },
  { key: 'erp_status',     head: 'ERP delivery status',      width: 170, owner: 'system' },
  { key: 'sheet_synced',   head: 'Sheet sync (IST)',         width: 150, owner: 'system' },
  { key: 'mail_director',  head: 'Email: director@',         width: 190, owner: 'system' },
  { key: 'mail_aditya',    head: 'Email: mittaladitya18@',   width: 190, owner: 'system' },
  { key: 'delivery_error', head: 'Last delivery error',      width: 220, owner: 'system' },
  { key: 'is_test',        head: 'Test / import',            width: 100, owner: 'system' }
];

var STATUS_OPTIONS = [
  'New — not contacted',
  'Attempted — no answer',
  'Contacted',
  'Qualified',
  'Demo / site assessment booked',
  'Proposal sent',
  'Won',
  'Not now — follow up later',
  'Unqualified',
  'Duplicate',
  'Test record'
];

var OUTCOME_OPTIONS = [
  '',
  'Qualified — in pipeline',
  'Lost — price',
  'Lost — timing',
  'Lost — no serviceability',
  'Lost — chose another vendor',
  'Lost — not a real enquiry',
  'Lost — no response'
];

function prop_(name) {
  return (PropertiesService.getScriptProperties().getProperty(name) || '').trim();
}

function recipients_() {
  var raw = prop_('RECIPIENTS') || 'director@securedengineers.com,mittaladitya18@gmail.com';
  return raw.split(',').map(function (s) { return s.trim(); }).filter(String);
}

function sheet_() {
  var ss = SpreadsheetApp.getActive();
  return ss.getSheetByName(TAB) || setupSheet();
}

function ist_(date) {
  return Utilities.formatDate(date || new Date(), TZ, 'yyyy-MM-dd HH:mm:ss');
}

/**
 * Customer-supplied text is DATA. A leading =, +, - or @ would otherwise be
 * evaluated as a formula when someone opens the sheet.
 */
function literal_(value) {
  var s = value === null || value === undefined ? '' : String(value);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function escapeHtml_(value) {
  return String(value === null || value === undefined ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

// ── Sheet setup ──────────────────────────────────────────────────────────────

function setupSheet() {
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getSheetByName(TAB);
  if (!sh) {
    sh = ss.insertSheet(TAB, 0);
    var first = ss.getSheets()[ss.getSheets().length - 1];
    if (ss.getSheets().length > 1 && first.getName() === 'Sheet1' && first.getLastRow() === 0) {
      ss.deleteSheet(first);
    }
  }

  var heads = COLUMNS.map(function (c) { return c.head; });
  sh.getRange(1, 1, 1, heads.length).setValues([heads])
    .setFontWeight('bold')
    .setBackground('#1f2a37')
    .setFontColor('#ffffff')
    .setVerticalAlignment('middle');
  sh.setFrozenRows(1);
  sh.setFrozenColumns(2);
  sh.setRowHeight(1, 34);

  COLUMNS.forEach(function (c, i) {
    sh.setColumnWidth(i + 1, c.width);
    if (c.text) {
      // Phone numbers and PIN codes keep +91 and leading zeros.
      sh.getRange(2, i + 1, sh.getMaxRows() - 1, 1).setNumberFormat('@');
    }
  });

  if (sh.getFilter()) sh.getFilter().remove();
  sh.getRange(1, 1, sh.getMaxRows(), heads.length).createFilter();

  var statusCol = colIndex_('status');
  var outcomeCol = colIndex_('outcome');
  sh.getRange(2, statusCol, sh.getMaxRows() - 1, 1).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(STATUS_OPTIONS, true).setAllowInvalid(true).build()
  );
  sh.getRange(2, outcomeCol, sh.getMaxRows() - 1, 1).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(OUTCOME_OPTIONS, true).setAllowInvalid(true).build()
  );

  protectSystemColumns_(sh);
  return sh;
}

function colIndex_(key) {
  for (var i = 0; i < COLUMNS.length; i++) if (COLUMNS[i].key === key) return i + 1;
  throw new Error('unknown column ' + key);
}

/**
 * Warn on the integration-owned columns so a stray paste cannot rewrite a lead
 * id or a delivery status, while every sales field stays freely editable.
 * Warning-only (not a hard lock) so the owner is never locked out of a fix.
 */
function protectSystemColumns_(sh) {
  sh.getProtections(SpreadsheetApp.ProtectionType.RANGE).forEach(function (p) {
    if (p.getDescription().indexOf('PGAK integration') === 0) p.remove();
  });
  var runs = [];
  COLUMNS.forEach(function (c, i) {
    if (c.owner !== 'system') return;
    var col = i + 1;
    var last = runs[runs.length - 1];
    if (last && last.end === col - 1) last.end = col;
    else runs.push({ start: col, end: col });
  });
  runs.forEach(function (r) {
    sh.getRange(1, r.start, sh.getMaxRows(), r.end - r.start + 1)
      .protect()
      .setDescription('PGAK integration — written automatically')
      .setWarningOnly(true);
  });
}

// ── Web app ──────────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    var secret = prop_('SECRET');
    if (!secret) return json_({ ok: false, error: 'script SECRET not set' });

    var raw = (e && e.postData && e.postData.contents) || '';
    var envelope;
    try {
      envelope = JSON.parse(raw);
    } catch (err) {
      return json_({ ok: false, error: 'body is not JSON' });
    }

    var ts = String(envelope.__ts || '');
    var b64 = String(envelope.__b64 || '');
    var sig = String(envelope.__sig || '');
    if (!ts || !sig || !b64) return json_({ ok: false, error: 'missing signature' });
    if (Math.abs(Date.now() - Number(ts)) > SKEW_MS) return json_({ ok: false, error: 'stale request' });
    if (!validSignature_(b64, secret, ts, sig)) return json_({ ok: false, error: 'bad signature' });

    var payload;
    try {
      // Decode rather than re-serialise: no charset or key-order assumptions.
      payload = JSON.parse(
        Utilities.newBlob(Utilities.base64Decode(b64)).getDataAsString('UTF-8')
      );
    } catch (err) {
      return json_({ ok: false, error: 'payload is not valid base64 JSON' });
    }

    return json_(record_(payload));
  } catch (err) {
    return json_({ ok: false, error: 'handler threw: ' + err });
  }
}

function validSignature_(body, secret, ts, sig) {
  // Both parts are ASCII here (digits and base64), so the charset default
  // cannot change the digest.
  var bytes = Utilities.computeHmacSha256Signature(ts + '.' + body, secret);
  var hex = bytes
    .map(function (b) { return ('0' + (b & 0xff).toString(16)).slice(-2); })
    .join('');
  if (hex.length !== String(sig).length) return false;
  // Constant-time-ish compare: never short-circuit on the first difference.
  var diff = 0;
  for (var i = 0; i < hex.length; i++) diff |= hex.charCodeAt(i) ^ String(sig).charCodeAt(i);
  return diff === 0;
}

/** One row per lead_id. A repeat returns the original row and sends nothing. */
function record_(p) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sh = sheet_();
    var idCol = colIndex_('lead_id');
    var leadId = String(p.lead_id || '').slice(0, 80);
    if (!leadId) return { ok: false, error: 'lead_id missing' };

    var existing = findRow_(sh, idCol, leadId);
    if (existing > 0) {
      return {
        ok: true,
        row: 'duplicate',
        rowNumber: existing,
        sheetSyncedAt: new Date().toISOString(),
        emails: { director: 'already sent', aditya: 'already sent' },
        error: ''
      };
    }

    var now = new Date();
    var values = COLUMNS.map(function (c) {
      switch (c.key) {
        case 'received_at':
          return ist_(p.received_at ? new Date(p.received_at) : now);
        case 'sheet_synced':
          return ist_(now);
        case 'status':
          return p.is_test ? 'Test record' : 'New — not contacted';
        case 'owner':
        case 'first_contact':
        case 'next_followup':
        case 'notes':
        case 'outcome':
          return '';
        case 'mail_director':
        case 'mail_aditya':
        case 'delivery_error':
          return '';
        default:
          return literal_(p[c.key]);
      }
    });

    sh.appendRow(values);
    var rowNumber = sh.getLastRow();

    var mail = sendAlerts_(p, rowNumber);
    sh.getRange(rowNumber, colIndex_('mail_director')).setValue(mail.director);
    sh.getRange(rowNumber, colIndex_('mail_aditya')).setValue(mail.aditya);
    if (mail.error) sh.getRange(rowNumber, colIndex_('delivery_error')).setValue(mail.error);

    return {
      ok: true,
      row: 'new',
      rowNumber: rowNumber,
      sheetSyncedAt: now.toISOString(),
      emails: { director: mail.director, aditya: mail.aditya },
      error: mail.error || ''
    };
  } finally {
    lock.releaseLock();
  }
}

function findRow_(sh, col, value) {
  var last = sh.getLastRow();
  if (last < 2) return 0;
  var ids = sh.getRange(2, col, last - 1, 1).getValues();
  for (var i = 0; i < ids.length; i++) if (String(ids[i][0]) === value) return i + 2;
  return 0;
}

// ── Alert emails ─────────────────────────────────────────────────────────────

function sendAlerts_(p, rowNumber) {
  var out = { director: '', aditya: '', error: '' };
  var list = recipients_();
  var subject = alertSubject_(p);
  var html = alertHtml_(p, rowNumber);
  var text = alertText_(p, rowNumber);
  var quota = MailApp.getRemainingDailyQuota();
  if (quota < list.length) {
    out.director = out.aditya = 'not sent — daily mail quota exhausted';
    out.error = 'MailApp quota ' + quota;
    return out;
  }
  list.forEach(function (to, i) {
    var key = i === 0 ? 'director' : 'aditya';
    try {
      MailApp.sendEmail({
        to: to,
        subject: subject,
        body: text,
        htmlBody: html,
        name: 'PGAK Leads',
        replyTo: p.email || undefined
      });
      // MailApp reports acceptance by Gmail, never inbox delivery.
      out[key] = 'accepted by Gmail ' + ist_(new Date());
    } catch (err) {
      out[key] = 'failed';
      out.error = (out.error ? out.error + ' | ' : '') + to + ': ' + err;
    }
  });
  return out;
}

function alertSubject_(p) {
  var tag = p.is_test ? '[TEST] ' : '';
  var kind = p.category && p.category !== 'Customer' ? p.category.toUpperCase() + ' ' : 'NEW LEAD';
  var head = p.category && p.category !== 'Customer' ? kind : 'NEW LEAD';
  return (
    tag + '[PGAK ' + head + '] ' +
    (p.requirement || 'Enquiry') + ' | ' +
    (p.city || 'City not given') + ' | ' +
    p.lead_id
  );
}

function sheetUrl_(rowNumber) {
  var ss = SpreadsheetApp.getActive();
  return ss.getUrl() + '#gid=' + sheet_().getSheetId() + (rowNumber ? '&range=A' + rowNumber : '');
}

function waLink_(phone) {
  var digits = String(phone || '').replace(/[^0-9]/g, '');
  if (digits.length < 10) return '';
  if (digits.length === 10) digits = '91' + digits;
  return 'https://wa.me/' + digits;
}

function alertRows_(p) {
  return [
    ['Name', p.name || '—'],
    ['Company', p.company || '—'],
    ['Phone', p.phone || '—'],
    ['Email', p.email || '—'],
    ['Project location', p.city || '—'],
    ['Requirement', p.requirement || '—'],
    ['Camera count', p.cameras || '—'],
    ['Project details', p.message || '—'],
    ['Implementation timeline', p.timeline || '—'],
    ['Source / campaign', [p.source, p.utm_campaign, p.click_ids].filter(String).join(' · ') || '—'],
    ['Page submitted from', p.submitted_from || '—'],
    ['Received at', ist_(p.received_at ? new Date(p.received_at) : new Date()) + ' IST'],
    ['Lead ID', p.lead_id],
    ['Assigned owner / status', p.is_test ? 'Test record' : 'Unassigned · New — not contacted']
  ];
}

function alertText_(p, rowNumber) {
  var lines = ['New PGAK enquiry', ''];
  alertRows_(p).forEach(function (r) { lines.push(r[0] + ': ' + r[1]); });
  lines.push('');
  if (p.phone) {
    lines.push('Call: tel:' + p.phone);
    var wa = waLink_(p.phone);
    if (wa) lines.push('WhatsApp: ' + wa);
  }
  lines.push('Open lead register: ' + sheetUrl_(rowNumber));
  if (p.erp_ref) lines.push('ERP record: ' + p.erp_ref + ' (' + (p.erp_status || '') + ')');
  else if (p.erp_status) lines.push('ERP: ' + p.erp_status);
  if (p.is_test) lines.push('', 'TEST RECORD — not a real customer. Do not contact.');
  return lines.join('\n');
}

function alertHtml_(p, rowNumber) {
  var wa = waLink_(p.phone);
  var rows = alertRows_(p).map(function (r) {
    return (
      '<tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;vertical-align:top">' +
      escapeHtml_(r[0]) +
      '</td><td style="padding:6px 0;color:#111827;font-weight:500">' +
      escapeHtml_(r[1]) +
      '</td></tr>'
    );
  }).join('');
  var buttons =
    (p.phone
      ? '<a href="tel:' + escapeHtml_(p.phone) + '" style="display:inline-block;padding:11px 18px;margin:0 8px 8px 0;background:#4f39d9;color:#fff;border-radius:8px;text-decoration:none;font-weight:600">Call now</a>'
      : '') +
    (wa
      ? '<a href="' + escapeHtml_(wa) + '" style="display:inline-block;padding:11px 18px;margin:0 8px 8px 0;background:#25d366;color:#fff;border-radius:8px;text-decoration:none;font-weight:600">WhatsApp</a>'
      : '') +
    '<a href="' + escapeHtml_(sheetUrl_(rowNumber)) + '" style="display:inline-block;padding:11px 18px;margin:0 8px 8px 0;background:#111827;color:#fff;border-radius:8px;text-decoration:none;font-weight:600">Open lead register</a>';

  return (
    '<div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:620px;margin:0 auto;padding:18px">' +
    (p.is_test
      ? '<p style="background:#fef3c7;border:1px solid #f59e0b;padding:10px 12px;border-radius:8px;margin:0 0 14px">TEST RECORD — not a real customer. Do not contact.</p>'
      : '') +
    '<h2 style="margin:0 0 4px;font-size:20px;color:#111827">New PGAK enquiry</h2>' +
    '<p style="margin:0 0 16px;color:#6b7280;font-size:14px">' +
    escapeHtml_(p.requirement || 'Enquiry') + ' · ' + escapeHtml_(p.city || 'city not given') +
    '</p>' +
    '<table style="border-collapse:collapse;font-size:15px;width:100%">' + rows + '</table>' +
    '<div style="margin:18px 0 8px">' + buttons + '</div>' +
    (p.erp_status
      ? '<p style="color:#6b7280;font-size:13px;margin:8px 0 0">ERP: ' + escapeHtml_(p.erp_status) + (p.erp_ref ? ' · ' + escapeHtml_(p.erp_ref) : '') + '</p>'
      : '') +
    '</div>'
  );
}

// ── Helpers you can run by hand ──────────────────────────────────────────────

/** Writes a TEST row, emails both recipients, then deletes the row again. */
function selfTest() {
  var id = 'test-selftest-' + Date.now();
  var res = record_({
    lead_id: id,
    received_at: new Date().toISOString(),
    name: 'TEST — Apps Script self test',
    phone: '+910000000000',
    city: 'TEST',
    category: 'Customer',
    requirement: 'New installation',
    product: 'self test',
    cameras: '16–50',
    message: 'Protecting: Factory / Warehouse',
    timeline: '1–3 months',
    source: 'self test',
    submitted_from: '/cctv-installation-company',
    erp_status: 'not attempted (self test)',
    is_test: 'TEST'
  });
  var sh = sheet_();
  var row = findRow_(sh, colIndex_('lead_id'), id);
  if (row > 0) sh.deleteRow(row);
  Logger.log(JSON.stringify(res));
  return res;
}

/** Prints the numbers the deployment needs. Run after deploying. */
function showConfig() {
  Logger.log(
    JSON.stringify({
      sheet: SpreadsheetApp.getActive().getUrl(),
      recipients: recipients_(),
      secretSet: Boolean(prop_('SECRET')),
      mailQuotaLeft: MailApp.getRemainingDailyQuota()
    })
  );
}
