import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialIndexHeader } from "./editorial-index-header.js";

const meta = {
  title: "Organisms/Index header",
  component: EditorialIndexHeader,
  parameters: { layout: "padded" },
  args: {
    kicker: "Topic · 45 notes",
    title: "Agent systems",
    description: "에이전트, MCP, 워크플로와 실행 구조",
  },
} satisfies Meta<typeof EditorialIndexHeader>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Topic: Story = {};
export const Archive: Story = { args: { kicker: "Archive · 111 notes", title: "All notes", description: "생각과 작업의 기록을 주제와 시간 순서로 모읍니다." } };
