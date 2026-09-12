import { useEffect, useRef, useState } from "react";
import { Sun, Monitor, Moon } from "lucide-react";
import { useTheme } from "../theme/useTheme";
import type { ThemePreference } from "../theme/types";

const OPTIONS: { value: ThemePreference; label: string; Icon: typeof Sun }[] = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "system", label: "System", Icon: Monitor },
  { value: "dark", label: "Dark", Icon: Moon },
];

export function ThemeToggle() {
  const { preference, setPreference } = useTheme();
  const groupRef = useRef<HTMLDivElement>(null);
  const firstBtnRef = useRef<HTMLButtonElement>(null);
  const btnRefs = useRef<Record<ThemePreference, HTMLButtonElement | null>>({
    light: null,
    system: null,
    dark: null,
  });
  const [slotWidth, setSlotWidth] = useState(0);
  const activeIndex = OPTIONS.findIndex((o) => o.value === preference);

  useEffect(() => {
    const measure = () => {
      if (firstBtnRef.current)
        setSlotWidth(firstBtnRef.current.getBoundingClientRect().width);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next = (index + dir + OPTIONS.length) % OPTIONS.length;
    const nextValue = OPTIONS[next].value;
    setPreference(nextValue);
    btnRefs.current[nextValue]?.focus();
  };

  return (
    <div
      ref={groupRef}
      role="radiogroup"
      aria-label="Theme"
      data-theme-transition
      className="relative inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1"
    >
      {slotWidth > 0 && (
        <span
          aria-hidden="true"
          className={[
            "pointer-events-none absolute inset-y-1 left-1 rounded-full",
            "bg-accent shadow-[0_2px_10px_-2px_rgb(var(--color-accent)/0.65)] ring-1 ring-accent/40",
            "transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            "motion-reduce:transition-none",
          ].join(" ")}
          style={{
            width: slotWidth,
            transform: `translateX(${activeIndex * slotWidth}px)`,
          }}
        />
      )}

      {OPTIONS.map(({ value, label, Icon }, index) => {
        const active = preference === value;
        return (
          <button
            key={value}
            ref={(el) => {
              btnRefs.current[value] = el;
              if (index === 0) firstBtnRef.current = el;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => setPreference(value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            data-theme-transition
            className={[
              "relative z-10 flex w-24 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
              active ? "text-accent-fg" : "text-muted hover:text-fg",
            ].join(" ")}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
