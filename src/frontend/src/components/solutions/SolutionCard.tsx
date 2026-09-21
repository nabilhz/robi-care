import { ImagePanel } from "@/components/layout/ImagePanel";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export type Solution = {
  id: string;
  title: string;
  description: string;
  points: string[];
  icon: LucideIcon;
  image: { src: string; alt: string };
};

type SolutionCardProps = {
  solution: Solution;
  /** Alternate the media side on wide screens for editorial rhythm. */
  reversed?: boolean;
};

/**
 * A clinical use case presented as a media-and-copy card on the raised navy
 * surface. The photograph sits in its own hairline frame with a caption panel,
 * never behind the text; bullet markers use the cyan accent.
 */
export function SolutionCard({
  solution,
  reversed = false,
}: SolutionCardProps) {
  const Icon = solution.icon;
  return (
    <article
      data-ocid={`solutions.card.${solution.id}`}
      className="overflow-hidden rounded-xl border-hairline bg-card shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-elevated"
    >
      <div
        className={cn(
          "grid gap-0 lg:grid-cols-2",
          reversed && "lg:[&>figure]:order-2",
        )}
      >
        <div className="flex flex-col justify-center p-8 md:p-10">
          <span className="flex size-11 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Icon aria-hidden="true" className="size-5" />
          </span>
          <h3 className="mt-6 text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl">
            {solution.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            {solution.description}
          </p>
          <ul className="mt-6 space-y-2.5">
            {solution.points.map((point) => (
              <li
                key={point}
                className="flex gap-3 text-sm leading-relaxed text-foreground/85"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <ImagePanel
          src={solution.image.src}
          alt={solution.image.alt}
          ratio="aspect-[4/3] lg:aspect-auto lg:h-full"
          className="rounded-none border-0 border-t border-hairline shadow-none lg:border-l lg:border-t-0"
        />
      </div>
    </article>
  );
}
