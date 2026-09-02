import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialSiteIntro } from "./editorial-components.js";

const CircleMark = ({ letter }: { letter: string }) => <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M9 12h6M12 9v6" fill="none" stroke="currentColor" strokeWidth="1.6" /><text x="12" y="15" textAnchor="middle" fontSize="7" fontFamily="Arial" fill="currentColor">{letter}</text></svg>;

const meta = {
  title: "Organisms/Site intro",
  component: EditorialSiteIntro,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof EditorialSiteIntro>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    eyebrow: "Independent writing on AI, knowledge, and systems.",
    title: "Woody's Field Notes",
    lede: "자동화, 리서치 인프라, 콘텐츠 시스템을 만들고 그 과정에서 배운 것을 기록합니다.",
    socialLabel: "Woody's social links",
    socialLinks: [
      { href: "#linkedin", label: "LinkedIn", icon: <CircleMark letter="in" /> },
      { href: "#github", label: "GitHub", icon: <CircleMark letter="gh" /> },
      { href: "#notion", label: "Notion", icon: <CircleMark letter="N" /> },
    ],
  },
};

export const LongKoreanTitle: Story = {
  args: {
    eyebrow: "A responsive and language-aware landing introduction.",
    title: "지식이 흐르고, 다시 쓰일 수 있게 만드는 기록",
    lede: "제목은 컨테이너 안에서 단어 단위로 줄바꿈되고, 좁은 화면에서도 레이아웃을 밀어내지 않습니다.",
  },
};
