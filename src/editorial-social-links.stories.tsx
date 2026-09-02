import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialSocialLinks } from "./editorial-social-links.js";

function SocialMark({ label }: { label: string }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.6" /><text x="12" y="15" textAnchor="middle" fontSize="7" fontFamily="Arial" fill="currentColor">{label}</text></svg>;
}

const meta = {
  title: "Molecules/Social links",
  component: EditorialSocialLinks,
  args: {
    label: "Woody's social links",
    links: [
      { href: "#linkedin", label: "LinkedIn에서 Woody 보기", icon: <SocialMark label="in" /> },
      { href: "#github", label: "GitHub에서 Woody 보기", icon: <SocialMark label="gh" /> },
      { href: "#notion", label: "Notion에서 Woody 보기", icon: <SocialMark label="N" /> },
    ],
  },
} satisfies Meta<typeof EditorialSocialLinks>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
