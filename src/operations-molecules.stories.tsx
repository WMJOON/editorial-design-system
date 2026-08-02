import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialContentCard, EditorialMetricStrip } from "./editorial-operations.js";

const meta = { title: "Molecules/Operations", parameters: { layout: "padded" } } satisfies Meta;
export default meta;
type Story = StoryObj;

export const MetricStrip: Story = { render: () => <EditorialMetricStrip items={[{ value: 123, label: "전체 콘텐츠" }, { value: 109, label: "공개 반영 대상" }, { value: 0, label: "미디어 에셋" }, { value: 0, label: "누적 조회" }]} /> };
export const ContentCard: Story = { render: () => <div style={{ maxWidth: 380 }}><EditorialContentCard item={{ id: "example", date: "2026-08-02", type: "essay", title: "콘텐츠를 개인화해도, 명제까지 바꾸면 안 된다", taxonomy: "knowledge systems · reader path · article" }} /></div> };
