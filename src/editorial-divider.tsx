export type EditorialDividerProps = {
  orientation?: "horizontal" | "vertical";
  className?: string;
};

export function EditorialDivider({ orientation = "horizontal", className }: EditorialDividerProps) {
  return <span aria-hidden="true" className={["editorial-divider", `editorial-divider--${orientation}`, className].filter(Boolean).join(" ")} />;
}
