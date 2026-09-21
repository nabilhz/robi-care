import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/layout/Section";
import {
  AudienceDetail,
  type AudienceDetailContent,
} from "@/components/solutions/AudienceDetail";
import {
  type Solution,
  SolutionCard,
} from "@/components/solutions/SolutionCard";
import { GET_STARTED_URL } from "@/lib/site";
import { ArrowRight, CalendarCheck, FileText, Mic } from "lucide-react";

const SOLUTIONS: Solution[] = [
  {
    id: "conversation-capture",
    title: "Conversation capture",
    description:
      "Turn the spoken consultation into an accurate, timestamped transcript without asking the clinician to type or dictate.",
    points: [
      "Runs alongside the visit rather than replacing it",
      "Speaker-aware transcript for clear attribution",
      "Works for in-room and remote consultations",
    ],
    icon: Mic,
    image: {
      src: "/assets/generated/solution-conversation-capture.dim_1536x1024.jpg",
      alt: "A clinician speaking with a patient across a light wooden table in a bright consultation room.",
    },
  },
  {
    id: "structured-documentation",
    title: "Structured documentation",
    description:
      "Organise the transcript into the note structure your team already uses, so documentation is ready for review in seconds.",
    points: [
      "History, findings, assessment, and plan sections",
      "Draft notes that stay editable until approved",
      "Consistent structure across the whole clinical team",
    ],
    icon: FileText,
    image: {
      src: "/assets/generated/solution-structured-documentation.dim_1536x1024.jpg",
      alt: "A laptop on a tidy desk showing a structured clinical note beside a stethoscope and notebook.",
    },
  },
  {
    id: "follow-up-coordination",
    title: "Follow-up coordination",
    description:
      "Surface referrals, recalls, and next appointments as clear actions so nothing slips between visits.",
    points: [
      "Action list generated from the consultation",
      "Referrals and recalls captured in one place",
      "Clear ownership for every follow-up step",
    ],
    icon: CalendarCheck,
    image: {
      src: "/assets/generated/solution-follow-up-coordination.dim_1536x1024.jpg",
      alt: "A clinician reviewing an appointment schedule on a wall-mounted screen in a modern clinic corridor.",
    },
  },
];

const AUDIENCES: AudienceDetailContent[] = [
  {
    id: "physicians",
    name: "Physicians and Medical Personnel",
    challenge:
      "Manual charting eats into the time available for patients, and the note is often written after the consultation has ended.",
    help: "Robi Care captures the consultation with consent and prepares a structured draft note, working alongside existing EMR and EHR systems.",
    review:
      "The physician reviews, corrects and signs every note before it is finalized.",
    image: {
      src: "/assets/generated/audience-nurse-handover.dim_1536x1024.jpg",
      alt: "Healthcare staff in scrubs reviewing notes together during a handover briefing in a bright hospital corridor.",
      caption:
        "Documentation support that keeps clinical teams talking to each other, not to a screen.",
    },
  },
  {
    id: "nursing-allied-health",
    name: "Nursing and Allied Health",
    challenge:
      "Handovers and observations are time-consuming to document consistently across shifts and teams.",
    help: "Robi Care captures structured observations and shift handovers so the record reflects what was actually said and seen.",
    review:
      "The nurse or allied health professional reviews and approves before the record is used.",
  },
  {
    id: "walk-in-family-medicine",
    name: "Walk-In and Family-Medicine Clinics",
    challenge:
      "High patient volume leaves little time for documentation between appointments.",
    help: "Robi Care streamlines intake and consultation notes, speech-enabled in the clinician's spoken language.",
    review:
      "The clinician approves every note before it enters the patient record.",
  },
  {
    id: "emergency-departments",
    name: "Hospital Emergency Departments",
    challenge:
      "Fast-moving, high-acuity cases require rapid, accurate documentation under pressure.",
    help: "Robi Care supports rapid, multilingual documentation and intake during triage and treatment.",
    review:
      "The attending clinician reviews and authorizes records, with accountable escalation paths.",
  },
  {
    id: "ems-providers",
    name: "EMS Providers",
    challenge:
      "Field documentation is difficult to capture accurately in real time while care is being delivered.",
    help: "Robi Care captures field information and prepares structured handover records for receiving hospitals.",
    review:
      "EMS personnel and receiving clinicians review before handover records are finalized.",
    image: {
      src: "/assets/generated/audience-ems-field-handover.dim_1536x1024.jpg",
      alt: "Paramedics in high-visibility jackets handing over a patient report to receiving clinicians outside a hospital emergency bay.",
      caption:
        "Field information captured in the moment, reviewed by both teams before it is finalized.",
    },
  },
  {
    id: "hospital-administrators",
    name: "Hospital Administrators",
    challenge:
      "Limited visibility into documentation workload, cost and governance across departments.",
    help: "Robi Care provides workflow consistency, visibility and cost accountability across the institution, with administrative and clinical governance oversight retained throughout.",
    review:
      "Administrative and clinical governance oversight is retained throughout.",
  },
  {
    id: "government-public-health",
    name: "Government and Public-Health Programs",
    challenge:
      "Extending consistent clinical documentation support across public health systems is resource-intensive.",
    help: "Robi Care is available through Public-Private Partnerships for national or regional programs, deployed in-country via the SAAAS Platform.",
    review: "Clinical governance remains with local healthcare institutions.",
  },
];

