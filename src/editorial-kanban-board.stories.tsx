import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialKanbanBoard } from "./editorial-operations.js";

const meta = { title: "Organisms/Operations/Content pipeline", component: EditorialKanbanBoard, args: { columns: [{ id: "draft", label: "Draft", description: "원문을 다듬는 중", count: 11, items: [{ id: "draft-1", date: "2026-08-02", type: "essay", title: "AI가 인용한 페이지와 AI가 추천한 브랜드는 다를 수 있다", taxonomy: ["knowledge systems", "reader path"] }] }, { id: "process", label: "In process", description: "채널·미디어를 준비하는 중", count: 1, items: [{ id: "process-1", date: "2026-08-02", type: "essay", title: "콘텐츠를 개인화해도, 명제까지 바꾸면 안 된다", taxonomy: ["knowledge systems", "reader path"] }] }, { id: "published", label: "Published", description: "발행 완료·공개 검토 대상", count: 111, items: [{ id: "published-1", date: "2026-07-28", type: "framework", title: "이 작업에 LLM까지 쓸 필요가 있었나", taxonomy: ["ai-native work"] }] }] }, parameters: { layout: "padded" } } satisfies Meta<typeof EditorialKanbanBoard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
