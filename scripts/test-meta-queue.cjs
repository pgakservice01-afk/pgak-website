const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const vm = require('node:vm');
function helper(window) {
 const exports = {};
 const code = ts.transpileModule(fs.readFileSync('lib/fbpixel.ts','utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
 vm.runInNewContext(code, {exports, window}); return exports;
}
test('early Meta conversion is retained exactly once before library load',()=>{
 const window={};const h=helper(window);h.fbTrack('Lead',{form_name:'demo_request'});
 assert.equal(window.fbq.queue.length,1);
 assert.equal(window.fbq.queue[0][0],'track');assert.equal(window.fbq.queue[0][1],'Lead');
 assert.equal(window._fbq,window.fbq);
});
test('loaded Meta API receives events directly without recreating its queue',()=>{
 const calls=[];const window={fbq:(...args)=>calls.push(args)};const original=window.fbq;
 helper(window).fbTrack('Contact');assert.equal(calls.length,1);assert.equal(window.fbq,original);
});
test('Meta helper remains safe on the server',()=>assert.doesNotThrow(()=>helper(undefined).fbTrack('Lead')));
test('bootstrap initializes the pixel before draining an early lead',()=>{
 const context={};context.window=context;
 helper(context).fbTrack('Lead',{form_name:'demo_request'});
 const src=fs.readFileSync('components/Pixel.tsx','utf8');
 const init=src.match(/\{`(!function[^`]+)`\}/)[1].replaceAll('${FB_PIXEL_ID}','2995891480746659');
 vm.runInNewContext(init,context);
 assert.deepEqual(Array.from(context.fbq.queue, q=>q[0]+':'+q[1]),['init:2995891480746659','track:Lead','track:PageView']);
});
