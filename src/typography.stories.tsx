import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorialArticle } from "./editorial-components.js";

const rows = [
  ["Display", "editorial-display", <p className="editorial-display">Woody&apos;s Field Notes</p>],
  ["Page title / H1", "editorial-title-1", <h1 className="editorial-title-1">콘텐츠를 개인화해도, 명제까지 바꾸면 안 된다</h1>],
  ["Section / H2", "editorial-title-2", <h2 className="editorial-title-2">독자 경로를 다시 구성하는 방법</h2>],
  ["Subsection / H3", "editorial-title-3", <h3 className="editorial-title-3">고정해야 하는 정보 단위</h3>],
  ["Heading / H4", "editorial-title-4", <h4 className="editorial-title-4">검증 가능한 출처와 조건</h4>],
  ["Heading / H5", "editorial-title-5", <h5 className="editorial-title-5">문맥을 잃지 않는 설명</h5>],
  ["Label / H6", "editorial-title-6", <h6 className="editorial-title-6">Supporting context</h6>],
  ["Body", "1rem = 15–18px / 1.6", <p className="editorial-type-body">독자마다 필요한 순서와 예시는 다를 수 있다. 하지만 어떤 독자에게 보여도 바뀌면 안 되는 사실과 조건은 먼저 고정한다.</p>],
  ["Code", "ui-monospace / 0.85rem", <pre className="type-specimen-code">claim: "AI 인용은 추천을 보장하지 않는다."\nstatus: verified</pre>],
] as const;

const meta = { title: "Foundations/Typography", parameters: { layout: "padded" } } satisfies Meta;
export default meta;
type Story = StoryObj;

export const FullScale: Story = { render: () => <section className="type-specimen"><p className="editorial-kicker">Typography reference</p><p className="type-specimen-intro">브랜드용 display와 문서의 h1–h6, 본문 및 코드를 한 화면에서 비교합니다. 제목 위계는 Markdown과 페이지 제목에서 같은 역할을 유지합니다.</p>{rows.map(([label, token, sample]) => <div className="type-specimen-row" key={label}><div className="type-specimen-label">{label}<br />{token}</div><div>{sample}</div></div>)}</section> };

export const FluidReadingArticle: Story = {
  parameters: { layout: "fullscreen" },
  render: () => <div className="fluid-reading-story"><EditorialArticle
    category="Reading foundation"
    date="2026-09-02"
    title="화면은 넓어져도 읽기의 호흡은 무너지지 않아야 한다"
    subtitle="루트 1rem은 15px에서 18px까지 변하고, 본문·제목·카드·간격이 같은 비율로 따라갑니다."
    tags={["fluid typography", "reading measure"]}
    content={`## 크기는 부드럽게, 폭은 단단하게

모바일에서는 루트 1rem이 15px에서 시작하고, 화면이 넓어질수록 18px까지 부드럽게 커집니다. 본문은 1rem을 사용하고 제목, 여백, 카드는 그 기준의 rem 비율로 함께 조정됩니다.

데스크톱에서도 글줄은 720px을 넘지 않습니다. 이렇게 하면 한 줄이 지나치게 길어지지 않고 다음 줄의 시작점을 안정적으로 찾을 수 있습니다.

### 유동화하는 것과 고정하는 것

- 제목과 본문 크기, 문단 간격, 카드 패딩과 간격은 루트 rem에 비례합니다.
- 보더 두께, 터치 타깃, 아이콘, 읽기 최대 폭은 고정합니다.`}
  /></div>,
};
