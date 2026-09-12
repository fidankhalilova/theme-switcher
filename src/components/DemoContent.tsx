import { Card } from "./Card";

export function DemoContent() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card title="Body text contrast">
        This paragraph uses <code>text-fg</code> on <code>bg-surface</code>,
        checked against WCAG AA (4.5:1) in both themes.
      </Card>
      <Card title="Muted / secondary text">
        Secondary copy uses <code>text-muted</code> — still readable,
        intentionally lower contrast than body text.
      </Card>
      <Card title="Buttons">
        <div className="flex gap-2">
          <button
            data-theme-transition
            className="rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-accent-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            Primary
          </button>
          <button
            data-theme-transition
            className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-fg hover:bg-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            Secondary
          </button>
        </div>
      </Card>
      <Card title="Form input">
        <input
          data-theme-transition
          type="text"
          placeholder="Type something…"
          className="w-full rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-fg placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </Card>
    </div>
  );
}
