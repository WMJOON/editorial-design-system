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
 if(kind==='pointer-cancel')button.dispatchEvent(new Event('pointercancel',{bubbles:true}));
 if(kind==='restore')window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true}));
 send('touchend',[]);
},kind);}
for(const kind of ['move','cancel','multi','pointer-cancel','restore']){await gesture(increment,kind);assert.equal(await count(),'5',kind+' must not activate');}
await gesture(page.getByRole('button',{name:'Disabled',exact:true}),'tap');assert.equal(await count(),'5');
await gesture(page.getByRole('button',{name:'Cancelled by caller'}),'tap');assert.equal(await count(),'5');
await gesture(increment,'tap');assert.equal(await count(),'6','touch-only fallback');
await page.getByRole('button',{name:'Icon increment'}).tap();assert.equal(await count(),'7');
await page.getByRole('button',{name:'Submit',exact:true}).tap();assert.equal(await page.getByTestId('submitted').textContent(),'1');
await page.getByRole('tab',{name:'First',exact:true}).tap();await page.getByRole('tab',{name:'First',exact:true}).press('ArrowRight');assert.equal(await page.getByRole('tab',{name:'Last',exact:true}).getAttribute('aria-selected'),'true');
await page.getByRole('button',{name:'A',exact:true}).tap();assert.equal(await page.getByRole('tab',{name:'First',exact:true}).getAttribute('aria-selected'),'true');
assert.deepEqual(errors,[]);console.log('PASS touch, rapid taps, keyboard, cancelled/multi/swipe, disabled, caller cancellation, form, icon, tabs, segmented');
await page.goto((process.env.STORYBOOK_URL||'http://127.0.0.1:6011')+'/iframe.html?id=interaction-contract--async-recovery&viewMode=story');
const success=page.getByRole('button',{name:'Async success',exact:true});
const calls=()=>page.getByTestId('calls').textContent();
await success.tap();await page.waitForFunction(()=>!document.querySelector('[aria-busy="true"]'));assert.equal(await calls(),'1');
await success.tap();await page.waitForFunction(()=>!document.querySelector('[aria-busy="true"]'));assert.equal(await calls(),'2');
await page.getByRole('button',{name:'Async failure',exact:true}).tap();await page.getByTestId('error').filter({hasText:'Fixture failure'}).waitFor();assert.equal(await success.isEnabled(),true);
const hung=page.getByRole('button',{name:'Hung action',exact:true});await hung.tap();
assert.equal(await success.isDisabled(),true);assert.equal(await hung.getAttribute('aria-busy'),'true');
// Native disabled prevents competing inputs while the shared action is pending.
await success.evaluate(e=>e.click());assert.equal(await calls(),'4');
await page.getByTestId('error').filter({hasText:'deadline'}).waitFor();assert.equal(await success.isEnabled(),true);
const navigation=page.getByRole('button',{name:'Navigation action',exact:true});
for(const event of ['pagehide','pageshow']){
 await navigation.tap();assert.equal(await navigation.isDisabled(),true);
 await page.evaluate(type=>window.dispatchEvent(new PageTransitionEvent(type,{persisted:true})),event);
 await page.waitForFunction(()=>!document.querySelector('[aria-busy="true"]'));assert.equal(await navigation.isEnabled(),true);
}
assert.equal(await page.getByRole('button',{name:'Always disabled',exact:true}).isDisabled(),true);
await page.getByRole('button',{name:'Async icon',exact:true}).tap();await page.waitForFunction(()=>!document.querySelector('[aria-busy="true"]'));assert.equal(await calls(),'7');
await success.focus();await success.press('Enter');await page.waitForFunction(()=>!document.querySelector('[aria-busy="true"]'));assert.equal(await calls(),'8');
assert.deepEqual(errors,[]);console.log('PASS async success/repeat/error/timeout/group guard, icon, keyboard, persisted restore, explicit disabled');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
