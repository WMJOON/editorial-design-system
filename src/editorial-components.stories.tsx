import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialNav } from "./editorial-components.js";
import { EditorialThemeSelector } from "./theme-selector.js";

const meta = { title: "Molecules/Navigation", parameters: { layout: "padded" } } satisfies Meta;
export default meta;
type Story = StoryObj;

export const Navigation: Story = { render: () => <EditorialNav brand="WOODY / NOTES" links={[{ href: "#notes", label: "All notes" }, { href: "#topics", label: "Topics" }]} trailing={<EditorialThemeSelector storageKey="storybook-theme" />} /> };
