import { BeforeAfter } from "@/components/keyboard/BeforeAfter";
import { TmuKlServiceSection } from "@/components/keyboard/TmuKlServiceSection";
import { WorkflowDiagram } from "@/components/keyboard/WorkflowDiagram";
import { CtaBand } from "@/components/layout/CtaBand";
import { ImagePanel } from "@/components/layout/ImagePanel";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { GET_STARTED_URL } from "@/lib/site";
import {
  ArrowRight,
  AudioLines,
  FileCheck2,
  Mic,
  ShieldCheck,
} from "lucide-react";

const HERO_IMAGE = {
  src: "/assets/generated/keyboard-liberation-consultation.dim_1536x1024.jpg",
  alt: "A clinician speaking with a patient across a light oak desk in a bright consultation room, with a small microphone resting beside a closed laptop.",
};

const SUPPORTING_IMAGE = {
  src: "/assets/generated/keyboard-liberation-proof-points.dim_1536x1024.jpg",
  alt: "A clinician in a white coat walking mid-stride down a bright hospital corridor, dictating notes into a handheld tablet, with pale green walls and daylight from tall windows behind.",
};

const FACE_TO_FACE_IMAGE = {
  src: "/assets/generated/keyboard-liberation-hero.dim_1536x1024.jpg",
  alt: "A doctor in a white coat sitting face-to-face with an older patient in a bright, plant-filled room, listening attentively with no laptop or keyboard between them.",
};

const BEFORE_ITEMS = [
  {
    label: "Eyes on the screen",
    detail:
      "The clinician types while the patient talks, splitting attention between the person in the room and the form on the display.",
  },
  {
    label: "Notes written after the fact",
    detail:
      "Documentation is reconstructed from memory at the end of the day, when the detail of the conversation has already faded.",
  },
  {
    label: "Repetitive strain",
    detail:
      "Hours of keyboard work accumulate into wrist, neck, and shoulder strain that follows the clinician out of the room.",
  },
  {
    label: "Inconsistent structure",
    detail:
      "Every clinician formats notes differently, so the record is hard to scan and harder to hand over.",
  },
];

const AFTER_ITEMS = [
  {
    label: "Eyes on the patient",
    detail:
      "The consultation stays a conversation. Speech is captured in the background while the clinician remains present.",
  },
  {
    label: "Notes drafted in the moment",
    detail:
      "The conversation is turned into a structured draft while the detail is still fresh, ready for review before the next patient.",
  },
  {
    label: "Voice instead of keystrokes",
    detail:
      "The keyboard stops being the bottleneck. Clinicians work by speaking, the way they already work with patients.",
  },
  {
    label: "One consistent structure",
    detail:
      "Every note follows the same reviewed template, so records are predictable to read and straightforward to hand over.",
  },
];

const STEPS = [
  {
    icon: Mic,
    title: "Capture",
    description:
      "With the patient's knowledge, the consultation is captured as speech. No typing, no screen between clinician and patient.",
  },
  {
    icon: AudioLines,
    title: "Structure",
    description:
      "The captured conversation is organised into a structured clinical note — history, findings, plan — following the clinic's template.",
  },
  {
    icon: FileCheck2,
    title: "Review",
    description:
      "The clinician reads the draft, corrects anything that needs correcting, and approves it. Nothing is filed before that review.",
  },
  {
    icon: ShieldCheck,
    title: "Record",
    description:
      "Only the approved note is committed to the record, with the clinician's decision recorded alongside it.",
  },
];

const PROOF_POINTS = [
  {
    value: "Hands free",
    label: "Documentation without a keyboard",
    detail:
      "The clinician's hands and attention stay with the patient rather than the input device.",
  },
  {
    value: "Review first",
    label: "Every note approved before use",
    detail:
      "Generated output is a draft until a clinician reads and approves it. The clinician remains the decision-maker.",
  },
  {
    value: "One template",
    label: "Consistent structure across the clinic",
    detail:
      "Notes follow the same reviewed layout, which makes handover and audit straightforward.",
  },
];

/**
 * Keyboard Liberation narrative page: the problem, how speech-driven capture
 * works, proof points, and a closing call to action.
 */
