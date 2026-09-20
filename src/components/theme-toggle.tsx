import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

export function ThemeToggle({
  lightLabel,
  darkLabel,
}: {
  lightLabel: string;
  darkLabel: string;
}) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? lightLabel : darkLabel}
      title={isDark ? lightLabel : darkLabel}
      className={cn(
        "relative -mr-1 flex size-10 items-center justify-end text-subtle",
        "transition-colors duration-200 hover:text-accent",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-5"
        fill="none"
        aria-hidden="true"
      >
        <g
          className={cn(
            "origin-center transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            isDark ? "scale-50 opacity-0" : "scale-100 opacity-100",
          )}
          style={{ transformOrigin: "12px 12px" }}
        >
          {Array.from({ length: 8 }, (_, i) => (
            <line
              key={i}
              x1="12"
              y1="2.6"
              x2="12"
              y2="5.1"
              transform={`rotate(${i * 45} 12 12)`}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          ))}
        </g>
        <circle
          cx="12"
          cy="12"
          r={isDark ? 5.4 : 4}
          className="fill-current"
        />
        <circle
          cx="15.6"
          cy="9.2"
          r="4.4"
          className={cn(
            "fill-canvas transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            isDark ? "opacity-100" : "opacity-0",
          )}
        />
      </svg>
    </button>
  );
}
