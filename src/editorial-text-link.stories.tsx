import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialTextLink } from "./editorial-text-link.js";

const meta = {
  title: "Atoms/Text link",
  component: EditorialTextLink,
  args: {
    href: "#more",
    children: "All notes",
  },
} satisfies Meta<typeof EditorialTextLink>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Contact: Story = { args: { href: "mailto:hello@example.com", children: "함께 이야기하기" } };
