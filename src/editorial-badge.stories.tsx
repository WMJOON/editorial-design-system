import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialBadge } from "./editorial-components.js";

const meta = { title: "Atoms/Metadata/Badge", component: EditorialBadge, args: { children: "Published", size: "md" }, parameters: { layout: "padded" } } satisfies Meta<typeof EditorialBadge>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
