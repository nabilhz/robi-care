import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/layout/Section";
import { useTranslation } from "@/i18n/useTranslation";
import {
  AlertTriangle,
  ClipboardCheck,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

const HERO_IMAGE = {
  src: "/assets/generated/hero-clinical-room.dim_1536x1024.jpg",
  alt: "A clinician in a white coat reviewing patient notes on a tablet at a light oak desk in a bright, uncluttered consultation room.",
};

type DisclaimerPoint = {
  id: string;
  title: string;
  description: string;
  icon: typeof ShieldCheck;
};

const DISCLAIMER_POINTS: DisclaimerPoint[] = [
  {
    id: "clinician-decides",
    title: "The clinician decides",
    description:
      "Robi Care prepares information for professional review. It does not diagnose, prescribe, or act, and it does not replace clinical judgment. A qualified clinician reviews and approves all clinical content before it is used.",
    icon: UserCheck,
  },
  {
    id: "review-before-use",
    title: "Review before use",
    description:
      "Every generated note is a draft until a clinician reviews and approves it. Nothing generated reaches the patient record without that explicit human sign-off.",
    icon: ClipboardCheck,
  },
  {
    id: "not-a-medical-device",
    title: "Not a medical device",
    description:
      "Robi Care is a documentation and communication aid. It is not a medical device and is not intended to diagnose, treat, cure, or prevent any disease or condition.",
    icon: ShieldCheck,
  },
  {
    id: "not-an-emergency-service",
    title: "Not an emergency service",
    description:
      "Robi Care is not an emergency service. In an emergency, contact the applicable local emergency service immediately.",
    icon: AlertTriangle,
  },
];

/**
 * Healthcare and Clinical Disclaimer page: the clinical safety boundaries of
 * Robi Care, stated explicitly and available in both languages.
 */
export function HealthcareDisclaimerPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        eyebrow="Healthcare and clinical disclaimer"
        title="Clinical safety boundaries, stated plainly"
        description="Robi Care is an AI-assisted documentation and communication aid for healthcare professionals. It prepares information for professional review; it does not replace clinical judgment, and it is not an emergency service."
        image={HERO_IMAGE}
        caption="The clinician remains responsible for every clinical decision and for verifying, correcting, and approving all clinical documentation before it is used."
      />

      <Section id="clinical-disclaimer">
        <SectionHeading
          eyebrow="Clinical disclaimer"
          title="What Robi Care is, and what it is not"
          description="These statements describe the clinical safety boundaries of the service. They apply to every deployment of Robi Care on the TMU · TeleMeetUp Enablement Platform."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {DISCLAIMER_POINTS.map((point, index) => {
            const Icon = point.icon;
            return (
              <article
                key={point.id}
                data-ocid={`disclaimer.point_card.${index + 1}`}
                className="flex h-full gap-5 rounded-xl border-hairline bg-card p-7 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-elevated"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {t(point.title)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {t(point.description)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section id="clinician-responsibility" alt>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <SectionHeading
            eyebrow="Clinician responsibility"
            title="The clinician remains the decision-maker"
            description="Robi Care assists with documentation and drafting only. It does not diagnose, prescribe, or act. A qualified clinician reviews and approves all clinical content before it is used, and nothing generated reaches the patient record without that sign-off."
          />
          <div className="space-y-6">
            <div className="border-l-2 border-primary/30 pl-5">
              <p className="text-base font-semibold text-foreground">
                {t("AI may assist. The clinician decides.")}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {t(
                  "The service assists with documentation and drafting only. It does not diagnose, prescribe, or act. A qualified clinician reviews and approves all clinical content before it is used, and nothing generated reaches the patient record without that sign-off.",
                )}
              </p>
            </div>
            <div className="border-l-2 border-primary/30 pl-5">
              <p className="text-base font-semibold text-foreground">
                {t("Not an emergency service")}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {t(
                  "Not an emergency service. In an emergency, contact the applicable local emergency service.",
                )}
              </p>
            </div>
          </div>
        </div>
      </Section>

      <CtaBand
        eyebrow="Clinical disclaimer"
        title="Review the clinical safety model with us"
        description="Talk to the team about how review-before-use, clinician control, and data handling would work in your clinic."
      />
    </>
  );
}
