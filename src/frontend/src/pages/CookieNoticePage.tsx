import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/layout/Section";
import { useTranslation } from "@/i18n/useTranslation";
import { BarChart3, type Cookie, Settings2, ShieldCheck } from "lucide-react";

const HERO_IMAGE = {
  src: "/assets/generated/hero-clinical-room.dim_1536x1024.jpg",
  alt: "A clinician in a white coat reviewing patient notes on a tablet at a light oak desk in a bright, uncluttered consultation room.",
};

type CookieCategory = {
  id: string;
  title: string;
  description: string;
  icon: typeof Cookie;
};

const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: "essential",
    title: "Strictly necessary cookies",
    description:
      "These cookies are required for the site to function, including security, session management, and remembering your language preference. They cannot be switched off.",
    icon: ShieldCheck,
  },
  {
    id: "preferences",
    title: "Preference cookies",
    description:
      "These cookies remember choices you make, such as your selected language, so the site behaves consistently on your return visits.",
    icon: Settings2,
  },
  {
    id: "analytics",
    title: "Analytics cookies",
    description:
      "These cookies help us understand how the site is used so we can improve it. They are only set where analytics is enabled for the deployment.",
    icon: BarChart3,
  },
];

/**
 * Cookie Notice page: what cookies the site uses, why, and how visitors can
 * manage them, available in both languages.
 */
export function CookieNoticePage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        eyebrow="Cookie Notice"
        title="How this site uses cookies"
        description="This notice explains what cookies are, which cookies this site uses, and how you can manage them. It applies to the Robi Care website and is available in both languages."
        image={HERO_IMAGE}
        caption="We use cookies to keep the site secure, remember your language preference, and understand how the site is used."
      />

      <Section id="cookie-categories">
        <SectionHeading
          eyebrow="What we use"
          title="The cookies this site uses"
          description="Cookies are small text files stored on your device. We group them by purpose so you can see exactly what each one does."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {COOKIE_CATEGORIES.map((category, index) => {
            const Icon = category.icon;
            return (
              <article
                key={category.id}
                data-ocid={`cookie.category_card.${index + 1}`}
                className="flex h-full flex-col gap-5 rounded-xl border-hairline bg-card p-7 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-elevated"
              >
                <span className="flex size-11 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {t(category.title)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {t(category.description)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section id="managing-cookies" alt>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <SectionHeading
            eyebrow="Managing cookies"
            title="You are in control of your cookies"
            description="You can manage or delete cookies through your browser settings at any time. Blocking strictly necessary cookies may affect how the site works."
          />
          <div className="space-y-6">
            <div className="border-l-2 border-primary/30 pl-5">
              <p className="text-base font-semibold text-foreground">
                {t("Browser settings")}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {t(
                  "Most browsers let you view, manage, and delete cookies. The exact steps depend on your browser and are described in its help pages.",
                )}
              </p>
            </div>
            <div className="border-l-2 border-primary/30 pl-5">
              <p className="text-base font-semibold text-foreground">
                {t("Language preference")}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {t(
                  "Your language choice is stored so the site opens in the language you selected on your return visits. Clearing cookies resets it to English.",
                )}
              </p>
            </div>
            <div className="border-l-2 border-primary/30 pl-5">
              <p className="text-base font-semibold text-foreground">
                {t("Questions about this notice")}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {t(
                  "If you have questions about how this site uses cookies, contact the Robi Care team at hello@tmu.ai.",
                )}
              </p>
            </div>
          </div>
        </div>
      </Section>

      <CtaBand
        eyebrow="Cookie Notice"
        title="Questions about privacy and data handling?"
        description="Talk to the team about how cookies, data handling, and clinical governance work in your deployment."
      />
    </>
  );
}
