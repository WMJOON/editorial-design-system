import { EditorialTypography } from "./editorial-typography.js";

export type EditorialSeriesContextProps = {
  title: string;
  href: string;
  position: number;
  total?: number;
  allSeriesHref?: string;
};

export function EditorialSeriesContext({ title, href, position, total, allSeriesHref }: EditorialSeriesContextProps) {
  return <nav className="editorial-series-context" aria-label="현재 글의 시리즈">
    <EditorialTypography variant="meta">시리즈 글</EditorialTypography>
    <a href={href}><EditorialTypography variant="title-5">{title}</EditorialTypography> · 전체 글 보기 →</a>
    <EditorialTypography variant="meta" className="editorial-series-count">{position} / {total ?? "?"}편</EditorialTypography>
    {allSeriesHref && <a className="editorial-series-browse" href={allSeriesHref}><EditorialTypography variant="body-sm">다른 시리즈 보기 →</EditorialTypography></a>}
  </nav>;
}

export type EditorialSeriesNextProps = {
  seriesHref: string;
  previous?: { href: string; title: string; position: number; total: number };
  next?: { href: string; title: string; position: number; total: number };
};

export function EditorialSeriesNext({ seriesHref, previous, next }: EditorialSeriesNextProps) {
  return <nav className="editorial-series-next" aria-label="시리즈 이어 읽기">
    <EditorialTypography as="p" variant="meta" className="editorial-series-label">시리즈 이어 읽기</EditorialTypography>
    <div className="editorial-series-steps">
      {previous ? <a href={previous.href} className="editorial-series-step"><EditorialTypography variant="meta">이전 편 · {previous.position} / {previous.total}</EditorialTypography><EditorialTypography variant="title-5">{previous.title}</EditorialTypography><EditorialTypography variant="body-sm">← 이전 편 읽기</EditorialTypography></a>
        : <div className="editorial-series-step editorial-series-step--empty"><EditorialTypography variant="meta">이전 편</EditorialTypography><EditorialTypography variant="body-sm">첫 번째 글입니다</EditorialTypography></div>}
      {next ? <a href={next.href} className="editorial-series-step"><EditorialTypography variant="meta">다음 편 · {next.position} / {next.total}</EditorialTypography><EditorialTypography variant="title-5">{next.title}</EditorialTypography><EditorialTypography variant="body-sm">다음 편 읽기 →</EditorialTypography></a>
        : <div className="editorial-series-step editorial-series-step--empty"><EditorialTypography variant="meta">다음 편</EditorialTypography><EditorialTypography variant="body-sm">마지막 글입니다</EditorialTypography></div>}
    </div>
    <a className="editorial-series-all" href={seriesHref}><EditorialTypography variant="body-sm">시리즈 전체 보기 →</EditorialTypography></a>
  </nav>;
}
