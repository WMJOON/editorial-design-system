import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialSocialLink } from "./editorial-social-link.js";

function LinkedInMark() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.6" /><text x="12" y="15" textAnchor="middle" fontSize="7" fontFamily="Arial" fill="currentColor">in</text></svg>;
}

const meta = {
  title: "Atoms/Social link",
  component: EditorialSocialLink,
  args: {
    href: "#linkedin",
    label: "LinkedIn에서 Woody 보기",
    icon: <LinkedInMark />,
  },
} satisfies Meta<typeof EditorialSocialLink>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
