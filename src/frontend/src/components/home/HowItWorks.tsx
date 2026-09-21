import { Section, SectionHeading } from "@/components/layout/Section";
import { CalendarCheck, FileText, Mic } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Step = {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const STEPS: Step[] = [
  {
    step: "01",
    title: "Capture the conversation",
    description:
      "Robi Care listens alongside the clinician during a consultation, turning spoken dialogue into a clean, timestamped transcript without interrupting the visit.",
    icon: Mic,
  },
  {
    step: "02",
    title: "Prepare structured documentation",
    description:
      "The transcript is organised into the clinical note structure your team already uses — history, findings, assessment, and plan — ready for review in seconds.",
    icon: FileText,
  },
  {
    step: "03",
    title: "Coordinate follow-up",
    description:
      "Referrals, recalls, and next appointments are surfaced as clear actions so nothing falls through the gaps between visits.",
    icon: CalendarCheck,
  },
];

/**
 * Three-step strip describing the capture-to-documentation workflow. The
 * numbered markers use the cyan accent as a signal light on the raised navy
 * card surface.
 */
export function HowItWorks() {
  return (
    <Section id="how-it-works" alt>
      <SectionHeading
        eyebrow="How it works"
        title="From consultation to clear documentation in three steps"
        description="Robi Care supports the clinical encounter end to end, while every decision stays with the clinician."
      />
      <ol className="mt-14 grid gap-6 md:grid-cols-3">
        {STEPS.map((item) => {
          const Icon = item.icon;
          return (
            <li
              key={item.step}
              data-ocid={`home.how_it_works.item.${item.step}`}
              className="group relative flex flex-col rounded-xl border-hairline bg-card p-7 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-elevated"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <span className="font-mono text-xs font-bold tracking-[0.2em] text-primary">
                  {item.step}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-bold uppercase tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
