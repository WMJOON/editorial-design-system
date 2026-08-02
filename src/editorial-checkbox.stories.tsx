import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialCheckbox } from "./editorial-controls.js";

const meta = { title: "Atoms/Inputs/Checkbox", component: EditorialCheckbox, args: { label: "이번 변경을 발행 원장에 기록", defaultChecked: true }, parameters: { layout: "centered" } } satisfies Meta<typeof EditorialCheckbox>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
