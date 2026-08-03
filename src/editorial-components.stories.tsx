import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialNav, EditorialSiteHeader } from "./editorial-components.js";

const meta = { title: "Molecules/Navigation", component: EditorialNav, args: { brand: "WOODY / NOTES", links: [{ href: "#notes", label: "All notes" }, { href: "#topics", label: "Topics" }] }, parameters: { layout: "padded" } } satisfies Meta<typeof EditorialNav>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Navigation: Story = {};

export const SiteHeader: Story = {
  render: (args) => <EditorialSiteHeader {...args} />,
};
