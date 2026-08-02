"use client";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { MermaidDiagram } from "./mermaid-diagram.js";

export function EditorialMarkdown({ content, className = "" }: { content: string; className?: string }) {
  return <div className={`editorial-content ${className}`.trim()}>
    <ReactMarkdown
      remarkPlugins={[[remarkGfm, { singleTilde: false }], remarkMath]}
      rehypePlugins={[
        [rehypeKatex, { strict: "ignore" }],
        [rehypeHighlight, { detect: false, plainText: ["mermaid"] }],
      ]}
      components={{
        del({ children }) { return <span>{children}</span>; },
        table({ children }) {
          return <div className="editorial-table-scroll" tabIndex={0} aria-label="표를 가로로 스크롤해 전체 내용을 볼 수 있습니다."><table>{children}</table></div>;
        },
        pre({ node, children, ...props }) {
          const code = node?.children[0];
          if (code?.type === "element" && Array.isArray(code.properties?.className) && code.properties.className.includes("language-mermaid")) {
            const source = code.children[0];
            return <MermaidDiagram chart={String(source?.type === "text" ? source.value : "")} />;
          }
          return <pre {...props}>{children}</pre>;
        },
      }}
    >{content}</ReactMarkdown>
  </div>;
}
