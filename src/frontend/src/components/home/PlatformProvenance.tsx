import { Section, SectionHeading } from "@/components/layout/Section";
import { PROVENANCE_LINE } from "@/lib/site";
import { Layers, ShieldCheck, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Pillar = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const PILLARS: Pillar[] = [
  {
    title: "Shared enablement engine",
    description:
      "Robi Care runs on the same TMU Enablement Platform that powers Morshid, so capabilities, integrations, and governance are maintained in one place.",
    icon: Layers,
  },
  {
    title: "Consistent governance",
    description:
      "Access control, audit trails, and data handling follow the platform's established policies rather than a one-off clinical tool.",
    icon: ShieldCheck,
  },
  {
    title: "Built for clinical workflows",
    description:
      "The platform layer handles capture, structuring, and coordination so clinical teams can focus on the patient in front of them.",
    icon: Workflow,
  },
];

/**
 * Provenance section naming the TMU Enablement Platform as the underlying
 * engine, also powering Morshid. Pillars sit on the raised navy card surface
 * with cyan icon accents.
 */
export function PlatformProvenance() {
  return (
    <Section id="platform" alt>
      <SectionHeading
        eyebrow="Platform provenance"
        title="Built on the TMU Enablement Platform"
        description="Robi Care is a clinical application of the TMU · TeleMeetUp Enablement Platform — the same engine behind Morshid."
      />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.title}
              className="rounded-xl border-hairline bg-card p-7 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-elevated"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <h3 className="mt-6 text-lg font-bold uppercase tracking-tight text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </div>
          );
        })}
      </div>
      <p className="mt-10 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
        {PROVENANCE_LINE}
      </p>
    </Section>
  );
}
