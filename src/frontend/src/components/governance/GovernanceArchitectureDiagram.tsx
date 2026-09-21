import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";

type DiagramNodeProps = {
  label: string;
  /** Emphasised nodes carry the governance controls. */
  emphasis?: boolean;
  className?: string;
};

function DiagramNode({ label, emphasis = false, className }: DiagramNodeProps) {
  return (
    <div
      className={cn(
        "flex min-h-14 w-full items-center justify-center rounded-lg border-hairline px-4 py-3 text-center text-sm font-semibold leading-snug shadow-subtle",
        emphasis
          ? "border-primary/60 bg-primary text-primary-foreground"
          : "bg-card text-foreground",
        className,
      )}
    >
      {label}
    </div>
  );
}

function FlowArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center py-2" aria-hidden="true">
      <span className="h-4 w-px bg-border" />
      <ArrowDown className="size-4 text-primary" />
      {label ? (
        <span className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </span>
      ) : null}
    </div>
  );
}

const BRANCHES = [
  "TMU Clinical Workflow Services",
  "Evidence Ledger and Audit Receipts",
];

/**
 * Governance architecture flow, rendered as accessible HTML/CSS rather than an
 * image. The flow reads top to bottom on small screens and the two parallel
 * branches sit side by side from the `sm` breakpoint up.
 */
export function GovernanceArchitectureDiagram() {
  return (
    <figure
      data-ocid="governance.diagram"
      className="rounded-xl border-hairline bg-card p-6 shadow-subtle md:p-10"
    >
      <figcaption className="mb-8 max-w-2xl">
        <h3 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
          Governance architecture
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          How a request moves from a care team member to a signed clinical
          record, and where identity, policy, evidence and human review sit in
          that path.
        </p>
      </figcaption>

      <ol className="mx-auto flex max-w-3xl list-none flex-col items-stretch">
        <li>
          <DiagramNode label="Clinician/Nurse/EMS/Administrator" />
        </li>
        <li>
          <FlowArrow />
        </li>
        <li>
          <DiagramNode label="Robi Care PWA" />
        </li>
        <li>
          <FlowArrow />
        </li>
        <li>
          <DiagramNode label="Identity, Consent and Role Controls" emphasis />
        </li>
        <li>
          <FlowArrow />
        </li>
        <li>
          <DiagramNode label="SSOT-AI-GOV Policy Gates" emphasis />
        </li>
        <li>
          <FlowArrow label="parallel branches" />
        </li>
        <li>
          <ul className="grid list-none gap-4 sm:grid-cols-2">
            {BRANCHES.map((branch) => (
              <li key={branch}>
                <DiagramNode label={branch} />
              </li>
            ))}
          </ul>
        </li>
        <li>
          <FlowArrow label="converge" />
        </li>
        <li>
          <DiagramNode label="Approved AI Models and Clinical/Administrative Systems" />
        </li>
        <li>
          <FlowArrow />
        </li>
        <li>
          <DiagramNode label="Clinician Review and Sign-off" emphasis />
        </li>
      </ol>
    </figure>
  );
}
