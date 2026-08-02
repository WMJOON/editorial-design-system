import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialSegmentedControl } from "./editorial-controls.js";

const meta = { title: "Molecules/Selection/Segmented control", component: EditorialSegmentedControl, args: { label: "테마 선택", value: "system", options: [{ value: "light", label: "라이트" }, { value: "dark", label: "다크" }, { value: "system", label: "시스템" }], size: "md" }, parameters: { layout: "centered" } } satisfies Meta<typeof EditorialSegmentedControl>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: (args) => { const [value, setValue] = useState(args.value); return <EditorialSegmentedControl {...args} value={value} onChange={setValue} />; } };
