import test from 'node:test';
import assert from 'node:assert/strict';
import { createEditorialActionController, EditorialActionTimeoutError } from '../dist/editorial-action-controller.js';
const deferred=()=>{let resolve,reject;const promise=new Promise((yes,no)=>{resolve=yes;reject=no});return {promise,resolve,reject};};
function fixture(){const pending=[],errors=[];return {pending,errors,controller:createEditorialActionController(v=>pending.push(v),e=>errors.push(e))};}
test('action invokes within the input call, ignores in-flight duplicates, allows next completed action',async()=>{
 const {controller,pending,errors}=fixture();const work=deferred();let calls=0;
 const first=controller.run(()=>{calls++;return work.promise});assert.equal(calls,1);
 assert.equal(await controller.run(()=>{calls++}),'ignored');assert.equal(calls,1);
 work.resolve();assert.equal(await first,'completed');
 assert.equal(await controller.run(()=>{calls++}),'completed');assert.equal(calls,2);
 assert.deepEqual(pending,[true,false,true,false]);assert.deepEqual(errors,[]);
});
test('sync throws and async rejections release pending and report the failure',async()=>{
 const {controller,pending,errors}=fixture();
 assert.equal(await controller.run(()=>{throw new Error('sync')}),'failed');
 assert.equal(await controller.run(()=>Promise.reject(new Error('async'))),'failed');
 assert.deepEqual(errors.map(e=>e.message),['sync','async']);assert.deepEqual(pending,[true,false,true,false]);
});
test('timeout aborts hung work and a late completion cannot unlock a newer action',async()=>{
 const {controller,pending,errors}=fixture();const old=deferred(),next=deferred();let signal;
 assert.equal(await controller.run(s=>{signal=s;return old.promise},{timeoutMs:5}),'failed');
 assert(signal.aborted);assert(errors[0] instanceof EditorialActionTimeoutError);
 const current=controller.run(()=>next.promise);old.resolve();await Promise.resolve();
 assert.deepEqual(pending,[true,false,true]);next.resolve();assert.equal(await current,'completed');
});
test('page restoration/cancellation settles callers and ignores late errors',async()=>{
 const {controller,pending,errors}=fixture();const old=deferred();let signal;
 const result=controller.run(s=>{signal=s;return old.promise});controller.cancel();
 assert.equal(await result,'cancelled');assert(signal.aborted);old.reject(new Error('late'));await Promise.resolve();
 assert.deepEqual(errors,[]);assert.equal(await controller.run(()=>{}),'completed');assert.deepEqual(pending,[true,false,true,false]);
});
test('navigation completion remains guarded until page lifecycle reset',async()=>{
 const {controller,pending,errors}=fixture();
 const result=controller.run(()=>{},{waitForNavigation:true});await Promise.resolve();
 assert.deepEqual(pending,[true]);assert.equal(await controller.run(()=>{}),'ignored');
 controller.cancel();assert.equal(await result,'cancelled');assert.deepEqual(pending,[true,false]);assert.deepEqual(errors,[]);
});
test('a navigation that never happens also times out',async()=>{
 const {controller,errors}=fixture();assert.equal(await controller.run(()=>{},{waitForNavigation:true,timeoutMs:5}),'failed');assert(errors[0] instanceof EditorialActionTimeoutError);
});
