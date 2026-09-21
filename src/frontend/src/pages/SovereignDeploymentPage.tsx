import { CtaBand } from "@/components/layout/CtaBand";
import { ImagePanel } from "@/components/layout/ImagePanel";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { GET_STARTED_URL } from "@/lib/site";
import {
  ArrowRight,
  Database,
  FileCheck2,
  KeyRound,
  MapPin,
  ShieldCheck,
  Workflow,
} from "lucide-react";

const ACCESS_PILLARS = [
  {
    id: "in-country-operations",
    title: "In-country operations",
    description:
      "Deployment patterns aligned to local institutions, regulation and support.",
    icon: MapPin,
  },
  {
    id: "data-sovereignty",
    title: "Data sovereignty",
    description:
      "Configurable residency, retention and access controls for each jurisdiction.",
    icon: ShieldCheck,
  },
  {
    id: "democratized-access",
    title: "Democratized access",
    description:
      "Transparent usage-based economics for individual professionals through national programs.",
    icon: KeyRound,
  },
];

const WORKFLOW_STEPS = [
  {
    id: "capture",
    step: "01",
    title: "Capture inside the care setting",
    description:
      "The consultation is captured where care already happens — in the room or over a remote session — with no data leaving the clinical environment before it is processed.",
  },
  {
    id: "process",
    step: "02",
    title: "Process in the deployment you control",
    description:
      "Transcription and structuring run in the deployment your organisation governs, so the processing boundary is the one your clinical governance team has approved.",
  },
  {
    id: "review",
    step: "03",
    title: "Review before anything is committed",
    description:
      "Drafts are presented to the clinician for review. Nothing is written into the record until a person has read it and accepted it.",
  },
  {
    id: "retain",
    step: "04",
    title: "Retain under your own policy",
    description:
      "Retention, export, and deletion follow the policy your organisation already applies to clinical records, rather than a vendor default.",
  },
];

const SOVEREIGNTY_PILLARS = [
  {
    id: "boundary",
    title: "A defined processing boundary",
    description:
      "Clinical content is processed within the deployment your organisation governs. The boundary is documented so it can be reviewed, not assumed.",
    icon: ShieldCheck,
  },
  {
    id: "custody",
    title: "Data custody stays with the provider",
    description:
      "The care provider remains the custodian of the record. Robi Care operates on the data to produce a draft and does not claim ownership of it.",
    icon: Database,
  },
  {
    id: "access",
    title: "Access tied to existing accounts",
    description:
      "Access uses the TMU · TeleMeetUp account system your organisation already administers, so joiners and leavers are handled by one process.",
    icon: KeyRound,
  },
  {
    id: "audit",
    title: "Reviewable by design",
    description:
      "Every draft carries its source consultation and the review decision, so an auditor can trace how a note came to exist.",
    icon: FileCheck2,
  },
];

const DEPLOYMENT_FACTS = [
  {
    id: "hosting",
    label: "Hosting region",
    value: "[certification/region to be confirmed]",
  },
  {
    id: "certification",
    label: "Certification",
    value: "[certification/region to be confirmed]",
  },
  {
    id: "residency",
    label: "Data residency",
    value: "[certification/region to be confirmed]",
  },
  {
    id: "platform",
    label: "Underlying platform",
    value: "TMU · TeleMeetUp Enablement Platform",
  },
];

/**
 * Sovereign Deployment page: the problem, the workflow, the proof points, and
 * a closing call to action.
 */
