import type { Meta, StoryObj } from "@storybook/react-vite";
import { HomeRecommendationCarousel } from "../../personal-site/cloudflare-pages/app/components/home-recommendation-carousel";

const articles = [
  { slug: "semantic-atlas", title: "같은 문장인데, 왜 다른 AI가 필요할까", subtitle: "사용자 목적과 조직구조까지 가게 된 이유", date: "2026-08-13", category: "explainer", tags: [], coreTags: [], domainKnowledge: ["ai-systems"], knowledgeLevel: "practitioner", targetRoles: ["builder"], ageGroups: ["all"], keyTopics: ["ai-system-design"], trendKeywords: ["ai-agents"] },
  { slug: "model-module", title: "AI 모델은 처리 모듈이다", subtitle: "모델을 시스템 안에서 바라보는 관점", date: "2026-08-11", category: "thought leadership", tags: [], coreTags: [], domainKnowledge: ["ai-systems"], knowledgeLevel: "practitioner", targetRoles: ["strategist"], ageGroups: ["all"], keyTopics: ["model-evaluation"], trendKeywords: ["ai-native"] },
  { slug: "image-grammar", title: "생성 이미지의 문법은 프롬프트에 있지 않다", subtitle: "생성 결과의 구조를 읽는 방법", date: "2026-08-10", category: "essay", tags: [], coreTags: [], domainKnowledge: ["content-marketing"], knowledgeLevel: "foundational", targetRoles: ["operator"], ageGroups: ["all"], keyTopics: ["image-generation"], trendKeywords: ["generative-ai"] },
] as const;

const meta = {
  title: "Site/HomeRecommendationCarousel",
  component: HomeRecommendationCarousel,
  parameters: { layout: "fullscreen" },
  decorators: [(Story) => <main style={{ padding: "40px 0" }}><Story /></main>],
} satisfies Meta<typeof HomeRecommendationCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { articles } };
