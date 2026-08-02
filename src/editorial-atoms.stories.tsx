import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialBadge, EditorialTag } from "./editorial-components.js";

const meta = { title: "Atoms/Metadata", parameters: { layout: "padded" } } satisfies Meta;
export default meta;
type Story = StoryObj;

export const Tag: Story = { render: () => <div style={{ display: "flex", alignItems: "center", gap: 12 }}><EditorialTag size="sm">독자 경로</EditorialTag><EditorialTag>독자 경로</EditorialTag><EditorialTag size="lg">독자 경로</EditorialTag></div> };
export const Badge: Story = { render: () => <div style={{ display: "flex", alignItems: "center", gap: 8 }}><EditorialBadge size="sm">New</EditorialBadge><EditorialBadge>12</EditorialBadge><EditorialBadge size="lg">Published</EditorialBadge></div> };
