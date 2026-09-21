import { CtaBand } from "@/components/layout/CtaBand";
import { ImagePanel } from "@/components/layout/ImagePanel";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Building2,
  Globe2,
  HeartHandshake,
  Landmark,
} from "lucide-react";

const HERO_IMAGE = {
  src: "/assets/generated/sponsorship-community-clinic.dim_1536x1024.jpg",
  alt: "A clinic administrator in a navy blazer and a community health partner reviewing a tablet together at a light oak counter in a bright community clinic waiting area.",
};

const SUPPORT_IMAGE = {
  src: "/assets/generated/solutions-hero-clinic-team.dim_1536x1024.jpg",
  alt: "Two clinicians reviewing patient information together at a bright clinic workstation.",
};

const SPONSOR_CATEGORIES = [
  {
    id: "health-systems",
    title: "Health systems",
    description:
      "Hospitals, networks and care groups that want documentation support to reach the clinicians and communities they already serve.",
    icon: Building2,
  },
  {
    id: "ngos",
    title: "NGOs",
    description:
      "Development and community organisations funding access to clinical documentation where public capacity is thinnest.",
    icon: HeartHandshake,
  },
  {
    id: "corporations",
    title: "Healthcare-focused corporations",
    description:
      "Companies whose products and services sit inside the care pathway and who invest in the ecosystem they operate in.",
    icon: Globe2,
  },
  {
    id: "government",
    title: "Government and PPP partners",
    description:
      "Public institutions and public-private partnerships extending governed clinical AI into national and regional programmes.",
    icon: Landmark,
  },
];

type SponsorshipTier = {
  id: string;
  name: string;
  commitment: string;
  price: string;
  supports: string;
  description: string;
  featured?: boolean;
  custom?: boolean;
};

const TIERS: SponsorshipTier[] = [
  {
    id: "community-supporter",
    name: "Community Supporter",
    commitment: "Sponsors 1 Premium subscription",
    price: "~$609/month",
    supports: "Supports one independent physician or clinician",
    description:
      "The entry point for an organisation that wants to put governed documentation support in the hands of a single clinician who could not otherwise afford it.",
  },
  {
    id: "regional-partner",
    name: "Regional Partner",
    commitment: "Sponsors 5 Premium subscriptions",
    price: "~$3,045/month",
    supports: "Supports a clinic or small care team",
    description:
      "Funds a whole small care team, so a clinic can standardise its documentation workflow across the people who share the same patients.",
    featured: true,
  },
  {
    id: "strategic-partner",
    name: "Strategic Partner",
    commitment:
      "Sponsors 10+ Premium subscriptions or a Business-tier deployment",
    price: "~$6,090+/month",
    supports: "Supports a hospital department or regional program",
    description:
      "Scales sponsorship to a department or a regional programme, with the deployment shape agreed around the care setting being supported.",
    custom: true,
  },
];

/**
 * Sponsorship Program page: sponsorship as a strategic investment in community
 * healthcare access, the sponsor categories, and the three sponsorship tiers.
 */
