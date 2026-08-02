import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialButton } from "./editorial-actions.js";

const meta = { title: "Atoms/Actions/Button", component: EditorialButton, args: { children: "초안 저장", variant: "secondary", size: "md" }, parameters: { layout: "centered" } } satisfies Meta<typeof EditorialButton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
