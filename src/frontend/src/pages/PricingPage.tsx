import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/layout/Section";
import {
  type PricingTier,
  PricingTierCard,
} from "@/components/pricing/PricingTierCard";
import { PricingUsageTable } from "@/components/pricing/PricingUsageTable";

const TIERS: PricingTier[] = [
  {
    id: "premium-pro",
    name: "Premium Pro",
    tagline:
      "For a single clinician or a small practice getting documentation under control.",
    transcriptionHours: "4 transcription hours / day",
    lineItems: [
      {
        label: "Speech-to-Text Transcription",
        detail: "7,200 minutes per month",
        price: "$532.80",
      },
      {
        label: "Access to ChatGPT",
        detail: "2,880 units (1,000-token units) per month",
        price: "$57.60",
      },
      {
        label: "Audio Recording",
        detail: "3.6 GB per month",
        price: "$18.90",
      },
    ],
    total: "$609.30",
  },
  {
    id: "premium-business",
    name: "Premium Business",
    tagline:
      "For a multi-clinician practice that documents across a full working day.",
    transcriptionHours: "20 transcription hours / day",
    featured: true,
    lineItems: [
      {
        label: "Speech-to-Text Transcription",
        detail: "36,000 minutes per month",
        price: "$2,664.00",
      },
      {
        label: "Access to ChatGPT",
        detail: "14,400 units (1,000-token units) per month",
        price: "$288.00",
      },
      {
        label: "Audio Recording",
        detail: "18 GB per month",
        price: "$94.50",
      },
    ],
    total: "$3,046.50",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline:
      "For hospital groups and networks running documentation at organisational scale.",
    transcriptionHours: "200 transcription hours / day",
    lineItems: [
      {
        label: "Speech-to-Text Transcription",
        detail: "360,000 minutes per month",
        price: "$26,640.00",
      },
      {
        label: "Access to ChatGPT",
        detail: "144,000 units (1,000-token units) per month",
        price: "$2,880.00",
      },
      {
        label: "Audio Recording",
        detail: "180 GB per month",
        price: "$945.00",
      },
    ],
    total: "$30,465.00",
  },
];

const INCLUDED = [
  {
    title: "The full Robi Care workflow",
    description:
      "Conversation capture, structured documentation, and follow-up coordination are included in every tier.",
  },
  {
    title: "The TMU · TeleMeetUp account you already have",
    description:
      "Robi Care uses the existing TMU · TeleMeetUp account system, so there is no separate onboarding flow to run.",
  },
  {
    title: "Metered, transparent usage",
    description:
      "Each tier is priced from the same three base unit rates, so the monthly total is always traceable to real usage.",
  },
];

/**
 * Pricing page: the three tiers, the base unit rates behind them, and a
 * closing call to action.
 */
export function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Transparent pricing, built from real usage"
        description="Every Robi Care tier is assembled from the same three metered components — transcription, model access, and audio storage — so you can see exactly what you are paying for."
        image={{
          src: "/assets/generated/pricing-clinic-desk.dim_1536x1024.jpg",
          alt: "A light oak clinic desk with an open laptop showing a green-accented clinical dashboard, a stethoscope, a notebook, and a small succulent in soft daylight.",
        }}
        caption="Pricing is metered from the same base unit rates across every tier, with no hidden platform fee."
      />

      <Section id="tiers">
        <SectionHeading
          eyebrow="Plans"
          title="Three tiers, one platform"
          description="Choose the daily transcription allowance that matches your practice. Each tier includes the full Robi Care workflow on the TMU · TeleMeetUp Enablement Platform."
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {TIERS.map((tier, index) => (
            <PricingTierCard key={tier.id} tier={tier} index={index} />
          ))}
        </div>

        <PricingUsageTable />

        <p
          data-ocid="pricing.rates_note"
          className="mt-10 rounded-lg border-hairline bg-muted px-5 py-4 text-sm leading-relaxed text-muted-foreground"
        >
          <span className="font-bold uppercase tracking-[0.12em] text-primary">
            Base unit rates:
          </span>{" "}
          Speech-to-Text Transcription $0.074/minute · Access to ChatGPT $0.02
          per 1,000 tokens · Audio Recording $5.25/GB per month. Monthly totals
          are the sum of the metered components shown for each tier.
        </p>
      </Section>

      <Section id="included" alt>
        <SectionHeading
          eyebrow="Included"
          title="What every tier includes"
          description="The differences between tiers are capacity, not capability. The workflow itself is the same at every level."
        />
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {INCLUDED.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border-hairline bg-card p-7 shadow-subtle transition-smooth hover:shadow-elevated"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Start with the tier that fits your practice"
        description="Create your account on the TMU · TeleMeetUp Enablement Platform and choose a Robi Care tier when you are ready."
      />
    </>
  );
}
