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
  next?: { href: string; title: string; position: number; total: number };
};

export function EditorialSeriesNext({ seriesHref, next }: EditorialSeriesNextProps) {
  return <nav className="editorial-series-next" aria-label="시리즈 이어 읽기">
    <EditorialTypography as="p" variant="meta" className="editorial-series-label">시리즈 이어 읽기</EditorialTypography>
    {next ? <a href={next.href}><EditorialTypography variant="meta">다음 편 · {next.position} / {next.total}</EditorialTypography><EditorialTypography as="h2" variant="title-3">{next.title}</EditorialTypography><EditorialTypography variant="body-sm">다음 편 읽기 →</EditorialTypography></a>
      : <EditorialTypography as="p" variant="body-sm" className="editorial-series-end">이 글이 시리즈의 마지막 편입니다. <a href={seriesHref}>시리즈 전체 글 보기 →</a></EditorialTypography>}
  </nav>;
}
