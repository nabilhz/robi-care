import { Button } from "@/components/ui/button";
import {
  FOOTER_COPYRIGHT,
  FOOTER_EMERGENCY_NOTICE,
  FOOTER_GROUPS,
  FOOTER_PROVISION,
  FOOTER_TAGLINE,
  GET_STARTED_URL,
  LOGO_IMAGE,
  SIGN_IN_URL,
} from "@/lib/site";
import { Link } from "@tanstack/react-router";

/** Turn a human label into a stable, marker-safe ocid segment. */
function toOcid(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

const linkClass =
  "rounded text-sm text-foreground/75 transition-smooth hover:text-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";

export function SiteFooter() {
  return (
    <footer className="bg-deep-green text-foreground" data-ocid="footer">
      <div className="container py-16 md:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — brand */}
          <div>
            <img
              src={LOGO_IMAGE.src}
              alt={LOGO_IMAGE.alt}
              width={LOGO_IMAGE.width}
              height={LOGO_IMAGE.height}
              className="h-9 w-auto max-w-full object-contain md:h-10"
              data-ocid="footer.logo"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground/70">
              {FOOTER_TAGLINE}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-foreground/60">
              {FOOTER_PROVISION}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                asChild
                className="rounded-full bg-primary font-bold uppercase tracking-[0.12em] text-primary-foreground hover:bg-primary/90"
              >
                <a href={GET_STARTED_URL} data-ocid="footer.get_started_button">
                  Get Started
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-primary bg-transparent font-bold uppercase tracking-[0.12em] text-primary hover:bg-primary/10 hover:text-primary"
              >
                <a href={SIGN_IN_URL} data-ocid="footer.sign_in_button">
                  Sign In
                </a>
              </Button>
            </div>
          </div>

          {/* Columns 2–4 — Explore, Deploy, Contact & policies */}
          {FOOTER_GROUPS.map((group) => (
            <nav
              key={group.heading}
              aria-label={group.heading}
              data-ocid={`footer.group.${toOcid(group.heading)}`}
            >
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {group.heading}
              </h2>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li key={item.label}>
                    {item.to ? (
                      <Link
                        to={item.to}
                        data-ocid={`footer.link.${toOcid(item.label)}`}
                        className={linkClass}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        data-ocid={`footer.link.${toOcid(item.label)}`}
                        className={linkClass}
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 text-sm text-foreground/70 md:flex-row md:items-center md:justify-between">
          <p data-ocid="footer.copyright">{FOOTER_COPYRIGHT}</p>
          <p
            data-ocid="footer.emergency_notice"
            className="md:max-w-xl md:text-right"
          >
            {FOOTER_EMERGENCY_NOTICE}
          </p>
        </div>
      </div>
    </footer>
  );
}
