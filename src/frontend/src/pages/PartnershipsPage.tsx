import { CtaBand } from "@/components/layout/CtaBand";
import { ImagePanel } from "@/components/layout/ImagePanel";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/layout/Section";
import {
  type PartnerModel,
  PartnerModels,
} from "@/components/partnerships/PartnerModels";
import { Button } from "@/components/ui/button";
import { GET_STARTED_URL } from "@/lib/site";
import {
  ArrowRight,
  Blocks,
  Code2,
  Handshake,
  LifeBuoy,
  Plug,
  Users,
} from "lucide-react";

const PARTNER_MODELS: PartnerModel[] = [
  {
    id: "clinics",
    title: "Clinics and care providers",
    audience: "For clinics",
    description:
      "Adopt Robi Care across a practice or a group of practices, with onboarding that follows your existing clinical governance process.",
    points: [
      "Rollout support for multi-site clinical teams",
      "Configuration aligned to your note structure",
      "Access administered through your existing accounts",
    ],
    icon: Users,
  },
  {
    id: "programmes",
    title: "Health programmes",
    audience: "For programmes",
    description:
      "Embed documentation support into a funded programme or care pathway, with reporting that reflects the outcomes you are accountable for.",
    points: [
      "Deployment scoped to a defined care pathway",
      "Programme-level visibility of documentation activity",
      "Governance review built into the rollout plan",
    ],
    icon: Handshake,
  },
  {
    id: "integrators",
    title: "Platform integrators",
    audience: "For integrators",
    description:
      "Build on the TMU · TeleMeetUp Enablement Platform and bring Robi Care capabilities into the systems your customers already run.",
    points: [
      "Shared identity and access through the platform",
      "Integration support from the platform team",
      "A single governance model across your product",
    ],
    icon: Blocks,
  },
];

const PLATFORM_CAPABILITIES = [
  {
    id: "identity",
    title: "Shared identity and access",
    description:
      "Partners inherit the TMU · TeleMeetUp account system, so there is no second onboarding flow to build or maintain.",
    icon: Plug,
  },
  {
    id: "governance",
    title: "One governance model",
    description:
      "Deployment, retention, and review policies are defined once at the platform level and apply to every capability built on it.",
    icon: Code2,
  },
  {
    id: "support",
    title: "Partner support",
    description:
      "A named contact for technical integration questions, plus documentation for the capabilities you are building against.",
    icon: LifeBuoy,
  },
];

const PPP_PARTICIPANTS = [
  {
    id: "government",
    participant: "Government or Public Institution",
    role: "Policy alignment, program sponsorship, public-system participation",
  },
  {
    id: "local-enterprise",
    participant: "Local Private Enterprise",
    role: "Operations, adoption, support and commercial execution",
  },
  {
    id: "ngo",
    participant: "NGO or Development Partner",
    role: "Community access, program funding, evaluation, capacity building",
  },
  {
    id: "ecocarrier",
    participant: "Ecocarrier Inc.",
    role: "Robi Care, TMU Enablement Platform, SAAAS implementation and technical support",
  },
  {
    id: "healthcare",
    participant: "Healthcare Institutions",
    role: "Clinical governance, professional oversight and workflow integration",
  },
];

const PARTNER_STEPS = [
  {
    id: "scope",
    step: "01",
    title: "Scope the partnership",
    description:
      "We start with the care setting, the workflow, and the governance requirements that apply to it.",
  },
  {
    id: "design",
    step: "02",
    title: "Design the integration",
    description:
      "Together we map how Robi Care fits your systems, your note structure, and your account administration.",
  },
  {
    id: "pilot",
    step: "03",
    title: "Pilot with a real team",
    description:
      "A contained pilot with one clinical team, measured against the documentation burden it removes.",
  },
  {
    id: "scale",
    step: "04",
    title: "Scale across the organisation",
    description:
      "Once the pilot is reviewed, rollout extends across sites, programmes, or customer accounts.",
  },
];

/**
 * Partnerships page: partnership models, how partners build on the platform,
 * and a call to action for partnership enquiries.
 */
