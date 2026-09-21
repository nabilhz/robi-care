import { Section, SectionHeading } from "@/components/layout/Section";
import { HOME_AUDIENCES, HOME_SAFETY_BANNER } from "@/lib/site";
import type { AudienceIconName } from "@/lib/site";
import {
  Ambulance,
  Building2,
  HeartPulse,
  ShieldCheck,
  Siren,
  Stethoscope,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const AUDIENCE_ICONS: Record<AudienceIconName, LucideIcon> = {
  stethoscope: Stethoscope,
  "heart-pulse": HeartPulse,
  siren: Siren,
  ambulance: Ambulance,
  building: Building2,
};

/**
 * Five-card audience grid shown directly below the Home hero, followed by the
 * clinician-control safety banner. Cards sit on the raised navy card surface
 * with thin hairline borders and cyan icon accents; icons are decorative and
 * never carry text over an image.
 */
export function AudienceSection() {
  return (
    <Section id="audiences">
      <SectionHeading
        eyebrow="Who we support"
        title="Built for the teams who carry the clinical load"
        description="Robi Care adapts to the documentation reality of each care setting, from the consultation room to the field."
      />

      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {HOME_AUDIENCES.map((audience) => {
          const Icon = AUDIENCE_ICONS[audience.icon];
          return (
            <li
              key={audience.id}
              data-ocid={`home.audiences.item.${audience.id}`}
              className="group flex flex-col rounded-xl border-hairline bg-card p-6 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-elevated"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <h3 className="mt-5 text-base font-bold uppercase leading-snug tracking-tight text-foreground">
                {audience.label}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {audience.value}
              </p>
            </li>
          );
        })}
      </ul>

      <div
        data-ocid="home.safety_banner"
        className="mt-10 flex items-start gap-4 rounded-xl border border-primary/40 bg-primary/10 p-6 md:items-center"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <ShieldCheck aria-hidden="true" className="size-5" />
        </span>
        <p className="text-sm font-medium leading-relaxed text-foreground md:text-base">
          {HOME_SAFETY_BANNER}
        </p>
      </div>
    </Section>
  );
}
