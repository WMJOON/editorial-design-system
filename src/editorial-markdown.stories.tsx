import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialMarkdown } from "./editorial-markdown.js";

const url = `https://example.com/research/${"longpathsegment".repeat(12)}?source=mobile`;
const content = `긴 URL도 본문 너비 안에서 줄바꿈되어야 합니다.

[${url}](${url})

- 목록의 출처: [${url}](${url})

> 인용문의 출처: [${url}](${url})

인라인 코드: \`${url}\`

\`\`\`text
${url}
\`\`\`

| 출처 | 설명 |
| --- | --- |
| [${url}](${url}) | 표는 자체 영역에서 가로 스크롤합니다. |
`;

const meta = { title: "Editorial/Markdown", component: EditorialMarkdown } satisfies Meta<typeof EditorialMarkdown>;
export default meta;
type Story = StoryObj<typeof meta>;

export const LongUrls: Story = {
  args: { content },
  decorators: [(Story) => <div style={{ maxWidth: 328, margin: "0 auto" }}><Story /></div>],
};
