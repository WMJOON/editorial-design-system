import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialTags } from "./editorial-components.js";

const meta = { title: "Molecules/Metadata groups/Tags", component: EditorialTags, args: { tags: ["AI-native work", "Knowledge systems", "Research"], size: "md" }, parameters: { layout: "padded" } } satisfies Meta<typeof EditorialTags>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