export function SovereignDeploymentPage() {
  return (
    <>
      <PageHero
        eyebrow="Sovereign Deployment"
        title="Healthcare enablement operated within the country it serves."
        description="Robi Care is available as a managed service, deployed in-country through the SAAAS Platform for Sovereign AI — economical, readily accessible and built for democratized access. Deployment options include locally selected or approved sovereign hosting, local data-residency configuration, jurisdiction-specific retention and consent policies, approved model routing, local language and clinical-document formats, in-country support, and transparent metering and institutional reporting."
        image={{
          src: "/assets/generated/sovereign-deployment-in-country-hosting.dim_1536x1024.jpg",
          alt: "A group consultation in a bright hospital ward: a physician in a white coat, a nurse in blue scrubs and a seated clinician gather around a patient's bed to review a chart together, with a vital-signs monitor beside the bed.",
        }}
        caption="Deployment is described in workflow terms: where processing happens, who holds custody, and how access is administered."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-primary font-bold uppercase tracking-[0.12em] text-primary-foreground hover:bg-primary/90"
          >
            <a href={GET_STARTED_URL} data-ocid="sovereign.primary_button">
              Get Started
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-primary bg-transparent font-bold uppercase tracking-[0.12em] text-primary hover:bg-primary/10 hover:text-primary"
          >
            <a href="/contact" data-ocid="sovereign.secondary_button">
              Talk to the team
            </a>
          </Button>
        </div>
      </PageHero>

      <Section id="accessible-by-design" alt>
        <SectionHeading
          eyebrow="Accessible by design"
          title="Local service. Sovereign options. Practical economics."
          description="Robi Care is designed for managed, in-country service through SAAAS, supporting local data controls, approved model routing and partnership-led adoption."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {ACCESS_PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <article
                key={pillar.id}
                className="flex flex-col gap-5 rounded-xl border-hairline bg-card p-7 shadow-subtle"
                data-ocid={`sovereign.access_card.${index + 1}`}
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-muted text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section id="the-problem" alt>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <SectionHeading
            eyebrow="The problem"
            title="Documentation tools often move clinical data somewhere you cannot see"
            description="When a documentation service is hosted outside the provider's control, the clinical governance team loses visibility of where patient content is processed, who can reach it, and how long it is kept."
          />
          <div className="space-y-6">
            <div className="rounded-xl border-hairline bg-card p-7 shadow-subtle">
              <h3 className="text-lg font-semibold text-foreground">
                The boundary becomes unclear
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Once content leaves the clinical environment, the provider can
                no longer describe the processing boundary in terms its own
                governance process recognises.
              </p>
            </div>
            <div className="rounded-xl border-hairline bg-card p-7 shadow-subtle">
              <h3 className="text-lg font-semibold text-foreground">
                Custody is quietly transferred
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                A vendor that stores the record in its own tenancy becomes a
                second custodian of clinical data, which complicates retention
                and deletion.
              </p>
            </div>
            <div className="rounded-xl border-hairline bg-card p-7 shadow-subtle">
              <h3 className="text-lg font-semibold text-foreground">
                Review is treated as optional
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Generated text that reaches the record without a clinician
                reading it is a clinical risk, not a time saving.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="how-it-works">
        <SectionHeading
          eyebrow="How it works"
          title="Four steps, each with a clear owner"
          description="Sovereign deployment is a workflow property, not a marketing claim. These are the four stages every consultation passes through."
        />
        <ol className="mt-14 grid gap-6 md:grid-cols-2">
          {WORKFLOW_STEPS.map((item, index) => (
            <li
              key={item.id}
              className="rounded-xl border-hairline bg-card p-7 shadow-subtle"
              data-ocid={`sovereign.workflow_step.${index + 1}`}
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm font-semibold text-primary">
                  {item.step}
                </span>
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
                <Workflow
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="proof-points" alt>
        <SectionHeading
          eyebrow="Proof points"
          title="What sovereignty means in practice"
          description="Four commitments that can be checked against your own governance requirements rather than taken on trust."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {SOVEREIGNTY_PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <article
                key={pillar.id}
                className="flex gap-5 rounded-xl border-hairline bg-card p-7 shadow-subtle"
                data-ocid={`sovereign.pillar_card.${index + 1}`}
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-muted text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 rounded-xl border-hairline bg-card p-7 shadow-subtle md:p-9">
          <div className="flex items-center gap-3">
            <MapPin className="size-5 text-primary" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-foreground">
              Deployment details
            </h3>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Specific hosting regions and certifications are confirmed per
            deployment. Where a claim would normally appear, this page shows a
            placeholder until it is verified with your organisation.
          </p>
          <dl className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {DEPLOYMENT_FACTS.map((fact) => (
              <div
                key={fact.id}
                className="border-t border-hairline pt-4"
                data-ocid={`sovereign.fact.${fact.id}`}
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="mt-2 font-mono text-sm text-foreground">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section id="sovereign-cta">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Next step"
              title="Review the deployment model with your governance team"
              description="Bring your data-protection and clinical-governance leads. We will walk through the processing boundary, custody, access, and retention in the terms your organisation already uses."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-primary font-bold uppercase tracking-[0.12em] text-primary-foreground hover:bg-primary/90"
              >
                <a href="/contact" data-ocid="sovereign.contact_button">
                  Contact us
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-primary bg-transparent font-bold uppercase tracking-[0.12em] text-primary hover:bg-primary/10 hover:text-primary"
              >
                <a href="/pricing" data-ocid="sovereign.pricing_button">
                  View pricing
                </a>
              </Button>
            </div>
          </div>
          <ImagePanel
            src="/assets/generated/sovereign-deployment-next-step.dim_1536x1024.jpg"
            alt="A physician in a white coat sitting at a light oak desk in a bright consultation office, gesturing as she talks with a seated patient across from her."
            caption="Clinical judgement stays with the clinician; the platform handles the documentation burden around it."
          />
        </div>
      </Section>

      <CtaBand
        title="Deploy documentation you can account for"
        description="Start on the TMU · TeleMeetUp Enablement Platform and keep clinical content inside a boundary your organisation governs."
      />
    </>
  );
}
