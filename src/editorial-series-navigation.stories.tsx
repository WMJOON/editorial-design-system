import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialSeriesContext, EditorialSeriesNext } from "./editorial-series-navigation.js";

const meta = {
  title: "Editorial/Series navigation",
  component: EditorialSeriesContext,
  args: { title: "시리즈 제목", href: "/series/example/", position: 2, total: 4 },
} satisfies Meta<typeof EditorialSeriesContext>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CurrentEpisode: Story = {};
export const NextEpisode = { render: () => <EditorialSeriesNext seriesHref="/series/example/" next={{ href: "/writing/next/", title: "다음 글 제목", position: 3, total: 4 }} /> };
export const LastEpisode = { render: () => <EditorialSeriesNext seriesHref="/series/example/" /> };
