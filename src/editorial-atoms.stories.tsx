import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialBadge, EditorialTag } from "./editorial-components.js";

const meta = { title: "Atoms/Metadata", parameters: { layout: "padded" } } satisfies Meta;
export default meta;
type Story = StoryObj;

export const Tag: Story = { render: () => <EditorialTag>독자 경로</EditorialTag> };
export const Badge: Story = { render: () => <div style={{ display: "flex", gap: 8 }}><EditorialBadge>New</EditorialBadge><EditorialBadge>12</EditorialBadge></div> };
