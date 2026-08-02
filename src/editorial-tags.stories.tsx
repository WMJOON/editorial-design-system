import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialTags } from "./editorial-components.js";
import { EditorialThemeSelector } from "./theme-selector.js";

const meta = { title: "Molecules/Metadata groups", parameters: { layout: "padded" } } satisfies Meta;
export default meta;
type Story = StoryObj;

export const Tags: Story = { render: () => <EditorialTags tags={["AI-native work", "Knowledge systems", "Research"]} /> };
export const ThemeSelector: Story = { render: () => <EditorialThemeSelector storageKey="storybook-theme" /> };
