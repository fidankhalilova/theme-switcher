import { useEffect, useRef, useState } from "react";
import { Sun, Monitor, Moon, Check } from "lucide-react";
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
  const btnRefs = useRef<Record<ThemePreference, HTMLButtonElement | null>>({
    light: null,
    system: null,
    dark: null,
  });

  const [overlayRect, setOverlayRect] = useState<{
    left: number;
    width: number;
  } | null>(null);

  useEffect(() => {
    const measure = () => {
      const group = groupRef.current;
      const active = btnRefs.current[preference];
      if (!group || !active) return;
      const groupBox = group.getBoundingClientRect();
      const btnBox = active.getBoundingClientRect();
      setOverlayRect({
        left: btnBox.left - groupBox.left,
        width: btnBox.width,
      });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [preference]);

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
      {overlayRect && (
        <span
          aria-hidden="true"
          className="absolute inset-y-1 rounded-full bg-accent shadow-sm transition-[left,width] duration-200 ease-out motion-reduce:transition-none"
          style={{ left: overlayRect.left, width: overlayRect.width }}
        />
      )}

      {OPTIONS.map(({ value, label, Icon }, index) => {
        const active = preference === value;
        return (
          <button
            key={value}
            ref={(el) => {
              btnRefs.current[value] = el;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => setPreference(value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            data-theme-transition
            className={[
              "relative z-10 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
              active ? "text-accent-fg" : "text-muted hover:text-fg",
            ].join(" ")}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
            {active && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
          </button>
        );
      })}
    </div>
  );
}
