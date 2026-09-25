export type EditorialSeriesContextProps = {
  title: string;
  href: string;
  position: number;
  total?: number;
};

export function EditorialSeriesContext({ title, href, position, total }: EditorialSeriesContextProps) {
  return <nav className="editorial-series-context" aria-label="현재 글의 시리즈">
    <span className="editorial-series-kicker">시리즈 글</span>
    <a href={href}>{title} · 전체 글 보기 →</a>
    <span className="editorial-series-count">{position} / {total ?? "?"}편</span>
  </nav>;
}

export type EditorialSeriesNextProps = {
  seriesHref: string;
  next?: { href: string; title: string; position: number; total: number };
};

export function EditorialSeriesNext({ seriesHref, next }: EditorialSeriesNextProps) {
  return <nav className="editorial-series-next" aria-label="시리즈 이어 읽기">
    <p className="editorial-series-kicker">시리즈 이어 읽기</p>
    {next ? <a href={next.href}><span>다음 편 · {next.position} / {next.total}</span><strong>{next.title}</strong><span>다음 편 읽기 →</span></a>
      : <p>이 글이 시리즈의 마지막 편입니다. <a href={seriesHref}>시리즈 전체 글 보기 →</a></p>}
  </nav>;
}
