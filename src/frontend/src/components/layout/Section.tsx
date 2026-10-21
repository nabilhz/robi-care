import { useTranslation } from "@/i18n/useTranslation";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  /** Raised navy band when true, page canvas when false. */
  alt?: boolean;
  className?: string;
  children: ReactNode;
};

export function Section({
  id,
  alt = false,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-28",
        alt ? "bg-section-alt" : "bg-canvas",
        className,
      )}
    >
      <div className="container">{children}</div>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className="eyebrow rule-accent inline-block pb-2">{t(eyebrow)}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {t(title)}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {t(description)}
        </p>
      ) : null}
    </div>
  );
}
