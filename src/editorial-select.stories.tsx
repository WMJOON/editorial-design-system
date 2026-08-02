import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialSelect } from "./editorial-controls.js";

const meta = { title: "Atoms/Inputs/Select", component: EditorialSelect, args: { label: "콘텐츠 형식", defaultValue: "essay", options: [{ value: "essay", label: "에세이" }, { value: "guide", label: "가이드" }, { value: "brief", label: "브리프" }], size: "md" }, parameters: { layout: "centered" } } satisfies Meta<typeof EditorialSelect>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
