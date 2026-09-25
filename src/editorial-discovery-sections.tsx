import { EditorialTypography } from "./editorial-typography.js";

export type EditorialDiscoverySectionsProps = {
  topics: Array<{ href: string; label: string }>;
  interestsHref: string;
  series: Array<{ href: string; title: string; countLabel: string; current?: boolean }>;
  allSeriesHref: string;
  allSeriesLabel: string;
};

export function EditorialDiscoverySections({ topics, interestsHref, series, allSeriesHref, allSeriesLabel }: EditorialDiscoverySectionsProps) {
  return <div className="editorial-discovery-sections">
    <section aria-labelledby="editorial-discovery-topics-heading">
      <EditorialTypography as="h2" variant="title-3" className="editorial-discovery-heading" id="editorial-discovery-topics-heading">Explore topics</EditorialTypography>
      <div className="editorial-discovery-topics">{topics.map((topic) => <a key={topic.href} href={topic.href}><EditorialTypography variant="body-sm">{topic.label}</EditorialTypography></a>)}</div>
      <a className="editorial-discovery-more" href={interestsHref}><EditorialTypography variant="body-sm">관심 주제 설정 →</EditorialTypography></a>
    </section>
    <section aria-labelledby="editorial-discovery-series-heading">
      <EditorialTypography as="h2" variant="title-3" className="editorial-discovery-heading" id="editorial-discovery-series-heading">Featured series</EditorialTypography>
      <div className="editorial-discovery-series">{series.map((item) => <a key={item.href} href={item.href} className={item.current ? "is-current" : undefined}>
        <EditorialTypography variant="meta">{item.current ? `현재 읽는 시리즈 · ${item.countLabel}` : item.countLabel}</EditorialTypography>
        <EditorialTypography as="h3" variant="title-5">{item.title}</EditorialTypography>
      </a>)}</div>
      <a className="editorial-discovery-more" href={allSeriesHref}><EditorialTypography variant="body-sm">{allSeriesLabel} →</EditorialTypography></a>
    </section>
  </div>;
}
