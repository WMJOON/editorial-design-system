import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialEditorShell } from "./editorial-operations.js";
import { EditorialTextArea } from "./editorial-controls.js";

const meta = { title: "Organisms/Operations/Markdown editor", component: EditorialEditorShell, args: { title: "콘텐츠를 개인화해도, 명제까지 바꾸면 안 된다", mode: "edit" }, parameters: { layout: "padded" } } satisfies Meta<typeof EditorialEditorShell>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: (args) => <EditorialEditorShell {...args}><EditorialTextArea label="Markdown 원고" labelHidden className="editorial-type-code editorial-ops-editor-textarea" defaultValue={'---\ntitle: "콘텐츠를 개인화해도, 명제까지 바꾸면 안 된다"\n---\n\n## 고정해야 하는 정보 단위\n\n독자 경로가 달라도, 명제와 근거는 보존한다.'} /></EditorialEditorShell> };
