import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

type ComparisonItem = {
  label: string;
  detail: string;
};

type BeforeAfterProps = {
  before: ComparisonItem[];
  after: ComparisonItem[];
  className?: string;
};

/**
 * Side-by-side comparison of the keyboard-bound documentation routine and the
 * speech-driven one. Two hairline cards on the dark navy surface; the "after"
 * card carries the cyan accent treatment.
 */
export function BeforeAfter({ before, after, className }: BeforeAfterProps) {
  return (
    <div className={cn("grid gap-6 lg:grid-cols-2", className)}>
      <ComparisonCard
        tone="before"
        eyebrow="Before"
        title="Keyboard-bound documentation"
        items={before}
      />
      <ComparisonCard
        tone="after"
        eyebrow="After"
        title="Speech-driven documentation"
        items={after}
      />
    </div>
  );
}

function ComparisonCard({
  tone,
  eyebrow,
  title,
  items,
}: {
  tone: "before" | "after";
  eyebrow: string;
  title: string;
  items: ComparisonItem[];
}) {
  const isAfter = tone === "after";
  const Icon = isAfter ? Check : X;

  return (
    <article
      data-ocid={`keyboard.comparison.${tone}`}
      className={cn(
        "flex h-full flex-col rounded-xl border-hairline bg-card p-6 shadow-subtle transition-smooth md:p-8",
        isAfter && "border-primary/40 shadow-elevated",
      )}
    >
      <p
        className={cn(
          "text-xs font-bold uppercase tracking-[0.18em]",
          isAfter ? "text-primary" : "text-muted-foreground",
        )}
      >
        {eyebrow}
      </p>
      <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
        {title}
      </h3>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={item.label} className="flex gap-3">
            <span
              className={cn(
                "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                isAfter
                  ? "bg-primary/15 text-primary"
                  : "bg-destructive/10 text-destructive",
              )}
            >
              <Icon className="size-3" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-foreground">
                {item.label}
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                {item.detail}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
