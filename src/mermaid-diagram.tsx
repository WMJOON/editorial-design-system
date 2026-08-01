"use client";

import { useEffect, useId, useRef, useState } from "react";

export function MermaidDiagram({ chart }: { chart: string }) {
  const container = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const id = `mermaid-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  useEffect(() => {
    let cancelled = false;
    setError(false);

    async function renderDiagram() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({ startOnLoad: false, securityLevel: "strict", theme: "base", themeVariables: { primaryColor: "#e8edff", primaryTextColor: "#161616", primaryBorderColor: "#1d4ed8", lineColor: "#4b5563", secondaryColor: "#eeeee9", tertiaryColor: "#f7f7f3", fontFamily: "Noto Sans KR, Arial, sans-serif" } });
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled && container.current) container.current.innerHTML = svg;
      } catch {
        if (!cancelled) setError(true);
      }
    }

    renderDiagram();
    return () => { cancelled = true; };
  }, [chart, id]);

  if (error) return <details className="editorial-mermaid-error"><summary>다이어그램 원문 보기</summary><pre><code>{chart}</code></pre></details>;
  return <div ref={container} className="editorial-mermaid-diagram" role="img" aria-label="Mermaid diagram" />;
}
