import type { Meta, StoryObj } from "@storybook/react";
import { EditorialDivider } from "./editorial-divider.js";

const meta = { title: "Components/Editorial Divider", component: EditorialDivider } satisfies Meta<typeof EditorialDivider>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = { args: { orientation: "horizontal" }, decorators: [(Story) => <div style={{ width: 320, paddingBlock: 24 }}><Story /></div>] };
export const Vertical: Story = { args: { orientation: "vertical" }, decorators: [(Story) => <div style={{ height: 160, display: "flex" }}><Story /></div>] };
