import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialMetricStrip } from "./editorial-operations.js";

const meta = { title: "Molecules/Operations/Metric strip", component: EditorialMetricStrip, args: { items: [{ value: 123, label: "전체 콘텐츠" }, { value: 109, label: "공개 반영 대상" }, { value: 0, label: "미디어 에셋" }, { value: 0, label: "누적 조회" }] }, parameters: { layout: "padded" } } satisfies Meta<typeof EditorialMetricStrip>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
