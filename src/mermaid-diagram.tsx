"use client";

import { useEffect, useId, useRef, useState } from "react";

export function MermaidDiagram({ chart }: { chart: string }) {
  const container = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const [themeVersion, setThemeVersion] = useState(0);
  const id = `mermaid-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  useEffect(() => {
    const root = document.documentElement;
    const refresh = () => setThemeVersion((value) => value + 1);
    const observer = new MutationObserver(refresh);
    observer.observe(root, { attributes: true, attributeFilter: ["data-editorial-theme", "class"] });
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    scheme.addEventListener("change", refresh);
    return () => { observer.disconnect(); scheme.removeEventListener("change", refresh); };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setError(false);

    async function renderDiagram() {
      try {
        const mermaid = (await import("mermaid")).default;
        const css = getComputedStyle(document.documentElement);
        const token = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
        const node = token("--editorial-mermaid-node-bg", "#fffdf8");
        const text = token("--editorial-mermaid-node-fg", "#27272a");
        const border = token("--editorial-mermaid-node-border", "#9a6a2b");
        const line = token("--editorial-mermaid-line", "#665f56");
        const secondary = token("--editorial-mermaid-secondary-bg", "#f3f1ed");
        const tertiary = token("--editorial-mermaid-tertiary-bg", "#f9e8d9");
        mermaid.initialize({ startOnLoad: false, securityLevel: "strict", theme: "base", themeVariables: { primaryColor: node, primaryTextColor: text, primaryBorderColor: border, lineColor: line, secondaryColor: secondary, secondaryTextColor: text, secondaryBorderColor: border, tertiaryColor: tertiary, tertiaryTextColor: text, tertiaryBorderColor: border, noteBkgColor: tertiary, noteTextColor: text, noteBorderColor: border, actorBkg: node, actorBorder: border, actorTextColor: text, actorLineColor: line, signalColor: line, signalTextColor: text, labelBoxBkgColor: node, labelTextColor: text, loopTextColor: text, fontFamily: "Noto Sans KR, Arial, sans-serif" } });
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled && container.current) container.current.innerHTML = svg;
      } catch {
        if (!cancelled) setError(true);
      }
    }

    renderDiagram();
    return () => { cancelled = true; };
  }, [chart, id, themeVersion]);

  if (error) return <details className="editorial-mermaid-error"><summary>다이어그램 원문 보기</summary><pre><code>{chart}</code></pre></details>;
  return <div ref={container} className="editorial-mermaid-diagram" role="img" aria-label="Mermaid diagram" />;
}
