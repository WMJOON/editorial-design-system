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
    <EditorialModal open={open} onClose={() => setOpen(false)} title="원고 편집" footer={<><EditorialButton variant="quiet" onClick={() => setOpen(false)}>취소</EditorialButton><EditorialButton variant="primary">로컬에 저장</EditorialButton></>}>
      <p className="editorial-type-body" style={{ margin: 0 }}>원고 편집, 확인, 또는 짧은 작업을 한 화면 안에서 끝내는 모달 패턴입니다. 바깥 영역을 누르거나 Escape 키를 누르면 닫힙니다.</p>
    </EditorialModal>
  </>;
}

export const Default: Story = { render: () => <ModalExample /> };
