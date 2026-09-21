import { Button } from "@/components/ui/button";
import {
  ACCOUNT_DEMO_URL,
  HEADER_BANNER_TEXT,
  LOGO_IMAGE,
  NAV_ITEMS,
  SIGN_UP_LABEL,
  SIGN_UP_ROUTE,
  SITE_NAME,
} from "@/lib/site";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  // Close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <header className="fixed inset-x-0 top-0 z-50 nav-surface shadow-header">
      <div
        className="border-b border-hairline bg-deep-green"
        data-ocid="nav.banner"
      >
        <div className="container">
          <p className="py-2 text-center text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-primary">
            {HEADER_BANNER_TEXT}
          </p>
        </div>
      </div>

      <div className="container">
        <div className="flex h-20 items-center justify-between gap-4 md:h-24">
          <Link
            to="/"
            aria-label={`${SITE_NAME} home`}
            className="flex min-w-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            data-ocid="nav.home_link"
          >
            {/* Supplied Robi Care lockup, rendered exactly as provided. The
                intrinsic 444×109 ratio is preserved by `w-auto`; the height
                caps keep it inside the h-20 mobile bar and md:h-24 desktop
                bar without overflowing or clipping. */}
            <img
              src={LOGO_IMAGE.src}
              alt={LOGO_IMAGE.alt}
              width={LOGO_IMAGE.width}
              height={LOGO_IMAGE.height}
              className="h-11 w-auto max-w-full shrink-0 object-contain sm:h-12 md:h-14"
              data-ocid="nav.logo"
            />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 xl:flex"
            data-ocid="nav.primary"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                data-ocid={`nav.link.${item.label.toLowerCase().replace(/\s+/g, "_")}`}
                aria-current={isActive(item.to) ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3 py-2 text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                  isActive(item.to)
                    ? "text-primary"
                    : "text-foreground/75 hover:bg-muted hover:text-foreground",
                )}
              >
                {item.label}
                {isActive(item.to) ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary"
                  />
                ) : null}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 xl:flex">
            <Button
              asChild
              variant="outline"
              className="rounded-full border-primary bg-transparent font-bold uppercase tracking-[0.12em] text-primary hover:bg-primary/10 hover:text-primary"
            >
              <a href={ACCOUNT_DEMO_URL} data-ocid="nav.account_demo_button">
                Account demo
              </a>
            </Button>
            <Button
              asChild
              className="rounded-full bg-primary font-bold uppercase tracking-[0.12em] text-primary-foreground hover:bg-primary/90"
            >
              <Link to={SIGN_UP_ROUTE} data-ocid="nav.sign_up_button">
                {SIGN_UP_LABEL}
              </Link>
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            data-ocid="nav.menu_toggle"
            className="grid size-11 place-items-center rounded-lg border-hairline bg-card text-foreground transition-smooth hover:bg-muted focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 xl:hidden"
          >
            {menuOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          id="mobile-nav"
          data-ocid="nav.mobile_menu"
          className="border-t border-hairline bg-card xl:hidden"
        >
          <div className="container py-4">
            <nav aria-label="Mobile" className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  data-ocid={`nav.mobile_link.${item.label.toLowerCase().replace(/\s+/g, "_")}`}
                  aria-current={isActive(item.to) ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-3 text-base font-medium transition-smooth",
                    isActive(item.to)
                      ? "bg-muted text-primary"
                      : "text-foreground hover:bg-muted",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-2 border-t border-hairline pt-4">
              <Button
                asChild
                variant="outline"
                className="w-full rounded-full border-primary bg-transparent font-bold uppercase tracking-[0.12em] text-primary hover:bg-primary/10 hover:text-primary"
              >
                <a
                  href={ACCOUNT_DEMO_URL}
                  data-ocid="nav.mobile_account_demo_button"
                >
                  Account demo
                </a>
              </Button>
              <Button
                asChild
                className="w-full rounded-full bg-primary font-bold uppercase tracking-[0.12em] text-primary-foreground hover:bg-primary/90"
              >
                <Link
                  to={SIGN_UP_ROUTE}
                  onClick={() => setMenuOpen(false)}
                  data-ocid="nav.mobile_sign_up_button"
                >
                  {SIGN_UP_LABEL}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
