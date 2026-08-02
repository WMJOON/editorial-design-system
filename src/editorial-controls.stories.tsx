import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialSegmentedControl, EditorialSelect } from "./editorial-controls.js";

const meta = {
  title: "Molecules/Selection",
  component: EditorialSelect,
  parameters: { layout: "centered" },
} satisfies Meta<typeof EditorialSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Select: Story = {
  args: {
    label: "콘텐츠 형식",
    defaultValue: "essay",
    options: [
      { value: "essay", label: "에세이" },
      { value: "guide", label: "가이드" },
      { value: "brief", label: "브리프" },
    ],
  },
};

function ThemePreferenceExample() {
  const [value, setValue] = useState("system");
  return <EditorialSegmentedControl label="테마 선택" value={value} onChange={setValue} options={[
    { value: "light", label: "라이트" },
    { value: "dark", label: "다크" },
    { value: "system", label: "시스템" },
  ]} />;
}

export const SegmentedControl: Story = { render: () => <ThemePreferenceExample /> };
