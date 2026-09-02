import { useId } from "react";
import { EditorialWordWrap } from "./editorial-word-wrap.js";

export type EditorialTopicLink = {
  href: string;
  label: string;
};

export type EditorialTopicIndexItem = EditorialTopicLink & {
  description: string;
  count: number | string;
};

export type EditorialProjectLink = {
  href: string;
  title: string;
};

export function EditorialTopicBar({ topics, label = "Browse topics", id, className }: { topics: EditorialTopicLink[]; label?: string; id?: string; className?: string }) {
  return <nav id={id} className={["editorial-topic-bar", className].filter(Boolean).join(" ")} aria-label={label}>
    <div className="editorial-topic-bar__inner"><span>{label}</span>{topics.map((topic) => <a href={topic.href} key={`${topic.href}-${topic.label}`} data-analytics-event="select_content" data-analytics-content-type="topic" data-analytics-content-id={topic.href} data-analytics-content-name={topic.label} data-analytics-link-location="topic_bar">{topic.label}</a>)}</div>
  </nav>;
}

export function EditorialTopicIndex({ topics, heading = "Explore", className }: { topics: EditorialTopicIndexItem[]; heading?: string; className?: string }) {
  const headingId = useId();
  return <section className={["editorial-topic-index", className].filter(Boolean).join(" ")} aria-labelledby={headingId}>
    <p className="editorial-kicker" id={headingId}>{heading}</p>
    <div className="editorial-topic-index__list">{topics.map((topic) => <a href={topic.href} key={`${topic.href}-${topic.label}`} data-analytics-event="select_content" data-analytics-content-type="topic" data-analytics-content-id={topic.href} data-analytics-content-name={topic.label} data-analytics-link-location="topic_index">
      <span className="editorial-title-2"><EditorialWordWrap>{topic.label}</EditorialWordWrap></span>
      <small>{topic.description}</small>
      <b>{topic.count}</b>
    </a>)}</div>
  </section>;
}

export function EditorialProjectLinks({ projects, heading = "Selected systems", className }: { projects: EditorialProjectLink[]; heading?: string; className?: string }) {
  const headingId = useId();
  return <section className={["editorial-project-links", className].filter(Boolean).join(" ")} aria-labelledby={headingId}>
    <p className="editorial-kicker" id={headingId}>{heading}</p>
    <div>{projects.map((project) => <a href={project.href} key={`${project.href}-${project.title}`} data-analytics-event="select_content" data-analytics-content-type="project" data-analytics-content-id={project.href} data-analytics-content-name={project.title} data-analytics-link-location="project_links"><span className="editorial-project-links__title"><EditorialWordWrap>{project.title}</EditorialWordWrap></span><span className="editorial-project-links__arrow" aria-hidden="true">↗</span></a>)}</div>
  </section>;
}

export function EditorialSiteFooter({ copyright, email, emailHref, className }: { copyright: string; email: string; emailHref?: string; className?: string }) {
  return <footer className={["editorial-site-footer", className].filter(Boolean).join(" ")}>
    <div className="editorial-site-footer__inner"><span>{copyright}</span><a href={emailHref ?? `mailto:${email}`} data-analytics-event="contact_click" data-analytics-contact-method="email" data-analytics-link-location="footer">{email}</a></div>
  </footer>;
}
