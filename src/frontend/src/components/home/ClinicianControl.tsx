import { ImagePanel } from "@/components/layout/ImagePanel";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Check } from "lucide-react";

const GUARANTEES = [
  "Every generated note is a draft until a clinician reviews and approves it.",
  "Nothing is written to the patient record without an explicit human action.",
  "Suggested content is always traceable back to the source conversation.",
  "Clinicians can edit, reject, or rewrite any part of the output.",
];

/**
 * Editorial section stating that the clinician reviews and approves every
 * output before it is used. The review guarantees carry cyan check markers on
 * the dark navy canvas.
 */
export function ClinicianControl() {
  return (
    <Section id="clinician-control">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Clinician in control"
            title="The clinician reviews and approves every output"
            description="Robi Care is an assistant, not an author. It prepares the work, and the clinician decides what becomes part of the record."
          />
          <ul className="mt-8 space-y-4">
            {GUARANTEES.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check aria-hidden="true" className="size-3" />
                </span>
                <span className="text-sm leading-relaxed text-foreground/85">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <ImagePanel
          src="/assets/generated/clinician-review-notes.dim_1536x1024.jpg"
          alt="A clinician reviewing a structured patient note on a laptop screen in a calm, well-lit consulting room."
          caption="Draft notes are presented for review — the clinician approves, edits, or discards each one before it is used."
        />
      </div>
    </Section>
  );
}
