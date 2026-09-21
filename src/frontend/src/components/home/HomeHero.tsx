import { HOME_HERO_COPY, HOME_HERO_CTAS, HOME_HERO_IMAGE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

/**
 * CTA recipes for the hero. The hero sits on the deeper navy scrim, so the
 * primary action is the solid cyan fill with a navy label and the secondary
 * actions are cyan-outlined transparent buttons with cyan labels — the same
 * system used across the rest of the site.
 */
const CTA_STYLES: Record<string, string> = {
  primary: "btn-primary",
  outline: "btn-secondary",
  ghost:
    "inline-flex items-center justify-center gap-2 rounded-full bg-transparent px-6 py-3 font-body text-sm font-bold uppercase tracking-[0.12em] text-primary underline-offset-4 transition-smooth hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
};

/**
 * Full-width photographic Home hero. The photograph fills the band edge to
 * edge; a deeper-navy gradient scrim covers only the left portion on large
 * screens so the consultation stays fully visible, and the copy sits inside
 * that scrim.
 *
 * Containment: the scrim is an absolutely-positioned layer inside the same
 * `relative` wrapper as the text block, so both share one coordinate origin.
 * The scrim reaches `-left-8` to the container's padding edge and extends
 * rightward past the text block's own max width, so the opaque plateau is
 * defined relative to the text itself and can never under-cover it. The
 * gradient's `via` stop is placed just past the text block's right edge, then
 * fades to transparent; the fade tail carries no text.
 */
export function HomeHero() {
  return (
    <section
      className="relative isolate w-full overflow-hidden bg-deep-green"
      data-ocid="home.hero"
    >
      <img
        src={HOME_HERO_IMAGE.src}
        alt={HOME_HERO_IMAGE.alt}
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 size-full object-cover object-[70%_center]"
      />

      <div className="container relative">
        <div className="flex min-h-[34rem] items-center py-28 md:min-h-[38rem] md:py-32 lg:min-h-[42rem]">
          {/*
            Shared coordinate origin for the scrim and the copy. The scrim is
            sized from this wrapper's left edge (pulled out to the container
            padding edge) across the text block plus a fade tail, so the opaque
            plateau always contains every line of copy.
          */}
          <div className="relative w-full max-w-md animate-fade-up lg:max-w-lg">
            {/*
              Decorative scrim. Two stacked layers share this coordinate origin:
              a horizontal gradient supplies the deeper-navy plateau behind the
              copy and its right-edge fade, while a vertical mask feathers the
              same layer's top and bottom edges so the panel dissolves into the
              photo on all four sides instead of ending on a hard straight line.
            */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-y-16 -left-8 -right-8 bg-gradient-to-r from-deep-green from-0% via-deep-green via-[80%] to-transparent to-100% [mask-image:linear-gradient(to_bottom,transparent_0%,black_22%,black_78%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_22%,black_78%,transparent_100%)] md:-right-10 md:via-[84%] lg:-right-12 lg:via-[88%]"
            />

            <div className="relative">
              <p className="eyebrow mb-4">{HOME_HERO_COPY.eyebrow}</p>
              <h1 className="text-4xl font-bold uppercase leading-[1.02] tracking-tight text-foreground md:text-5xl lg:text-[2.75rem]">
                {HOME_HERO_COPY.headline}
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-foreground/85 md:text-lg">
                {HOME_HERO_COPY.supporting}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {HOME_HERO_CTAS.map((cta) => (
                  <Link
                    key={cta.label}
                    to={cta.to}
                    data-ocid={`home.hero.cta.${cta.variant}`}
                    className={cn(
                      "min-h-11 whitespace-normal text-center leading-snug",
                      CTA_STYLES[cta.variant],
                    )}
                  >
                    {cta.label}
                    {cta.variant === "primary" ? (
                      <ArrowRight aria-hidden="true" className="size-4" />
                    ) : null}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
