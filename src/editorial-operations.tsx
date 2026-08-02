import type { ReactNode } from "react";

export type EditorialMetric = { value: string | number; label: string };
export type EditorialKanbanCard = { id: string; date: string; type: string; title: string; taxonomy?: string };
export type EditorialKanbanColumn = { id: string; label: string; description: string; count: number; items: EditorialKanbanCard[] };

export function EditorialMetricStrip({ items }: { items: EditorialMetric[] }) {
  return <div className="editorial-ops-metrics">{items.map((item) => <div className="editorial-ops-metric" key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div>;
}

export function EditorialContentCard({ item }: { item: EditorialKanbanCard }) {
  return <article className="editorial-ops-card"><div className="editorial-ops-card-meta"><span>{item.date}</span><b>{item.type}</b></div><h4>{item.title}</h4>{item.taxonomy && <p className="editorial-ops-card-tags">{item.taxonomy}</p>}</article>;
}

export function EditorialKanbanBoard({ columns }: { columns: EditorialKanbanColumn[] }) {
  return <div className="editorial-ops-board" aria-label="콘텐츠 칸반 보드">{columns.map((column) => <section className="editorial-ops-column" key={column.id}><header className="editorial-ops-column-header"><div><h3>{column.label}</h3><p>{column.description}</p></div><b className="editorial-ops-column-count">{column.count}</b></header>{column.items.map((item) => <EditorialContentCard item={item} key={item.id} />)}</section>)}</div>;
}

export function EditorialEditorShell({ title, children, mode = "edit", actions }: { title: string; children: ReactNode; mode?: "preview" | "edit"; actions?: ReactNode }) {
  return <section className="editorial-ops-editor" aria-label="Markdown 편집 패턴"><header className="editorial-ops-editor-header"><div><p className="editorial-ops-kicker">Content file / local edit</p><h2>{title}</h2></div><button className="editorial-ops-button" type="button">닫기</button></header><div className="editorial-ops-editor-toolbar"><div><button className={`editorial-ops-button${mode === "preview" ? " is-active" : ""}`} type="button">미리보기</button><button className={`editorial-ops-button${mode === "edit" ? " is-active" : ""}`} type="button">Markdown 편집</button></div>{actions ?? <button className="editorial-ops-button primary" type="button">로컬에 저장</button>}</div>{children}</section>;
}
