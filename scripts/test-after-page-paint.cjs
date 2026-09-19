const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const vm = require('node:vm');
function harness(readyState='loading') {
 const frames=new Map(), listeners=new Map();let id=0;
 const window={requestAnimationFrame:fn=>{frames.set(++id,fn);return id},cancelAnimationFrame:n=>frames.delete(n),addEventListener:(name,fn)=>listeners.set(name,fn),removeEventListener:name=>listeners.delete(name)};
 const exports={};const code=ts.transpileModule(fs.readFileSync('lib/after-page-paint.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
 vm.runInNewContext(code,{exports,window,document:{readyState}});
 const tick=()=>{const copy=[...frames];frames.clear();copy.forEach(([,fn])=>fn())};
 return {...exports,tick,load:()=>listeners.get('load')?.()};
}
test('waits for page load and two frames before starting nonvisual work',()=>{
 const h=harness();let calls=0;h.afterPagePaint(()=>calls++);h.tick();assert.equal(calls,0);
 h.load();h.tick();assert.equal(calls,0);h.tick();assert.equal(calls,1);
});
test('already-loaded pages still get two paint opportunities',()=>{
 const h=harness('complete');let calls=0;h.afterPagePaint(()=>calls++);h.tick();assert.equal(calls,0);h.tick();assert.equal(calls,1);
});
test('unmount cancels a pending callback',()=>{
 const h=harness('complete');let calls=0;const cancel=h.afterPagePaint(()=>calls++);h.tick();cancel();h.tick();assert.equal(calls,0);
});
