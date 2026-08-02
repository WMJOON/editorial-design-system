import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialButton } from "./editorial-actions.js";
import { EditorialModal } from "./editorial-modal.js";

const meta = {
  title: "Patterns/Overlay",
  component: EditorialModal,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof EditorialModal>;

export default meta;
type Story = StoryObj<typeof meta>;

function ModalExample() {
  const [open, setOpen] = useState(true);
  return <>
    <EditorialButton onClick={() => setOpen(true)}>원고 편집 열기</EditorialButton>
    <EditorialModal open={open} onClose={() => setOpen(false)} eyebrow="CONTENT FILE / LOCAL EDIT" title="콘텐츠를 개인화해도, 명제까지 바꾸면 안 된다" footer={<><EditorialButton variant="quiet" onClick={() => setOpen(false)}>취소</EditorialButton><EditorialButton variant="primary">로컬에 저장</EditorialButton></>}>
      <p style={{ margin: 0, font: '1rem/1.7 "Noto Sans KR", Arial, sans-serif' }}>원고 편집, 확인, 또는 짧은 작업을 한 화면 안에서 끝내는 모달 패턴입니다. 바깥 영역을 누르거나 Escape 키를 누르면 닫힙니다.</p>
    </EditorialModal>
  </>;
}

export const Default: Story = { render: () => <ModalExample /> };
