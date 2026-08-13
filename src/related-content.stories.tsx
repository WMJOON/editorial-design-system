import type { Meta, StoryObj } from "@storybook/react-vite";
import { RelatedContent } from "../../personal-site/cloudflare-pages/app/components/related-content";
import "./related-content.story.css";

const sourceArticle = {
  slug: "agentic-workflow-foundations",
  title: "에이전트 워크플로를 설계하는 기준",
  subtitle: "실행 흐름을 시스템으로 다루기 위한 출발점",
  date: "2026-08-13",
  category: "Framework",
  tags: ["agentic-workflow", "evaluation"],
  topic: "agent-systems",
  coreTags: ["agentic-workflow", "evaluation"],
  readerRoles: ["builder", "strategist"],
  readerGoal: "understand",
  relatedArticles: [],
  content: "",
};

const topicArticles = [
  { ...sourceArticle, slug: "workflow-evaluation", title: "워크플로 평가를 설계하는 법", subtitle: "좋은 실행과 좋은 평가를 분리하는 방법", recommendationReason: "topic_match", recommendationRank: 1 },
  { ...sourceArticle, slug: "agent-context", title: "Agent context는 무엇인가", subtitle: "실행에 필요한 맥락을 다루는 구조", recommendationReason: "topic_match", recommendationRank: 2 },
  { ...sourceArticle, slug: "human-in-the-loop", title: "HITL은 두 번 설계되어야 한다", subtitle: "권한과 검증을 분리하는 이유", recommendationReason: "topic_match", recommendationRank: 3 },
] as const;

const meta = {
  title: "Site/RelatedContent",
  component: RelatedContent,
  parameters: { layout: "fullscreen" },
  decorators: [(Story) => <main className="storybook-related-content"><Story /></main>],
} satisfies Meta<typeof RelatedContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sourceArticle,
    articles: [{ ...topicArticles[0], recommendationReason: "related", recommendationRank: 1 }, ...topicArticles.slice(1)],
  },
};
