import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialCollectionList } from "./editorial-collection-items.js";

const items = [
  { id: "llm", href: "#llm", title: "이 작업에 LLM까지 쓸 필요가 있었나", category: "Framework", date: "2026-07-28", excerpt: "도구를 고르는 일과 문제의 경계를 정하는 일은 다르다." },
  { id: "routing", href: "#routing", title: "콘텐츠를 개인화해도, 명제까지 바꾸면 안 된다", category: "Essay", date: "2026-08-02", excerpt: "독자 경로가 달라도 정보의 명제는 고정해야 한다." },
];

const meta = {
  title: "Molecules/Editorial Collection/List",
  component: EditorialCollectionList,
  args: { items, showExcerpt: true },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 1100 }}><Story /></div>],
} satisfies Meta<typeof EditorialCollectionList>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
