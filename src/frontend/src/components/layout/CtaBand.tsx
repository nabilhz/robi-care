import { Button } from "@/components/ui/button";
import { GET_STARTED_URL, SIGN_IN_URL } from "@/lib/site";
import { ArrowRight } from "lucide-react";

type CtaBandProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

/**
 * Closing call-to-action band on the deeper navy surface, with the two
 * account actions reused from the header.
 */
export function CtaBand({
  eyebrow = "Get started",
  title,
  description,
}: CtaBandProps) {
  return (
    <section className="bg-deep-green py-20 text-foreground md:py-28">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/75 md:text-lg">
            {description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-primary font-bold uppercase tracking-[0.12em] text-primary-foreground hover:bg-primary/90"
            >
              <a href={GET_STARTED_URL} data-ocid="cta.primary_button">
                Get Started
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-primary bg-transparent font-bold uppercase tracking-[0.12em] text-primary hover:bg-primary/10 hover:text-primary"
            >
              <a href={SIGN_IN_URL} data-ocid="cta.secondary_button">
                Sign In
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
