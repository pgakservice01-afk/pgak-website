const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const vm = require('node:vm');
function helper(window) {
 const exports = {};
 const code = ts.transpileModule(fs.readFileSync('lib/analytics.ts','utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
 vm.runInNewContext(code, {exports, window}); return exports;
}
test('early events survive before gtag loads with one command and no contact data',()=>{
 const window={location:{pathname:'/pricing'}};helper(window).trackConversion('form_start',{form_name:'quick_quote_request'});
 assert.equal(window.dataLayer.length,1);assert.equal(window.dataLayer[0][0],'event');assert.equal(window.dataLayer[0][1],'form_start');assert.equal(window.dataLayer[0][2].page_path,'/pricing');
 assert.equal(window.dataLayer[0][2].phone,undefined);
});
test('loaded gtag receives a single event without duplicate GTM custom event',()=>{
 const calls=[];const window={location:{pathname:'/'},dataLayer:[],gtag:(...args)=>calls.push(args)};
 helper(window).trackLead('quick_audit_request');assert.equal(calls.length,1);assert.equal(calls[0][1],'generate_lead');assert.equal(window.dataLayer.length,0);
});
test('server rendering does not access window',()=>assert.doesNotThrow(()=>helper(undefined).trackConversion('form_start')));
