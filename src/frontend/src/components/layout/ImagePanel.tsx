import { cn } from "@/lib/utils";

type ImagePanelProps = {
  src: string;
  alt: string;
  /** Solid caption panel rendered beside or below the photograph. */
  caption?: string;
  /** Aspect ratio utility for the photo frame. */
  ratio?: string;
  className?: string;
  priority?: boolean;
};

/**
 * A photograph in a hairline frame with an optional solid caption panel.
 * The image is never overlaid with text or a scrim.
 */
export function ImagePanel({
  src,
  alt,
  caption,
  ratio = "aspect-[3/2]",
  className,
  priority = false,
}: ImagePanelProps) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl border-hairline bg-card shadow-subtle",
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn("w-full object-cover", ratio)}
      />
      {caption ? (
        <figcaption className="border-t border-hairline bg-card px-5 py-4 text-sm leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