export function SponsorshipPage() {
  return (
    <>
      <PageHero
        eyebrow="Sponsorship program"
        title="Sponsorship is a strategic investment in community healthcare access, not charity."
        description="Robi Care sponsorship puts governed clinical documentation support into the hands of healthcare professionals and institutions who need it — and it is designed to be reported on, reviewed, and renewed like any other investment in the care ecosystem."
        image={HERO_IMAGE}
        caption="Sponsorship is directed at the clinicians and institutions serving communities with the least capacity to absorb documentation overhead."
      >
        <Button
          asChild
          size="lg"
          className="rounded-full bg-primary font-bold uppercase tracking-[0.12em] text-primary-foreground hover:bg-primary/90"
        >
          <a href="/contact" data-ocid="sponsorship.primary_button">
            Become a Sponsor
            <ArrowRight aria-hidden="true" />
          </a>
        </Button>
      </PageHero>

      <Section id="what-sponsorship-funds">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="What sponsorship funds"
              title="Sponsorship subsidizes the subscription, not the standard of care"
              description="Robi Care sponsorship subsidizes subscription costs for healthcare professionals and institutions who need it. The clinician receives the same platform, the same governance model, and the same review-before-use workflow as any paying customer — the sponsor removes the cost barrier, not the capability."
            />
            <ul className="mt-10 space-y-6">
              <li className="border-l-2 border-primary/30 pl-5">
                <p className="text-base font-semibold text-foreground">
                  Underserved communities come first
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Sponsored subscriptions are directed to the clinicians and
                  institutions serving communities with the least capacity to
                  absorb documentation overhead.
                </p>
              </li>
              <li className="border-l-2 border-primary/30 pl-5">
                <p className="text-base font-semibold text-foreground">
                  The subsidy is the subscription
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Sponsorship covers the metered subscription cost. It does not
                  buy influence over clinical decisions, which stay with the
                  treating clinician.
                </p>
              </li>
              <li className="border-l-2 border-primary/30 pl-5">
                <p className="text-base font-semibold text-foreground">
                  Access is governed, not gifted
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Sponsored access is administered through the same account and
                  governance model as every other deployment on the platform.
                </p>
              </li>
            </ul>
          </div>
          <ImagePanel
            src={SUPPORT_IMAGE.src}
            alt={SUPPORT_IMAGE.alt}
            caption="A sponsored subscription is a working clinical tool, not a donation — it is used in the same workflow as every other Robi Care deployment."
          />
        </div>
      </Section>

      <Section id="who-sponsors" alt>
        <SectionHeading
          eyebrow="Who sponsors"
          title="Leading players in the community healthcare ecosystem"
          description="Robi Care sponsors are organisations already invested in community health. They sponsor because access to governed clinical documentation is part of the infrastructure their own work depends on."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {SPONSOR_CATEGORIES.map((category, index) => {
            const Icon = category.icon;
            return (
              <article
                key={category.id}
                data-ocid={`sponsorship.category_card.${index + 1}`}
                className="flex h-full gap-5 rounded-xl border-hairline bg-card p-7 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-elevated"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {category.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section id="tiers">
        <SectionHeading
          eyebrow="Sponsorship levels"
          title="Three levels of sponsorship"
          description="Each level is defined by how many clinicians or institutions it puts on the platform. Sponsorship is priced from Robi Care's published subscription rates, so the commitment is transparent from the start."
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {TIERS.map((tier, index) => (
            <article
              key={tier.id}
              data-ocid={`sponsorship.tier_card.${index + 1}`}
              className={
                tier.featured
                  ? "flex h-full flex-col rounded-xl border border-primary/50 bg-card p-8 shadow-elevated"
                  : "flex h-full flex-col rounded-xl border-hairline bg-card p-8 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-elevated"
              }
            >
              <h3 className="text-xl font-semibold tracking-tight text-foreground">
                {tier.name}
              </h3>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-primary">
                {tier.commitment}
              </p>
              <p className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground">
                {tier.price}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {tier.supports}
              </p>
              <p className="mt-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                {tier.description}
              </p>
              {tier.custom ? (
                <p
                  data-ocid={`sponsorship.tier_custom_note.${index + 1}`}
                  className="mt-6 rounded-lg border-hairline bg-muted px-4 py-3 text-sm font-semibold text-foreground"
                >
                  Custom — contact us.
                </p>
              ) : null}
            </article>
          ))}
        </div>

        <p
          data-ocid="sponsorship.pricing_note"
          className="mt-10 rounded-lg border-hairline bg-muted px-5 py-4 text-sm leading-relaxed text-muted-foreground"
        >
          Sponsorship levels are based on Robi Care's published subscription
          pricing.
        </p>

        <div className="mt-10">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-primary font-bold uppercase tracking-[0.12em] text-primary-foreground hover:bg-primary/90"
          >
            <a href="/contact" data-ocid="sponsorship.tiers_button">
              Become a Sponsor
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </div>
      </Section>

      <CtaBand
        eyebrow="Sponsorship"
        title="Become a Sponsor"
        description="Talk to the team about the level of sponsorship that fits your organisation and the community you want to support."
      />
    </>
  );
}
