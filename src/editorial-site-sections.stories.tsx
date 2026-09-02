import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialProjectLinks, EditorialSiteFooter, EditorialTopicBar, EditorialTopicIndex } from "./editorial-site-sections.js";

const topics = [
  { href: "#agent", label: "Agent systems", description: "에이전트, MCP, 워크플로와 실행 구조", count: 45 },
  { href: "#knowledge", label: "Knowledge systems", description: "온톨로지, 그래프, 근거와 기억", count: 29 },
  { href: "#native", label: "AI-native work", description: "일하는 방식, 조직, 전환의 감각", count: 34 },
  { href: "#content", label: "Content systems", description: "콘텐츠, 브랜드, 유통과 관측", count: 14 },
];

const meta = { title: "Organisms/Site sections", parameters: { layout: "fullscreen" } } satisfies Meta;
export default meta;
type Story = StoryObj;

export const TopicBar: Story = { render: () => <EditorialTopicBar topics={topics} /> };
export const TopicIndex: Story = { render: () => <EditorialTopicIndex topics={topics} /> };
export const ProjectLinks: Story = { render: () => <div style={{ width: "min(620px, calc(100% - 32px))", margin: "40px auto" }}><EditorialProjectLinks projects={[{ href: "#hub", title: "Content Broadcast Hub" }, { href: "#ontology", title: "Visual Identity Ontology" }, { href: "#corpus", title: "Corpus Analysis MCP" }, { href: "#kb", title: "Personal Knowledge Base" }]} /></div> };
export const SiteFooter: Story = { render: () => <EditorialSiteFooter copyright="© 2026 WMJOON" email="hello@example.com" /> };
