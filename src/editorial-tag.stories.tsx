import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialTag } from "./editorial-components.js";

const meta = { title: "Atoms/Metadata/Tag", component: EditorialTag, args: { children: "독자 경로", size: "md" }, parameters: { layout: "padded" } } satisfies Meta<typeof EditorialTag>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
