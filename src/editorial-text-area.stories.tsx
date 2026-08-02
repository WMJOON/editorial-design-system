import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialTextArea } from "./editorial-controls.js";

const meta = { title: "Atoms/Inputs/Text area", component: EditorialTextArea, args: { label: "요약", placeholder: "독자에게 먼저 보일 핵심 내용을 적습니다.", rows: 5, size: "md" }, parameters: { layout: "centered" } } satisfies Meta<typeof EditorialTextArea>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
