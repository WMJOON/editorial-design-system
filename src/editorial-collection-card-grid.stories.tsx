import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialCollectionCardGrid } from "./editorial-collection-items.js";

const meta = {
  title: "Molecules/Editorial Collection/Card grid",
  component: EditorialCollectionCardGrid,
  args: { items: [
    { id: "llm", href: "#llm", title: "이 작업에 LLM까지 쓸 필요가 있었나", category: "Framework", date: "2026-07-28", cover: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80" },
    { id: "routing", href: "#routing", title: "콘텐츠를 개인화해도, 명제까지 바꾸면 안 된다", category: "Essay", date: "2026-08-02" },
    { id: "agent", href: "#agent", title: "내가 MCP 업데이트를 기다리는 이유", category: "Thought leadership", date: "2026-07-15" },
  ] },
  parameters: { layout: "padded" },
} satisfies Meta<typeof EditorialCollectionCardGrid>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
