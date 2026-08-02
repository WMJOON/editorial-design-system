import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialBadge, EditorialNav, EditorialTag, EditorialTags } from "./editorial-components.js";
import { EditorialThemeSelector } from "./theme-selector.js";

const meta = { title: "Components/Editorial Primitives", parameters: { layout: "padded" } } satisfies Meta;
export default meta;
type Story = StoryObj;

export const Navigation: Story = { render: () => <EditorialNav brand="WOODY / NOTES" links={[{ href: "#notes", label: "All notes" }, { href: "#topics", label: "Topics" }]} trailing={<EditorialThemeSelector storageKey="storybook-theme" />} /> };
export const TagsAndBadges: Story = { render: () => <div style={{ display: "grid", gap: 24, maxWidth: 720 }}><EditorialTags tags={["AI-native work", "Knowledge systems", "Research"]} /><div style={{ display: "flex", gap: 8, alignItems: "center" }}><EditorialTag>독자 경로</EditorialTag><EditorialBadge>New</EditorialBadge><EditorialBadge>12</EditorialBadge></div></div> };
