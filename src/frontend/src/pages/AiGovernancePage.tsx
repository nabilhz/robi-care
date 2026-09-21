import { GovernanceArchitectureDiagram } from "@/components/governance/GovernanceArchitectureDiagram";
import { GovernanceFaq } from "@/components/governance/GovernanceFaq";
import { CtaBand } from "@/components/layout/CtaBand";
import { ImagePanel } from "@/components/layout/ImagePanel";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { GET_STARTED_URL } from "@/lib/site";
import { ArrowRight, Eye, FileSearch, Lock, UserCheck } from "lucide-react";

const HERO_IMAGE = {
  src: "/assets/generated/ai-governance-clinician-review.dim_1536x1024.jpg",
  alt: "A clinician's hands reviewing a printed structured clinical note on a light oak desk, with a pen beside it and a tablet showing a document outline at the edge of the frame.",
};

const SUPPORTING_IMAGE = {
  src: "/assets/generated/ai-governance-human-in-the-loop.dim_1536x1024.jpg",
  alt: "A clinician seated at a workstation pointing at a monitor while a colleague in scrubs leans in beside them to review the same screen together in a bright clinic office.",
};

const ADMIN_IMAGE = {
  src: "/assets/generated/ai-governance-admin-dashboard.dim_1536x1024.jpg",
  alt: "A hospital administrator in a blue blazer reviewing a governance dashboard on a desktop monitor at a light oak desk in a bright office.",
};

const GOVERNANCE_PRINCIPLES = [
  "AI actions begin with explicit identity, role and authorization checks",
  "Applicable policies are evaluated before any action proceeds",
  "Restricted actions are denied by default when authorization or information is missing",
  "Higher-risk outputs require human approval",
  "Material actions generate time-stamped evidence and governance receipts",
  "Administrators can suspend workflows, models, integrations or user privileges",
  "Incidents can be reconstructed from protected records",
  "Model confidence never overrides an applicable clinical or organizational rule",
];

const FAIL_SAFE_NOTE =
  "Fail-safe and fail-closed are design objectives subject to testing, validation and contractual scope — not a guarantee that failure or harm is impossible.";

const PRINCIPLES = [
  {
    icon: UserCheck,
    title: "Clinician oversight",
    description:
      "A qualified clinician owns every clinical decision. Robi Care prepares material for that decision; it never makes the decision.",
  },
  {
    icon: FileSearch,
    title: "Review before use",
    description:
      "Generated output is a draft. It is read, corrected, and approved by a clinician before it enters the patient record.",
  },
  {
    icon: Eye,
    title: "Transparency of output",
    description:
      "Clinicians can see what was captured and what was generated, so the basis of every note is visible rather than assumed.",
  },
  {
    icon: Lock,
    title: "Deliberate data handling",
    description:
      "Patient information is handled only for the purpose of preparing the note, under the clinic's own policies and controls.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Who is responsible for the final clinical note?",
    answer:
      "The clinician. Robi Care produces a structured draft from the captured consultation, but the clinician reviews, edits, and approves it before it is used. The clinician remains the decision-maker for every clinical action recorded in the note.",
  },
  {
    question: "Can a note be filed without a clinician seeing it?",
    answer:
      "No. Review-before-use is a fixed part of the workflow. Generated content stays a draft until a clinician approves it, and the approval is what commits the note to the record.",
  },
  {
    question: "How does the clinician know what the system produced?",
    answer:
      "The captured conversation and the generated draft are both visible to the reviewing clinician. Nothing is summarised away without the clinician being able to inspect the source material behind it.",
  },
  {
    question: "What happens to patient data?",
    answer:
      "Patient information is processed only to prepare the note the clinician is working on, and it is handled under the clinic's own data-handling policies. Specific hosting arrangements and certifications are [certification/region to be confirmed].",
  },
  {
    question: "Does Robi Care replace clinical judgement?",
    answer:
      "No. It removes the typing, not the judgement. The system drafts and organises; the clinician interprets, decides, and signs off.",
  },
];

