import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialCheckbox, EditorialInput, EditorialSelect, EditorialTextArea } from "./editorial-controls.js";

const meta = { title: "Atoms/Inputs", parameters: { layout: "centered" } } satisfies Meta;
export default meta;
type Story = StoryObj;

export const TextInput: Story = { render: () => <div style={{ display: "grid", gap: 18, width: 320 }}><EditorialInput label="제목" placeholder="콘텐츠 제목을 입력하세요" size="sm" /><EditorialInput label="URL 슬러그" defaultValue="editorial-routing" /><EditorialInput label="검색 키워드" defaultValue="AI 검색" size="lg" /></div> };
export const Selection: Story = { render: () => <div style={{ display: "grid", gap: 18, width: 320 }}><EditorialSelect label="콘텐츠 형식" defaultValue="essay" options={[{ value: "essay", label: "에세이" }, { value: "guide", label: "가이드" }, { value: "brief", label: "브리프" }]} /><EditorialCheckbox label="이번 변경을 발행 원장에 기록" defaultChecked /></div> };
export const TextArea: Story = { render: () => <EditorialTextArea label="요약" placeholder="독자에게 먼저 보일 핵심 내용을 적습니다." rows={5} style={{ width: 360 }} /> };
