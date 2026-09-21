import { Button } from "@/components/ui/button";
import { GET_STARTED_URL } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";

export type PricingLineItem = {
  label: string;
  detail: string;
  price: string;
};

export type PricingTier = {
  id: string;
  name: string;
  tagline: string;
  transcriptionHours: string;
  lineItems: PricingLineItem[];
  total: string;
  featured?: boolean;
};

type PricingTierCardProps = {
  tier: PricingTier;
  index: number;
};

/**
 * A single pricing tier on the dark navy card surface: headline allowance, the
 * three metered line items, and the monthly total. The featured tier carries a
 * cyan ring and cyan badge; its action is the solid cyan primary button while
 * the other tiers use the cyan-outlined secondary button.
 */
export function PricingTierCard({ tier, index }: PricingTierCardProps) {
  return (
    <article
      data-ocid={`pricing.card.${index + 1}`}
      className={cn(
        "flex h-full flex-col rounded-xl border-hairline bg-card p-7 shadow-subtle transition-smooth hover:shadow-elevated",
        tier.featured && "ring-2 ring-primary",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground">{tier.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {tier.tagline}
          </p>
        </div>
        {tier.featured ? (
          <span className="shrink-0 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-primary">
            Most popular
          </span>
        ) : null}
      </div>

      <div className="mt-6 rounded-lg border-hairline bg-muted px-5 py-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
          Transcription allowance
        </p>
        <p className="mt-1 font-display text-2xl font-semibold text-foreground">
          {tier.transcriptionHours}
        </p>
      </div>

      <ul className="mt-6 flex-1 space-y-4">
        {tier.lineItems.map((item) => (
          <li
            key={item.label}
            className="flex items-start justify-between gap-4 border-b border-hairline pb-4 last:border-b-0 last:pb-0"
          >
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Check
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-primary"
                />
                {item.label}
              </p>
              <p className="mt-1 pl-6 text-xs leading-relaxed text-muted-foreground">
                {item.detail}
              </p>
            </div>
            <p className="shrink-0 font-mono text-sm font-medium text-foreground">
              {item.price}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-baseline justify-between border-t border-hairline pt-5">
        <span className="text-sm font-medium text-muted-foreground">
          Monthly total
        </span>
        <span className="font-mono text-2xl font-semibold text-foreground">
          {tier.total}
        </span>
      </div>

      <Button
        asChild
        size="lg"
        variant={tier.featured ? "default" : "outline"}
        className={cn(
          "mt-6 w-full rounded-full font-bold uppercase tracking-[0.12em]",
          tier.featured
            ? "bg-primary text-primary-foreground hover:bg-accent/90 hover:shadow-elevated"
            : "border border-primary bg-transparent text-primary hover:bg-primary/10 hover:text-primary",
        )}
      >
        <a
          href={GET_STARTED_URL}
          data-ocid={`pricing.get_started_button.${index + 1}`}
        >
          Get Started
          <ArrowRight aria-hidden="true" />
        </a>
      </Button>
    </article>
  );
}
