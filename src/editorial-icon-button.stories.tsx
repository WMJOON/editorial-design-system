import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialIconButton } from "./editorial-actions.js";

const meta = { title: "Atoms/Actions/Icon button", component: EditorialIconButton, args: { label: "목록 보기", size: "md", children: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h14M5 12h14M5 18h14" /></svg> }, parameters: { layout: "centered" } } satisfies Meta<typeof EditorialIconButton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
