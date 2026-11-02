const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const vm = require('node:vm');

function visit({ blocked = false, stored = new Map() } = {}) {
  const window = { location: { pathname: '/insights/cctv-guide', search: '', hostname: 'www.pgak.co.in' } };
  const document = { referrer: 'https://www.google.com/search?q=security&private=discard' };
  const sessionStorage = {
    getItem: key => { if (blocked) throw Error('blocked'); return stored.get(key) ?? null; },
    setItem: (key, value) => { if (blocked) throw Error('blocked'); stored.set(key, value); },
  };
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync('lib/attribution.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  vm.runInNewContext(code, { exports, window, document, sessionStorage, URL, URLSearchParams,
    require: name => name === './aiReferrers' ? { aiReferrerName: () => '' } : { trackConversion: () => {} },
  });
  return { ...exports, window, document, stored };
}

test('organic first referrer survives a later campaign and reaches the ERP payload', () => {
  const v = visit();
  v.captureTouch();
  v.window.location.pathname = '/free-audit';
  v.window.location.search = '?utm_source=linkedin&utm_medium=social&utm_campaign=gate_pilot';
  v.document.referrer = 'https://www.linkedin.com/feed/';
  v.captureTouch();
  const a = v.readAttribution('assessment');
  assert.equal(a.first_referrer, 'www.google.com');
  assert.equal(a.first_landing, '/insights/cctv-guide');
  assert.equal(a.first_source, undefined);
  assert.equal(a.utm_source, 'linkedin');
  assert.equal(a.referrer, 'www.linkedin.com');
  const leadExports = {};
  const code = ts.transpileModule(fs.readFileSync('lib/leads.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  vm.runInNewContext(code, { exports: leadExports });
  const clean = leadExports.cleanAttribution(a);
  const payload = leadExports.toErpPayload({name:'TEST',phone:'',location:'',email:'',protecting:'Factory'},
    'www.pgak.co.in', '2026-11-02T00:00:00Z', 'isolated-test', clean);
  assert.match(payload.message, /First referrer: www.google.com/);
  assert.match(payload.message, /Campaign: linkedin \/ social \/ gate_pilot/);
  assert.doesNotMatch(payload.message, /private=|search\?q=/);
});

test('first touch survives reload in the same tab session', () => {
  const v = visit(); v.captureTouch();
  const reloaded = visit({ stored: v.stored });
  reloaded.window.location.pathname = '/contact'; reloaded.document.referrer = 'https://www.pgak.co.in/pricing';
  reloaded.captureTouch();
  assert.equal(reloaded.readAttribution('contact').first_referrer, 'www.google.com');
});

test('blocked storage retains first touch in memory through client navigation', () => {
  const v = visit({ blocked: true }); v.captureTouch();
  v.window.location.pathname = '/contact'; v.window.location.search = '?utm_source=linkedin';
  v.document.referrer = 'https://www.linkedin.com/feed/'; v.captureTouch();
  assert.equal(v.readAttribution('contact').first_referrer, 'www.google.com');
});

test('direct visits have no invented referrer; first campaign source remains separate', () => {
  const v = visit(); v.document.referrer = ''; v.window.location.search = '?utm_source=newsletter'; v.captureTouch();
  v.window.location.search = '?utm_source=linkedin'; v.captureTouch();
  const a = v.readAttribution('assessment');
  assert.equal(a.first_source, 'newsletter'); assert.equal(a.utm_source, 'linkedin');
  assert.equal(a.first_referrer, undefined);
});

test('malformed first-touch storage cannot block a lead', () => {
  for (const value of ['bad-json', '{"landing":42,"referrer":true,"utm_source":{}}']) {
    const v = visit({ stored: new Map([['pgak-first-touch', value]]) });
    assert.doesNotThrow(() => v.readAttribution('assessment'));
  }
});
