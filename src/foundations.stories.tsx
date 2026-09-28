import type { Meta, StoryObj } from "@storybook/react-vite";

const tokens = [
  ["Canvas", "--editorial-bg-canvas"], ["Surface", "--editorial-bg-surface"], ["Subtle", "--editorial-bg-subtle"], ["Foreground", "--editorial-fg"], ["Muted", "--editorial-fg-muted"], ["Border", "--editorial-border"], ["Illustrative accent", "--editorial-accent"], ["Action", "--editorial-action-bg"], ["Focus ring", "--editorial-focus-ring"], ["Link", "--editorial-link"],
];
const spacingSteps = ["0-5","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"];

const meta = { title: "Foundations/Tokens", parameters: { layout: "padded" } } satisfies Meta;
export default meta;
type Story = StoryObj;

export const SemanticPalette: Story = { render: () => <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>{tokens.map(([label, token]) => <div key={token} style={{ border: "1px solid var(--editorial-border)", background: "var(--editorial-bg-surface)", padding: 12 }}><div style={{ height: 72, marginBottom: 10, border: "1px solid var(--editorial-border)", background: `var(${token})` }} /><strong style={{ display: "block", fontFamily: '"Noto Sans KR", sans-serif' }}>{label}</strong><code>{token}</code></div>)}</div> };

export const ActionAndSpacing: Story = { render: () => <section style={{ display: "grid", gap: "var(--editorial-ref-space-8)", fontFamily: "var(--editorial-font-sans)", color: "var(--editorial-fg)" }}><div><h2 style={{ fontFamily: "var(--editorial-font-serif)" }}>Action roles</h2><button className="editorial-button" style={{ background: "var(--editorial-action-bg)", borderColor: "var(--editorial-action-bg)", color: "var(--editorial-action-fg)" }}>계속 읽기</button><p>Filled action and focus must remain legible in both themes.</p></div><div><h2 style={{ fontFamily: "var(--editorial-font-serif)" }}>Spacing scale</h2><div style={{ display: "grid", gap: "var(--editorial-ref-space-3)" }}>{spacingSteps.map(step => <div key={step} style={{ display: "flex", alignItems: "center", gap: "var(--editorial-ref-space-4)" }}><code style={{ flex: "0 0 15rem" }}>{`--editorial-ref-space-${step}`}</code><span style={{ display: "block", height: 12, width: `var(--editorial-ref-space-${step})`, background: "var(--editorial-action-bg)" }} /></div>)}</div></div></section> };

export const SpacingTokens: Story = {
  render: () => <section style={{ display: "grid", gap: "var(--editorial-ref-space-6)", color: "var(--editorial-fg)", fontFamily: "var(--editorial-font-sans)" }}>
    <div>
      <h2>UI spacing tokens</h2>
      <p>0.5x는 2px, 1x는 4px이며 이후 2x, 3x, 4x로 올라갑니다. 글자 크기나 화면 너비가 바뀌어도 간격 값은 그대로 유지됩니다.</p>
      <p><code>--editorial-space-inline-gutter</code>는 데스크톱 24px, 720px 이하 16px입니다. 헤더·본문·푸터가 같은 좌우 기준을 사용합니다.</p>
      <span style={{ display: "block", width: "var(--editorial-space-inline-gutter)", height: 12, background: "var(--editorial-action-bg)" }} />
    </div>
    <div style={{ display: "grid", gap: "var(--editorial-ref-space-2)" }}>
      {spacingSteps.map(step => <div key={step} style={{ display: "grid", gridTemplateColumns: "minmax(200px, 1fr) 90px minmax(0, 2fr)", alignItems: "center", gap: "var(--editorial-ref-space-4)" }}>
        <code>{`--editorial-ref-space-${step}`}</code>
        <span>{step.replace("-", ".")}x · {Number(step.replace("-", ".")) * 4}px</span>
        <span style={{ display: "block", width: `var(--editorial-ref-space-${step})`, maxWidth: "100%", height: 12, background: "var(--editorial-action-bg)" }} />
      </div>)}
    </div>
  </section>,
};
