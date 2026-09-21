import { ImagePanel } from "@/components/layout/ImagePanel";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: { src: string; alt: string };
  caption?: string;
  /** Optional supporting content rendered under the copy column. */
  children?: ReactNode;
  className?: string;
};

/**
 * Editorial page opener: a two-column band on the deep navy canvas with the
 * page photograph in a hairline-framed panel beside the copy.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  caption,
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn("bg-canvas pb-16 pt-32 md:pb-24 md:pt-40", className)}
    >
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div className="animate-fade-up">
            <p className="eyebrow rule-accent inline-block pb-2">{eyebrow}</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {description}
            </p>
            {children ? <div className="mt-8">{children}</div> : null}
          </div>
          <div className="animate-fade-up">
            <ImagePanel
              src={image.src}
              alt={image.alt}
              caption={caption}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
