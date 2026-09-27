import type { Meta, StoryObj } from "@storybook/react-vite";

const tokens = [
  ["Canvas", "--editorial-bg-canvas"], ["Surface", "--editorial-bg-surface"], ["Subtle", "--editorial-bg-subtle"], ["Foreground", "--editorial-fg"], ["Muted", "--editorial-fg-muted"], ["Border", "--editorial-border"], ["Illustrative accent", "--editorial-accent"], ["Action", "--editorial-action-bg"], ["Focus ring", "--editorial-focus-ring"], ["Link", "--editorial-link"],
];

const meta = { title: "Foundations/Color tokens", parameters: { layout: "padded" } } satisfies Meta;
export default meta;
type Story = StoryObj;

export const SemanticPalette: Story = { render: () => <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>{tokens.map(([label, token]) => <div key={token} style={{ border: "1px solid var(--editorial-border)", background: "var(--editorial-bg-surface)", padding: 12 }}><div style={{ height: 72, marginBottom: 10, border: "1px solid var(--editorial-border)", background: `var(${token})` }} /><strong style={{ display: "block", fontFamily: '"Noto Sans KR", sans-serif' }}>{label}</strong><code>{token}</code></div>)}</div> };

export const ActionAndSpacing: Story = { render: () => <section style={{ display: "grid", gap: "var(--editorial-ref-space-8)", fontFamily: "var(--editorial-font-sans)", color: "var(--editorial-fg)" }}><div><h2 style={{ fontFamily: "var(--editorial-font-serif)" }}>Action roles</h2><button className="editorial-button" style={{ background: "var(--editorial-action-bg)", borderColor: "var(--editorial-action-bg)", color: "var(--editorial-action-fg)" }}>계속 읽기</button><p>Filled action and focus must remain legible in both themes.</p></div><div><h2 style={{ fontFamily: "var(--editorial-font-serif)" }}>Spacing scale</h2><div style={{ display: "grid", gap: "var(--editorial-ref-space-3)" }}>{[1,2,3,4,5,6,8,12,16,18].map(step => <div key={step} style={{ display: "flex", alignItems: "center", gap: "var(--editorial-ref-space-4)" }}><code style={{ width: 145 }}>{`--editorial-ref-space-${step}`}</code><span style={{ display: "block", height: 12, width: `var(--editorial-ref-space-${step})`, background: "var(--editorial-action-bg)" }} /></div>)}</div></div></section> };
