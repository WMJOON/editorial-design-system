import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialInput } from "./editorial-controls.js";

const meta = { title: "Atoms/Inputs/Text input", component: EditorialInput, args: { label: "제목", placeholder: "콘텐츠 제목을 입력하세요", size: "md" }, parameters: { layout: "centered" } } satisfies Meta<typeof EditorialInput>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
