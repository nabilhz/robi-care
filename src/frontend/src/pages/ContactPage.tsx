import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Mail, MapPin, ShieldCheck } from "lucide-react";

const DETAILS = [
  {
    icon: Mail,
    title: "Email",
    body: "hello@tmu.ai",
    note: "Enquiries submitted here are delivered to the same inbox.",
  },
  {
    icon: MapPin,
    title: "Deployment region",
    body: "[certification/region to be confirmed]",
    note: "Hosting region and certifications are confirmed per deployment.",
  },
  {
    icon: ShieldCheck,
    title: "Governance",
    body: "TMU · TeleMeetUp Enablement Platform",
    note: "Robi Care runs on the platform's existing account and governance layer.",
  },
];

/**
 * Contact page: the enquiry form, direct contact details, and a supporting
 * photograph in a solid caption panel.
 */
export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to the Robi Care team"
        description="Tell us about your documentation workflow and we will show you how Robi Care fits. Every enquiry reaches hello@tmu.ai."
        image={{
          src: "/assets/generated/contact-clinic-reception.dim_1536x1024.jpg",
          alt: "A calm modern clinic reception with a light oak desk, a pale sage-green armchair, and eucalyptus in a white vase beside a bright curtained window.",
        }}
        caption="Enquiries are answered by the Robi Care team, usually within one business day."
      />

      <Section id="enquiry">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Send an enquiry"
              title="How can we help?"
              description="Share a little about your organisation and what you would like to solve. Fields are validated as you go."
            />
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>

          <div className="space-y-6">
            {DETAILS.map((detail) => (
              <div
                key={detail.title}
                className="rounded-xl border-hairline bg-card p-7 shadow-subtle transition-smooth hover:shadow-elevated"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15">
                  <detail.icon
                    aria-hidden="true"
                    className="h-5 w-5 text-primary"
                  />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {detail.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-foreground">
                  {detail.body}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {detail.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
