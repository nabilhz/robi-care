import { cn } from "@/lib/utils";
import { Building2, Layers, Network } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type PartnerModel = {
  id: string;
  title: string;
  audience: string;
  description: string;
  points: string[];
  icon: LucideIcon;
};

type PartnerModelsProps = {
  models: PartnerModel[];
  className?: string;
};

/**
 * Three-up grid of partnership models. Each card follows the media, title,
 * metadata, action hierarchy on the dark navy card surface with a hairline
 * border, cyan icon tile, and cyan bullet markers.
 */
export function PartnerModels({ models, className }: PartnerModelsProps) {
  return (
    <div
      className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", className)}
      data-ocid="partnerships.models_list"
    >
      {models.map((model, index) => {
        const Icon = model.icon;
        return (
          <article
            key={model.id}
            className="flex h-full flex-col rounded-xl border-hairline bg-card p-7 transition-smooth hover:border-primary/40 hover:shadow-elevated"
            data-ocid={`partnerships.model_card.${index + 1}`}
          >
            <span className="flex size-11 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-primary">
              {model.audience}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-foreground">
              {model.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {model.description}
            </p>
            <ul className="mt-6 space-y-3 border-t border-hairline pt-6">
              {model.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-sm leading-relaxed text-foreground"
                >
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  );
}

export const PARTNER_MODEL_ICONS = {
  clinic: Building2,
  programme: Network,
  integrator: Layers,
} satisfies Record<string, LucideIcon>;
