import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialDiscoverySections } from "./editorial-discovery-sections.js";

const topics = [
  { href: "#agents", label: "Agent systems" },
  { href: "#knowledge", label: "Knowledge systems" },
  { href: "#content", label: "Content systems" },
];

const meta = { title: "Organisms/Discovery sections", parameters: { layout: "padded" } } satisfies Meta;
export default meta;
type Story = StoryObj;

export const TopicsOnly: Story = {
  render: () => <EditorialDiscoverySections topics={topics} interestsHref="#interests" />,
};

export const TopicsAndSeries: Story = {
  render: () => <EditorialDiscoverySections topics={topics} interestsHref="#interests" series={[
    { href: "#series-1", title: "그림으로 하나씩 배우는 온톨로지", countLabel: "7 notes" },
    { href: "#series-2", title: "트렌드 뉴스", countLabel: "3 notes" },
  ]} allSeriesHref="#series" allSeriesLabel="모든 시리즈 보기" />,
};
