/** Browser harness for the connected browser API (no separate browser driver).
 * Call with the approved tab and viewport handles from cua_repl.
 * Run only against the isolated synthetic preview, never production forms.
 */
export async function verifyB2BPage(tab, viewport) {
 const url=await tab.url();
 if(!url?.startsWith('http://127.0.0.1:3100/'))throw new Error('Local synthetic preview required');
 const assert=(value,message)=>{if(!value)throw new Error(message);};
 assert(await tab.playwright.locator('h1').count()===1,'One H1 expected');
 for(const width of [360,390,640,768,1024,1440]){
  await viewport.set({width,height:900});
  const box=await tab.playwright.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));
  assert(box.scroll<=box.width,`Horizontal overflow at ${width}`);
 }
 await viewport.set({width:390,height:844});
 await tab.playwright.locator('.mobile-nav summary').press('Enter');
 assert(await tab.playwright.getByRole('navigation',{name:'Mobile',exact:true}).isVisible(),'Keyboard menu must open');
 await viewport.reset();
 const errors=await tab.dev.logs({levels:['error'],limit:20});
 assert(errors.length===0,'Inspect console errors');
 return {responsive:true,keyboardMenu:true,consoleErrors:0};
}
