// Run against a built Storybook. PLAYWRIGHT_MODULE may point to an installed runtime.
const {webkit,devices}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');
(async()=>{const browser=await webkit.launch();try{
const page=await browser.newPage({...devices['iPhone 13']});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto((process.env.STORYBOOK_URL||'http://127.0.0.1:6011')+'/iframe.html?id=interaction-contract--touch-keyboard-and-forms&viewMode=story');
const increment=page.getByRole('button',{name:'Increment',exact:true});
const count=()=>page.getByTestId('count').textContent();
await increment.tap();assert.equal(await count(),'1');
await increment.tap();await increment.tap();assert.equal(await count(),'3','rapid distinct taps');
await increment.focus();await increment.press('Enter');await increment.press('Space');assert.equal(await count(),'5');
async function gesture(locator,kind){await locator.evaluate((button,kind)=>{
 const touch={identifier:1,clientX:10,clientY:10};
 const send=(type,touches,changedTouches=[touch])=>{const e=new Event(type,{bubbles:true,cancelable:true});Object.defineProperties(e,{touches:{value:touches},changedTouches:{value:changedTouches}});button.dispatchEvent(e);};
 send('touchstart',[touch]);
 if(kind==='move')send('touchmove',[{...touch,clientY:50}]);
 if(kind==='cancel')send('touchcancel',[]);
 if(kind==='multi')send('touchstart',[touch,{...touch,identifier:2}]);
 send('touchend',[]);
},kind);}
for(const kind of ['move','cancel','multi']){await gesture(increment,kind);assert.equal(await count(),'5',kind+' must not activate');}
await gesture(page.getByRole('button',{name:'Disabled',exact:true}),'tap');assert.equal(await count(),'5');
await gesture(page.getByRole('button',{name:'Cancelled by caller'}),'tap');assert.equal(await count(),'5');
await gesture(increment,'tap');assert.equal(await count(),'6','touch-only fallback');
await page.getByRole('button',{name:'Icon increment'}).tap();assert.equal(await count(),'7');
await page.getByRole('button',{name:'Submit',exact:true}).tap();assert.equal(await page.getByTestId('submitted').textContent(),'1');
await page.getByRole('tab',{name:'First',exact:true}).tap();await page.getByRole('tab',{name:'First',exact:true}).press('ArrowRight');assert.equal(await page.getByRole('tab',{name:'Last',exact:true}).getAttribute('aria-selected'),'true');
await page.getByRole('button',{name:'A',exact:true}).tap();assert.equal(await page.getByRole('tab',{name:'First',exact:true}).getAttribute('aria-selected'),'true');
assert.deepEqual(errors,[]);console.log('PASS touch, rapid taps, keyboard, cancelled/multi/swipe, disabled, caller cancellation, form, icon, tabs, segmented');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
