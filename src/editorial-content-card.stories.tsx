import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialContentCard } from "./editorial-operations.js";

const meta = { title: "Molecules/Operations/Content card", component: EditorialContentCard, args: { item: { id: "example", date: "2026-08-02", type: "essay", title: "콘텐츠를 개인화해도, 명제까지 바꾸면 안 된다", taxonomy: ["knowledge systems", "reader path"] } }, parameters: { layout: "padded" }, decorators: [(Story) => <div style={{ maxWidth: 380 }}><Story /></div>] } satisfies Meta<typeof EditorialContentCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
