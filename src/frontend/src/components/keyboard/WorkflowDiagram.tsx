import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Fragment } from "react";

const WORKFLOW_STEPS = [
  "Patient Consent",
  "Clinical Encounter",
  "Secure Transcription",
  "Structured Draft",
  "Clinician Review",
  "Approve or Correct",
  "Authorized Record",
] as const;

type WorkflowDiagramProps = {
  className?: string;
};

/**
 * Horizontal seven-step workflow diagram. Each step is a dark navy pill card
 * with a cyan step marker and light ink text, joined left to right by a thin
 * cyan-tinted arrow. The row wraps onto a second line on narrow viewports.
 */
export function WorkflowDiagram({ className }: WorkflowDiagramProps) {
  return (
    <ol
      data-ocid="keyboard.workflow.list"
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-3 gap-y-4",
        className,
      )}
    >
      {WORKFLOW_STEPS.map((step, index) => (
        <Fragment key={step}>
          <li
            data-ocid={`keyboard.workflow.item.${index + 1}`}
            className="flex min-h-11 items-center justify-center gap-2.5 rounded-xl border-hairline bg-section-alt px-5 py-3 text-center text-sm font-medium leading-snug text-foreground shadow-subtle transition-smooth hover:border-primary/40"
          >
            <span
              aria-hidden="true"
              className="size-1.5 shrink-0 rounded-full bg-primary"
            />
            {step}
          </li>
          {index < WORKFLOW_STEPS.length - 1 ? (
            <li aria-hidden="true" className="flex items-center">
              <ArrowRight className="size-4 shrink-0 text-primary/60" />
            </li>
          ) : null}
        </Fragment>
      ))}
    </ol>
  );
}
