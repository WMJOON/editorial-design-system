import type { Meta, StoryObj } from "@storybook/react-vite";

const tokens = [
  ["Canvas", "--editorial-bg-canvas"], ["Surface", "--editorial-bg-surface"], ["Subtle", "--editorial-bg-subtle"], ["Foreground", "--editorial-fg"], ["Muted", "--editorial-fg-muted"], ["Border", "--editorial-border"], ["Accent", "--editorial-accent"], ["Link", "--editorial-link"],
];

const meta = { title: "Foundations/Color tokens", parameters: { layout: "padded" } } satisfies Meta;
export default meta;
type Story = StoryObj;

export const SemanticPalette: Story = { render: () => <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>{tokens.map(([label, token]) => <div key={token} style={{ border: "1px solid var(--editorial-border)", background: "var(--editorial-bg-surface)", padding: 12 }}><div style={{ height: 72, marginBottom: 10, border: "1px solid var(--editorial-border)", background: `var(${token})` }} /><strong style={{ display: "block", fontFamily: '"Noto Sans KR", sans-serif' }}>{label}</strong><code>{token}</code></div>)}</div> };