/**
 * Solutions page: clinical use cases, workflow fit, audience detail, and a
 * closing call to action.
 */
export function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Clinical use cases, handled with care"
        description="Robi Care supports three parts of the clinical encounter: capturing the conversation, preparing structured documentation, and coordinating what happens next."
        image={{
          src: "/assets/generated/solutions-hero-clinic-team.dim_1536x1024.jpg",
          alt: "Two clinicians reviewing patient information together at a bright clinic workstation.",
        }}
        caption="Each solution is designed to sit inside existing clinical workflows, not replace them."
      />

      <Section id="use-cases">
        <SectionHeading
          eyebrow="Use cases"
          title="Where Robi Care helps most"
          description="Three connected capabilities that reduce documentation load while keeping clinical judgement with the clinician."
        />
        <div className="mt-14 space-y-8">
          {SOLUTIONS.map((solution, index) => (
            <SolutionCard
              key={solution.id}
              solution={solution}
              reversed={index % 2 === 1}
            />
          ))}
        </div>
      </Section>

      <Section id="workflow-fit" alt>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <SectionHeading
            eyebrow="Workflow fit"
            title="It fits the workflow you already have"
            description="Robi Care does not ask your team to change how they practise. It removes the documentation burden around the consultation and leaves clinical judgement exactly where it belongs."
          />
          <div className="space-y-6">
            <div className="rounded-xl border-hairline bg-card p-7 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-elevated">
              <h3 className="text-lg font-bold uppercase tracking-tight text-foreground">
                No new clinical process
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                The consultation stays a conversation. Robi Care works in the
                background and presents its output for review afterwards.
              </p>
            </div>
            <div className="rounded-xl border-hairline bg-card p-7 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-elevated">
              <h3 className="text-lg font-bold uppercase tracking-tight text-foreground">
                Judgement stays clinical
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Suggestions are drafts. The clinician decides what is accurate,
                what is relevant, and what belongs in the record.
              </p>
            </div>
            <div className="rounded-xl border-hairline bg-card p-7 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-elevated">
              <h3 className="text-lg font-bold uppercase tracking-tight text-foreground">
                One platform underneath
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Robi Care runs on the TMU · TeleMeetUp Enablement Platform, so
                governance and integrations are shared rather than duplicated.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="audiences">
        <SectionHeading
          eyebrow="Who it is for"
          title="Built for the teams who document care"
          description="Seven audiences use Robi Care in different settings. In every case the clinician stays in control, and every record is reviewed by a person before it is finalized."
        />
        <div className="mt-14 space-y-8">
          {AUDIENCES.map((audience, index) => {
            const imagePosition = AUDIENCES.slice(0, index).filter(
              (item) => item.image,
            ).length;
            return (
              <AudienceDetail
                key={audience.id}
                audience={audience}
                reversed={audience.image ? imagePosition % 2 === 1 : false}
              />
            );
          })}
        </div>
      </Section>

      <Section id="solutions-cta">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            align="center"
            eyebrow="Next step"
            title="See how Robi Care fits your clinic"
            description="Talk to the team about your documentation workflow, or get started on the platform today."
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={GET_STARTED_URL}
              data-ocid="solutions.primary_button"
              className="btn-primary"
            >
              Get Started
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
            <a
              href="/contact"
              data-ocid="solutions.secondary_button"
              className="btn-secondary"
            >
              Contact us
            </a>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Documentation that supports clinical care"
        description="Bring Robi Care into your clinic and keep the clinician in control of every note."
      />
    </>
  );
}
