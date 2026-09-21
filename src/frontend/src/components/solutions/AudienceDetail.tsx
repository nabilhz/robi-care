import { ImagePanel } from "@/components/layout/ImagePanel";
import { cn } from "@/lib/utils";

export type AudienceDetailContent = {
  id: string;
  name: string;
  challenge: string;
  help: string;
  review: string;
  image?: { src: string; alt: string; caption: string };
};

type AudienceDetailProps = {
  audience: AudienceDetailContent;
  /** Alternate the media side on wide screens for editorial rhythm. */
  reversed?: boolean;
};

/**
 * One audience presented as a media-and-copy section. The photograph sits in
 * its own hairline frame with a solid caption panel; all body copy stays inside
 * the raised navy card beside it and is never overlaid on the image. The
 * human-review block is set on the deeper navy surface so the review step reads
 * as the decisive moment.
 */
export function AudienceDetail({
  audience,
  reversed = false,
}: AudienceDetailProps) {
  return (
    <article
      data-ocid={`solutions.audience.${audience.id}`}
      className={cn(
        "grid items-stretch gap-8 lg:gap-12",
        audience.image
          ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          : "lg:grid-cols-[minmax(0,1fr)]",
      )}
    >
      <div
        className={cn(
          "flex flex-col justify-center rounded-xl border-hairline bg-card p-8 shadow-subtle md:p-10",
          audience.image && reversed && "lg:order-2",
        )}
      >
        <h3 className="text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl">
          {audience.name}
        </h3>

        <div className="mt-6">
          <p className="eyebrow">The challenge</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
            {audience.challenge}
          </p>
        </div>

        <div className="mt-6">
          <p className="eyebrow">How Robi Care helps</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
            {audience.help}
          </p>
        </div>

        <div className="mt-6 rounded-lg border border-primary/30 bg-deep-green p-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Where human review occurs
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/85">
            {audience.review}
          </p>
        </div>
      </div>

      {audience.image ? (
        <ImagePanel
          src={audience.image.src}
          alt={audience.image.alt}
          caption={audience.image.caption}
          ratio="aspect-[4/3] lg:aspect-auto lg:h-full"
          className={cn("lg:min-h-full", reversed && "lg:order-1")}
        />
      ) : null}
    </article>
  );
}