/**
 * AI Governance narrative page: governance principles, human-in-the-loop
 * decision control, transparency, and data handling.
 */
export function AiGovernancePage() {
  return (
    <>
      <PageHero
        eyebrow="AI governance"
        title="Clinical AI that can be constrained, examined and stopped."
        description="Robi Care is built around a single rule: AI prepares, clinicians decide. Every generated note is a draft until a clinician reviews and approves it — and that review is part of the workflow, not an optional step."
        image={HERO_IMAGE}
        caption="Review-before-use is the default. The clinician reads the draft, corrects it, and approves it before anything is filed."
      >
        <Button
          asChild
          size="lg"
          className="rounded-full bg-primary font-bold uppercase tracking-[0.12em] text-primary-foreground hover:bg-primary/90"
        >
          <a href={GET_STARTED_URL} data-ocid="governance.primary_button">
            Get Started
            <ArrowRight aria-hidden="true" />
          </a>
        </Button>
      </PageHero>

      <Section alt>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <p className="eyebrow rule-accent inline-block pb-2">
              HUMAN AUTHORITY BY DESIGN
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              AI may assist. The clinician decides.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Robi Care combines clinical workflow support with policy gates,
              human authorization and traceable evidence through SSOT-AI-GOV.
            </p>
            <div className="mt-8">
              <a
                href="#governance-architecture"
                className="btn-primary"
                data-ocid="governance.opening_button"
              >
                See the governance architecture
                <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-xl border-hairline bg-card p-6 shadow-subtle">
              <h3 className="text-base font-semibold text-foreground">
                Fail-closed
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Restricted actions are denied when authorization, required
                evidence or governance services are unavailable.
              </p>
            </div>
            <div className="rounded-xl border-hairline bg-card p-6 shadow-subtle">
              <h3 className="text-base font-semibold text-foreground">
                Review first
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Draft clinical content remains visibly unapproved until an
                authorized professional signs off.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section alt>
        <SectionHeading
          eyebrow="Governance principles"
          title="Four commitments that shape how the system behaves"
          description="These are workflow commitments, not marketing claims. Each one describes something the product does — or deliberately refuses to do."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {PRINCIPLES.map((principle, index) => (
            <article
              key={principle.title}
              data-ocid={`governance.principle.${index + 1}`}
              className="flex h-full flex-col rounded-xl border-hairline bg-card p-6 shadow-subtle md:p-8"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-muted text-primary">
                <principle.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground md:text-xl">
                {principle.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {principle.description}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Governance principles"
          title="The rules the system is held to"
          description="Eight principles define what the platform checks before it acts, what it refuses to do by default, and what it records afterwards."
        />
        <ul
          data-ocid="governance.principles_list"
          className="mt-10 grid max-w-4xl list-none gap-4"
        >
          {GOVERNANCE_PRINCIPLES.map((principle) => (
            <li
              key={principle}
              className="flex items-start gap-4 rounded-lg border-hairline bg-card p-5 shadow-subtle"
            >
              <span
                aria-hidden="true"
                className="mt-2 size-2 shrink-0 rounded-full bg-primary"
              />
              <span className="text-base leading-relaxed text-foreground">
                {principle}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="governance-architecture" alt>
        <SectionHeading
          eyebrow="Architecture"
          title="How a request is governed end to end"
          description="Every request passes through identity and policy gates before it reaches a workflow service or the evidence ledger, and no output reaches a record without clinician review."
        />
        <div className="mt-10">
          <GovernanceArchitectureDiagram />
        </div>
        <p
          data-ocid="governance.failsafe_note"
          className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground"
        >
          {FAIL_SAFE_NOTE}
        </p>
      </Section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <ImagePanel
            src={ADMIN_IMAGE.src}
            alt={ADMIN_IMAGE.alt}
            caption="Governance is observable in practice: administrators and compliance officers review policy outcomes, evidence and exceptions on an ongoing basis."
          />
          <div>
            <SectionHeading
              eyebrow="Oversight in practice"
              title="Governance that can be inspected, not just asserted"
              description="Controls are only meaningful if someone can see them working. Administrators and compliance officers review how policies were applied, where actions were denied, and what evidence was produced."
            />
            <ul className="mt-10 space-y-6">
              <li className="border-l-2 border-primary/30 pl-5">
                <p className="text-base font-semibold text-foreground">
                  Policy outcomes are visible
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Each decision shows which policy applied and whether the
                  action proceeded, required approval, or was denied.
                </p>
              </li>
              <li className="border-l-2 border-primary/30 pl-5">
                <p className="text-base font-semibold text-foreground">
                  Exceptions are reviewable
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Denials and approval requests are surfaced for review rather
                  than silently dropped.
                </p>
              </li>
              <li className="border-l-2 border-primary/30 pl-5">
                <p className="text-base font-semibold text-foreground">
                  Controls can be suspended
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Administrators can stop workflows, models, integrations or
                  user privileges when oversight requires it.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <ImagePanel
            src={SUPPORTING_IMAGE.src}
            alt={SUPPORTING_IMAGE.alt}
            caption="Human-in-the-loop is a workflow, not a disclaimer: the clinician's review is the step that turns a draft into a record."
          />
          <div>
            <SectionHeading
              eyebrow="Human in the loop"
              title="Decision control stays with the clinician"
              description="Automation is confined to the parts of documentation that do not require judgement. Everything that does require judgement is left where it belongs."
            />
            <ul className="mt-10 space-y-6">
              <li className="border-l-2 border-primary/30 pl-5">
                <p className="text-base font-semibold text-foreground">
                  The system drafts, the clinician decides
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Robi Care organises what was said into a structured note. It
                  does not diagnose, prescribe, or act.
                </p>
              </li>
              <li className="border-l-2 border-primary/30 pl-5">
                <p className="text-base font-semibold text-foreground">
                  Approval is the gate to the record
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Nothing generated reaches the patient record without a
                  clinician's explicit approval.
                </p>
              </li>
              <li className="border-l-2 border-primary/30 pl-5">
                <p className="text-base font-semibold text-foreground">
                  Corrections are first-class
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Editing a draft is a normal part of the workflow, not a
                  failure state. The clinician's version is the note.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section alt>
        <SectionHeading
          eyebrow="Data handling"
          title="Patient information, handled deliberately"
          description="Robi Care processes patient information for one purpose: preparing the note the clinician is working on. It is not repurposed, and it is not used to train models on your patients."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border-hairline bg-card p-6 shadow-subtle">
            <h3 className="text-base font-semibold text-foreground">
              Purpose-limited processing
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Captured conversation is used to prepare the clinician's note and
              for nothing else.
            </p>
          </div>
          <div className="rounded-xl border-hairline bg-card p-6 shadow-subtle">
            <h3 className="text-base font-semibold text-foreground">
              Clinic-controlled policy
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Retention and access follow the clinic's own policies, applied to
              the documentation workflow.
            </p>
          </div>
          <div className="rounded-xl border-hairline bg-card p-6 shadow-subtle">
            <h3 className="text-base font-semibold text-foreground">
              Deployment specifics
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Hosting arrangements and certifications are [certification/region
              to be confirmed] and are agreed with each clinic.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Questions"
          title="Governance questions, answered plainly"
          description="The questions clinicians and governance leads ask most often about how Robi Care behaves."
        />
        <div className="mt-10 max-w-3xl">
          <GovernanceFaq items={FAQ_ITEMS} />
        </div>
      </Section>

      <CtaBand
        title="Review the governance model with us"
        description="Talk to the team about how review-before-use, transparency, and data handling would work in your clinic."
      />
    </>
  );
}
