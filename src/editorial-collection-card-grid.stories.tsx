import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialCollectionCardGrid } from "./editorial-collection-items.js";

const meta = {
  title: "Molecules/Editorial Collection/Card grid",
  component: EditorialCollectionCardGrid,
  args: { items: [
    { id: "llm", href: "#llm", title: "이 작업에 LLM까지 쓸 필요가 있었나", category: "Framework", date: "2026-07-28", excerpt: "도구를 고르는 일과 문제의 경계를 정하는 일은 다르다.", cover: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80" },
    { id: "routing", href: "#routing", title: "콘텐츠를 개인화해도, 명제까지 바꾸면 안 된다", category: "Essay", date: "2026-08-02", excerpt: "사용자의 맥락에 맞춰 설명은 달라져도 콘텐츠의 핵심 명제는 유지되어야 한다." },
    { id: "agent", href: "#agent", title: "내가 MCP 업데이트를 기다리는 이유", category: "Thought leadership", date: "2026-07-15", excerpt: "도구 연결 규약이 제품의 가능성과 운영 비용을 함께 바꾸는 과정을 살펴본다." },
  ] },
  parameters: { layout: "padded" },
} satisfies Meta<typeof EditorialCollectionCardGrid>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