export function KeyboardLiberationPage() {
  return (
    <>
      <PageHero
        eyebrow="Keyboard liberation"
        title="Clinicians should work by speaking, not typing"
        description="Robi Care captures the consultation as speech and prepares a structured note from it — so the clinician's attention stays on the patient, and the keyboard stops standing between them."
        image={HERO_IMAGE}
        caption="The consultation stays a conversation. Capture happens in the background while the clinician remains present with the patient."
      >
        <Button
          asChild
          size="lg"
          className="rounded-full bg-primary font-bold uppercase tracking-[0.12em] text-primary-foreground hover:bg-primary/90"
        >
          <a href={GET_STARTED_URL} data-ocid="keyboard.primary_button">
            Get Started
            <ArrowRight aria-hidden="true" />
          </a>
        </Button>
      </PageHero>

      <Section id="keyboard-liberation-intro">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Keyboard liberation"
              title="Let clinicians face patients again."
            />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Clinical documentation is indispensable, but the keyboard should
              not stand between a healthcare professional and the person seeking
              care. Robi Care uses consent-based, AI-assisted, multilingual
              voice documentation to transform authorized clinical conversations
              into reviewable drafts, summaries and structured records — just
              speak to it in your own language. The clinician remains
              responsible for verifying, correcting and approving the resulting
              clinical documentation — this human sign-off is a safety control,
              not an inconvenience.
            </p>
          </div>
          <ImagePanel
            src={FACE_TO_FACE_IMAGE.src}
            alt={FACE_TO_FACE_IMAGE.alt}
            caption="A consultation without a keyboard in the room: the clinician's attention stays with the person seeking care."
            priority
          />
        </div>
      </Section>

      <TmuKlServiceSection />

      <Section alt id="keyboard-liberation-workflow">
        <SectionHeading
          eyebrow="The workflow"
          title="Seven steps from consent to authorized record"
          description="Each step is governed and reviewable. The clinician approves or corrects the draft before anything becomes part of the record."
        />
        <WorkflowDiagram className="mt-12" />
        <p className="mx-auto mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          This approach reflects the broader case made by Dr. Eric Topol for
          AI-assisted, ambient clinical documentation that frees physicians to
          focus on patients rather than data entry. Robi Care applies this
          thinking within a governed, consent-based workflow. This page does not
          imply that Dr. Topol endorses Robi Care.
        </p>
      </Section>

      <Section alt>
        <SectionHeading
          eyebrow="The problem"
          title="Documentation has quietly become the second job"
          description="Clinical time is finite. When a keyboard sits between the clinician and the patient, both the conversation and the record pay for it."
        />
        <BeforeAfter
          className="mt-12"
          before={BEFORE_ITEMS}
          after={AFTER_ITEMS}
        />
      </Section>

      <Section>
        <SectionHeading
          eyebrow="How it works"
          title="From spoken consultation to reviewed note"
          description="Four steps, in the order a clinician already works. Capture and structure are automatic; review and record stay with the clinician."
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              data-ocid={`keyboard.step.${index + 1}`}
              className="flex h-full flex-col rounded-xl border-hairline bg-card p-6 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-elevated"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-primary/15 text-primary">
                <step.icon className="size-5" aria-hidden="true" />
              </span>
              <p className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-primary">
                Step {index + 1}
              </p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section alt>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Proof points"
              title="What changes when the keyboard steps aside"
              description="The gains are practical rather than dramatic: more attention in the room, a note that is already drafted, and a record that reads the same way every time."
            />
            <dl className="mt-10 space-y-6">
              {PROOF_POINTS.map((point) => (
                <div
                  key={point.label}
                  className="border-l-2 border-primary/30 pl-5"
                >
                  <dt className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                    {point.value}
                  </dt>
                  <dd className="mt-1">
                    <span className="block text-base font-semibold text-foreground">
                      {point.label}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                      {point.detail}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <ImagePanel
            src={SUPPORTING_IMAGE.src}
            alt={SUPPORTING_IMAGE.alt}
            caption="Speech-driven capture is a workflow change, not a new way of practising medicine — the clinician still leads the consultation."
          />
        </div>
      </Section>

      <CtaBand
        title="Give your clinicians their attention back"
        description="See how speech-driven capture and review-before-use documentation fit the way your clinic already works."
      />
    </>
  );
}