export function PartnershipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Partnerships"
        title="A partnership model for sustainable national access."
        description="Robi Care partners with clinics, health programmes, and platform integrators who want documentation support embedded in their own care setting rather than bolted on beside it."
        image={{
          src: "/assets/generated/partnerships-clinic-boardroom.dim_1536x1024.jpg",
          alt: "Four professionals in clinical and business attire collaborating around a light oak table in a bright clinic boardroom.",
        }}
        caption="Partnerships begin with the care setting and the governance requirements that apply to it."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-primary font-bold uppercase tracking-[0.12em] text-primary-foreground hover:bg-primary/90"
          >
            <a href="/contact" data-ocid="partnerships.primary_button">
              Contact for partnership
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-primary bg-transparent font-bold uppercase tracking-[0.12em] text-primary hover:bg-primary/10 hover:text-primary"
          >
            <a href={GET_STARTED_URL} data-ocid="partnerships.secondary_button">
              Get Started
            </a>
          </Button>
        </div>
      </PageHero>

      <Section id="ppp-model">
        <SectionHeading
          eyebrow="Public-Private Partnerships"
          title="How the model is structured"
        />
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Robi Care is deployed through Public-Private Partnerships (PPP) with
          private enterprise, NGOs and local or national government in each
          country. Ecocarrier Inc. provides Robi Care, the TMU Enablement
          Platform and the SAAAS implementation and technical support.
        </p>

        <ImagePanel
          src="/assets/generated/partnerships-ppp-collaboration.dim_1536x1024.jpg"
          alt="Government, healthcare and NGO representatives in a collaborative partnership meeting around a conference table."
          caption="Public-Private Partnerships bring government, private enterprise, NGOs and healthcare institutions together around one national deployment."
          className="mt-12"
        />

        <div className="mt-12 overflow-hidden rounded-xl border-hairline bg-card shadow-subtle">
          <table
            className="w-full table-fixed border-collapse text-left"
            data-ocid="partnerships.ppp_table"
          >
            <caption className="sr-only">
              Participants in the Robi Care Public-Private Partnership model and
              their roles
            </caption>
            <thead className="bg-section-alt">
              <tr>
                <th
                  scope="col"
                  className="w-[38%] px-4 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-foreground sm:px-6"
                >
                  Participant
                </th>
                <th
                  scope="col"
                  className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-foreground sm:px-6"
                >
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {PPP_PARTICIPANTS.map((row, index) => (
                <tr
                  key={row.id}
                  className="border-t border-hairline align-top"
                  data-ocid={`partnerships.ppp_row.${index + 1}`}
                >
                  <th
                    scope="row"
                    className="break-words px-4 py-4 text-sm font-semibold text-foreground sm:px-6"
                  >
                    {row.participant}
                  </th>
                  <td className="break-words px-4 py-4 text-sm leading-relaxed text-muted-foreground sm:px-6">
                    {row.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="partner-models">
        <SectionHeading
          eyebrow="Partnership models"
          title="Three ways to work with us"
          description="Each model has a different starting point, but they share the same platform, the same governance model, and the same review-first approach to clinical documentation."
        />
        <PartnerModels models={PARTNER_MODELS} className="mt-14" />
      </Section>

      <Section id="build-on-the-platform" alt>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <SectionHeading
            eyebrow="Building on the platform"
            title="What partners build on"
            description="The TMU · TeleMeetUp Enablement Platform provides the shared foundations, so partners can focus on the clinical capability rather than rebuilding identity, access, and governance for every customer."
          />
          <div className="space-y-6">
            {PLATFORM_CAPABILITIES.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <article
                  key={capability.id}
                  className="flex gap-5 rounded-xl border-hairline bg-card p-7 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-elevated"
                  data-ocid={`partnerships.capability_card.${index + 1}`}
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {capability.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {capability.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Section>

      <Section id="how-partnerships-start">
        <SectionHeading
          eyebrow="How it starts"
          title="From first conversation to organisation-wide rollout"
          description="A partnership follows four stages, each with a review point before the next begins."
        />
        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PARTNER_STEPS.map((item, index) => (
            <li
              key={item.id}
              className="rounded-xl border-hairline bg-card p-7 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-elevated"
              data-ocid={`partnerships.step_card.${index + 1}`}
            >
              <span className="font-mono text-sm font-semibold text-primary">
                {item.step}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="partnership-enquiries" alt>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <ImagePanel
            src="/assets/generated/solutions-hero-clinic-team.dim_1536x1024.jpg"
            alt="Two clinicians reviewing patient information together at a bright clinic workstation."
            caption="Partnership enquiries are handled by the team that supports the platform day to day."
          />
          <div>
            <SectionHeading
              eyebrow="Partnership enquiries"
              title="Tell us about the care setting you want to support"
              description="Share the setting, the workflow, and the governance requirements that apply. We will come back with a partnership model and a realistic rollout plan."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-primary font-bold uppercase tracking-[0.12em] text-primary-foreground hover:bg-primary/90"
              >
                <a href="/contact" data-ocid="partnerships.contact_button">
                  Contact for partnership
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-primary bg-transparent font-bold uppercase tracking-[0.12em] text-primary hover:bg-primary/10 hover:text-primary"
              >
                <a
                  href="/sovereign-deployment"
                  data-ocid="partnerships.deployment_button"
                >
                  Deployment model
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Partner with the TMU · TeleMeetUp Enablement Platform"
        description="Bring documentation support into your clinic, programme, or product with a governance model you can review."
      />
    </>
  );
}
