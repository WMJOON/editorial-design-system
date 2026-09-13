import { useState } from "react";
import { EditorialButton, EditorialIconButton } from "./editorial-actions.js";
import { EditorialTabs } from "./editorial-tabs.js";
import { EditorialSegmentedControl } from "./editorial-controls.js";
import { useEditorialAsyncAction } from "./editorial-async-action.js";
export default { title: "Interaction/Contract" };
export function TouchKeyboardAndForms() {
  const [count, setCount] = useState(0);
  const [tab, setTab] = useState("a");
  const [submitted, setSubmitted] = useState(0);
  return <><output data-testid="count">{count}</output>
    <EditorialButton onClick={() => setCount(n => n + 1)}>Increment</EditorialButton>
    <EditorialButton disabled onClick={() => setCount(n => n + 100)}>Disabled</EditorialButton>
    <EditorialButton onPointerUp={e => e.preventDefault()} onClick={() => setCount(n => n + 100)}>Cancelled by caller</EditorialButton>
    <EditorialIconButton label="Icon increment" onClick={() => setCount(n => n + 1)}>+</EditorialIconButton>
    <EditorialSegmentedControl label="Choice" options={[{value:"a",label:"A"},{value:"b",label:"B"}]} value={tab} onChange={setTab}/>
    <EditorialTabs label="Tabs" value={tab} onChange={setTab} options={[{value:"a",label:"First",id:"tab-a",panelId:"panel"},{value:"x",label:"Disabled tab",id:"tab-x",panelId:"panel",disabled:true},{value:"b",label:"Last",id:"tab-b",panelId:"panel"}]}/>
    <div id="panel" role="tabpanel">{tab}</div>
    <form onSubmit={e => { e.preventDefault(); setSubmitted(n => n + 1); }}><EditorialButton type="submit">Submit</EditorialButton></form>
    <output data-testid="submitted">{submitted}</output>
  </>;
}

export function AsyncRecovery() {
  const [calls, setCalls] = useState(0);
  const [error, setError] = useState("");
  const action = useEditorialAsyncAction({ timeoutMs: 600, onError: e => setError((e as Error).message) });
  const navigation = useEditorialAsyncAction({ timeoutMs: 600, waitForNavigation: true, onError: e => setError((e as Error).message) });
  const begin = () => { setError(""); setCalls(n => n + 1); };
  return <>
    <output data-testid="calls">{calls}</output><output data-testid="error">{error}</output>
    <EditorialButton pending={action.pending} onClick={() => void action.run(async () => { begin(); await new Promise(resolve => setTimeout(resolve, 100)); })}>Async success</EditorialButton>
    <EditorialIconButton pending={action.pending} label="Async icon" onClick={() => void action.run(() => { begin(); })}>+</EditorialIconButton>
    <EditorialButton pending={action.pending} onClick={() => void action.run(() => { begin(); throw new Error("Fixture failure"); })}>Async failure</EditorialButton>
    <EditorialButton pending={action.pending} onClick={() => void action.run(() => { begin(); return new Promise(() => {}); })}>Hung action</EditorialButton>
    <EditorialButton pending={navigation.pending} onClick={() => void navigation.run(() => { begin(); })}>Navigation action</EditorialButton>
    <EditorialButton disabled pending={action.pending} onClick={begin}>Always disabled</EditorialButton>
  </>;
}
