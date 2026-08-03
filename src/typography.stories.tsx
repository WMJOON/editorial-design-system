import type { Meta, StoryObj } from "@storybook/react-vite";

const rows = [
  ["Display", "editorial-display", <p className="editorial-display">Woody&apos;s Field Notes</p>],
  ["Page title / H1", "editorial-title-1", <h1 className="editorial-title-1">콘텐츠를 개인화해도, 명제까지 바꾸면 안 된다</h1>],
  ["Section / H2", "editorial-title-2", <h2 className="editorial-title-2">독자 경로를 다시 구성하는 방법</h2>],
  ["Subsection / H3", "editorial-title-3", <h3 className="editorial-title-3">고정해야 하는 정보 단위</h3>],
  ["Heading / H4", "editorial-title-4", <h4 className="editorial-title-4">검증 가능한 출처와 조건</h4>],
  ["Heading / H5", "editorial-title-5", <h5 className="editorial-title-5">문맥을 잃지 않는 설명</h5>],
  ["Label / H6", "editorial-title-6", <h6 className="editorial-title-6">Supporting context</h6>],
  ["Body", "16px / 1.8", <p className="type-specimen-copy">독자마다 필요한 순서와 예시는 다를 수 있다. 하지만 어떤 독자에게 보여도 바뀌면 안 되는 사실과 조건은 먼저 고정한다.</p>],
  ["Code", "ui-monospace / 0.85rem", <pre className="type-specimen-code">claim: "AI 인용은 추천을 보장하지 않는다."\nstatus: verified</pre>],
] as const;

const meta = { title: "Foundations/Typography", parameters: { layout: "padded" } } satisfies Meta;
export default meta;
type Story = StoryObj;

export const FullScale: Story = { render: () => <section className="type-specimen"><p className="editorial-kicker">Typography reference</p><p className="type-specimen-intro">브랜드용 display와 문서의 h1–h6, 본문 및 코드를 한 화면에서 비교합니다. 제목 위계는 Markdown과 페이지 제목에서 같은 역할을 유지합니다.</p>{rows.map(([label, token, sample]) => <div className="type-specimen-row" key={label}><div className="type-specimen-label">{label}<br />{token}</div><div>{sample}</div></div>)}</section> };
