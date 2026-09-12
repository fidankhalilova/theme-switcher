import type { ReactNode } from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      data-theme-transition
      className="rounded-xl border border-border bg-surface p-5 shadow-sm"
    >
      <h3 className="mb-2 text-base font-semibold text-fg">{title}</h3>
      <div className="text-sm text-muted">{children}</div>
    </div>
  );
}
