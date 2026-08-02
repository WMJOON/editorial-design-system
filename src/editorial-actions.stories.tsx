import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialButton, EditorialIconButton } from "./editorial-actions.js";

const meta = {
  title: "Atoms/Actions",
  component: EditorialButton,
  parameters: { layout: "centered" },
} satisfies Meta<typeof EditorialButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonVariants: Story = {
  render: () => <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
    <EditorialButton variant="primary" size="sm">발행 준비</EditorialButton>
    <EditorialButton size="md">초안 저장</EditorialButton>
    <EditorialButton variant="quiet" size="lg">취소</EditorialButton>
    <EditorialButton disabled>비활성</EditorialButton>
  </div>,
};

export const IconButton: Story = {
  render: () => <div style={{ display: "flex", gap: 12 }}>
    <EditorialIconButton label="목록 보기" size="sm"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h14M5 12h14M5 18h14" /></svg></EditorialIconButton>
    <EditorialIconButton label="편집하기" variant="primary" size="lg"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 16.5-.5 4 4-.5L18.8 8.7l-3.5-3.5L4 16.5Z M13.9 6.6l3.5 3.5" /></svg></EditorialIconButton>
  </div>,
};
