import { Children, type ReactNode } from "react";

/** Keeps whitespace-delimited title words intact across WebKit and Chromium. */
export function EditorialWordWrap({ children }: { children: ReactNode }) {
  return <>{Children.toArray(children).flatMap((child, childIndex) => {
    if (typeof child !== "string") return child;
    return child.split(/(\s+)/).filter(Boolean).map((part, partIndex) => {
      if (/^\s+$/.test(part)) return part;
      return <span className="editorial-word" key={`${childIndex}-${partIndex}`}>{part}</span>;
    });
  })}</>;
}
