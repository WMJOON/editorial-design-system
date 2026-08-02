import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialCollectionCard } from "./editorial-collection-items.js";

const meta = {
  title: "Molecules/Editorial Collection/Card",
  component: EditorialCollectionCard,
  args: { href: "#llm", title: "이 작업에 LLM까지 쓸 필요가 있었나", category: "Framework", date: "2026-07-28", cover: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80" },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 340 }}><Story /></div>],
} satisfies Meta<typeof EditorialCollectionCard>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
