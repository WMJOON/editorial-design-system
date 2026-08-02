import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialCollection } from "./editorial-collection.js";

const items = [
  { id: "llm", href: "#llm", title: "이 작업에 LLM까지 쓸 필요가 있었나", category: "Framework", date: "2026-07-28", excerpt: "도구를 고르는 일과 문제의 경계를 정하는 일은 다르다.", cover: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80" },
  { id: "routing", href: "#routing", title: "콘텐츠를 개인화해도, 명제까지 바꾸면 안 된다", category: "Essay", date: "2026-08-02", excerpt: "독자 경로가 달라도 정보의 명제는 고정해야 한다." },
  { id: "agent", href: "#agent", title: "내가 MCP 업데이트를 기다리는 이유: AI 에이전트가 전환을 끊을 수 있게 됐다", category: "Thought leadership", date: "2026-07-15", excerpt: "운영 체계 안에서 도구가 이어지는 방식에 대한 기록이다." },
];

const meta = {
  title: "Organisms/Editorial Collection",
  component: EditorialCollection,
  args: { items, heading: "Latest", countLabel: "3 notes", showExcerpt: true, loadMoreHref: "#all" },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof EditorialCollection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ListWithExcerpts: Story = {};
export const CoverCards: Story = { args: { defaultView: "grid", showExcerpt: false } };
export const CompactTopicArchive: Story = { args: { heading: undefined, countLabel: "45 notes", showExcerpt: false, loadMoreHref: undefined } };
