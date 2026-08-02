import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialCollectionListItem } from "./editorial-collection-items.js";

const meta = {
  title: "Molecules/Editorial Collection/List Item",
  component: EditorialCollectionListItem,
  args: { href: "#llm", title: "이 작업에 LLM까지 쓸 필요가 있었나", category: "Framework", date: "2026-07-28", excerpt: "도구를 고르는 일과 문제의 경계를 정하는 일은 다르다.", showExcerpt: true },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 1100 }}><Story /></div>],
} satisfies Meta<typeof EditorialCollectionListItem>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
