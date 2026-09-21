import { AudienceSection } from "@/components/home/AudienceSection";
import { HomeHero } from "@/components/home/HomeHero";
import { CtaBand } from "@/components/layout/CtaBand";
import { ImagePanel } from "@/components/layout/ImagePanel";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PricingTierCard } from "@/components/pricing/PricingTierCard";
import { FOOTER_GROUPS, LOGO_IMAGE, NAV_ITEMS, SITE_NAME } from "@/lib/site";
import { renderWithProviders, renderWithRouter } from "@/test/helpers";
import { screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({
    actor: {
      submitContactEnquiry: vi.fn(async () => ({ __kind__: "ok", ok: 1n })),
    },
    isFetching: false,
  }),
}));

vi.mock("@/backend", () => ({
  createActor: vi.fn(() => ({
    submitContactEnquiry: vi.fn(async () => ({ __kind__: "ok", ok: 1n })),
  })),
}));

/**
 * Characterization baseline for the site-wide dark-navy theme change.
 *
 * The request intentionally changes the *values* behind the design tokens
 * (light green/cream -> dark navy #0D1B2A and #0A1628, gold/green -> cyan
 * #22D3EE), the headline typography, the button appearance, the card surface,
 * and the header/footer logo. This file therefore deliberately does NOT pin any
 * color value, any `bg-*`/`text-*` token class, the headline font, the button
 * fill/outline treatment, or the current "R" text badge.
 *
 * It protects the structure the restyle must keep intact:
 *   - the header brand link still points home and both the header and footer
 *     brands still carry the site wordmark with a single decorative mark;
 *   - the footer still exposes both navigation groups and all eight links;
 *   - the header still marks the active route with `aria-current="page"`;
 *   - surfaces are still driven by the shared semantic token classes rather
 *     than hardcoded colors, which is what makes a token-only restyle possible;
 *   - cards are still cards: a bordered surface with a heading and body copy.
 */
describe("brand mark contract (header and footer)", () => {
  it("keeps the header brand link pointing home with the supplied logo image", async () => {
    await renderWithRouter(<SiteHeader />);

    const homeLink = document.querySelector(
      '[data-ocid="nav.home_link"]',
    ) as HTMLAnchorElement;
    expect(homeLink).not.toBeNull();
    expect(homeLink).toHaveAttribute("href", "/");

    // The brand mark is the supplied logo image, rendered directly inside the
    // home link. The link is named for the site via its aria-label.
    const logo = homeLink.querySelector(
      '[data-ocid="nav.logo"]',
    ) as HTMLImageElement;
    expect(logo).not.toBeNull();
    expect(logo.tagName).toBe("IMG");
    expect(logo).toHaveAttribute("src", LOGO_IMAGE.src);
    expect(logo).toHaveAttribute("alt", LOGO_IMAGE.alt);
  });

  it("keeps the footer brand block with the supplied logo image", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
    expect(footer).not.toBeNull();

    // The footer brand carries the same supplied logo image as the header.
    const logo = footer.querySelector(
      '[data-ocid="footer.logo"]',
    ) as HTMLImageElement;
    expect(logo).not.toBeNull();
    expect(logo.tagName).toBe("IMG");
    expect(logo).toHaveAttribute("src", LOGO_IMAGE.src);
    expect(logo).toHaveAttribute("alt", SITE_NAME);
  });
});

describe("footer navigation contract", () => {
  it("keeps both footer groups with their headings", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
    for (const group of FOOTER_GROUPS) {
      const nav = within(footer).getByRole("navigation", {
        name: group.heading,
      });
      expect(nav).not.toBeNull();
      expect(
        within(nav).getByRole("heading", { name: group.heading }),
      ).toBeInTheDocument();
    }
  });

  it("keeps every footer link with its destination", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
    for (const group of FOOTER_GROUPS) {
      const nav = within(footer).getByRole("navigation", {
        name: group.heading,
      });
      for (const item of group.items) {
        expect(
          within(nav).getByRole("link", { name: item.label }),
        ).toHaveAttribute("href", item.to);
      }
    }
  });

  it("keeps the provision line and the account actions", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
    expect(
      within(footer).getByText(
        "A service provision of Ecocarrier Inc., Ontario, Canada.",
      ),
    ).toBeInTheDocument();

    const getStarted = document.querySelector(
      '[data-ocid="footer.get_started_button"]',
    ) as HTMLAnchorElement;
    const signIn = document.querySelector(
      '[data-ocid="footer.sign_in_button"]',
    ) as HTMLAnchorElement;
    expect(getStarted).toHaveAttribute(
      "href",
      "https://app.telemeetup.com/register",
    );
    expect(signIn).toHaveAttribute("href", "https://app.telemeetup.com/login");
  });
});

describe("header navigation contract", () => {
  it("keeps every primary navigation link with its destination", async () => {
    await renderWithRouter(<SiteHeader />);

    const primaryNav = screen.getByRole("navigation", { name: "Primary" });
    for (const item of NAV_ITEMS) {
      expect(
        within(primaryNav).getByRole("link", { name: item.label }),
      ).toHaveAttribute("href", item.to);
    }
  });

  it("marks the active route with aria-current and leaves the others unmarked", async () => {
    await renderWithRouter(<SiteHeader />);

    const primaryNav = screen.getByRole("navigation", { name: "Primary" });
    const pricing = within(primaryNav).getByRole("link", { name: "Pricing" });

    // The test router mounts at "/", which is not one of the five top-nav
    // destinations, so no primary link is active.
    expect(pricing).not.toHaveAttribute("aria-current");
  });

  it("keeps the account actions pointing at the TeleMeetUp account system and the in-app signup", async () => {
    await renderWithRouter(<SiteHeader />);

    const header = document.querySelector("header") as HTMLElement;
    expect(
      within(header).getByRole("link", { name: "Account demo" }),
    ).toHaveAttribute("href", "https://app.telemeetup.com/login");
    // The solid action is now the in-app Sign Up route.
    expect(
      within(header).getByRole("link", { name: "Sign Up" }),
    ).toHaveAttribute("href", "/signup");
  });
});

describe("token-driven surface contract", () => {
  /**
   * The restyle is a token change: the semantic classes below stay in the
   * markup while the CSS variables behind them change value. These assertions
   * protect that mechanism, not any particular color.
   */
  it("keeps the page shell on the shared canvas token", async () => {
    await renderWithRouter(<SiteHeader />);

    const header = document.querySelector("header") as HTMLElement;
    expect(header.className).toContain("nav-surface");
  });

  it("keeps the Section surface toggling between the two shared tokens", () => {
    const { unmount } = renderWithProviders(
      <Section id="plain">
        <p>Plain</p>
      </Section>,
    );
    const plain = document.querySelector("#plain") as HTMLElement;
    expect(plain.className).toContain("bg-canvas");
    expect(plain.className).not.toContain("bg-section-alt");
    unmount();

    renderWithProviders(
      <Section id="alt" alt>
        <p>Alt</p>
      </Section>,
    );
    const alt = document.querySelector("#alt") as HTMLElement;
    expect(alt.className).toContain("bg-section-alt");
    expect(alt.className).not.toContain("bg-canvas");
  });

  it("keeps the SectionHeading eyebrow on the accent rule and the title on the foreground token", () => {
    renderWithProviders(
      <SectionHeading
        eyebrow="An eyebrow"
        title="A section title"
        description="A section description."
      />,
    );

    const eyebrow = screen.getByText("An eyebrow");
    expect(eyebrow.className).toContain("rule-accent");
    // The cyan eyebrow recipe carries the accent color.
    expect(eyebrow.className).toContain("eyebrow");

    const title = screen.getByRole("heading", {
      level: 2,
      name: "A section title",
    });
    expect(title.className).toContain("text-foreground");
  });

  it("keeps the ImagePanel frame on the card and hairline tokens", () => {
    renderWithProviders(
      <ImagePanel src="/photo.jpg" alt="A described photograph." />,
    );

    const figure = document.querySelector("figure") as HTMLElement;
    expect(figure.className).toContain("bg-card");
    expect(figure.className).toContain("border-hairline");
  });

  it("keeps the CtaBand on the deep surface token with the accent eyebrow", () => {
    renderWithProviders(
      <CtaBand title="A closing title" description="A closing description." />,
    );

    const band = screen
      .getByRole("heading", { level: 2, name: "A closing title" })
      .closest("section") as HTMLElement;
    expect(band.className).toContain("bg-deep-green");

    const eyebrow = screen.getByText("Get started");
    // The closing band eyebrow uses the same cyan eyebrow recipe.
    expect(eyebrow.className).toContain("eyebrow");
  });

  it("keeps the Home hero scrim on the deep surface token", async () => {
    await renderWithRouter(<HomeHero />);

    const hero = document.querySelector(
      '[data-ocid="home.hero"]',
    ) as HTMLElement;
    expect(hero.className).toContain("bg-deep-green");
  });

  it("keeps the footer on the deep surface token", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
    expect(footer.className).toContain("bg-deep-green");
  });

  it("keeps the PageHero copy on the canvas and foreground tokens", () => {
    renderWithProviders(
      <PageHero
        eyebrow="Eyebrow"
        title="A page title"
        description="A supporting description."
        image={{ src: "/photo.jpg", alt: "A described photograph." }}
      />,
    );

    const section = screen
      .getByRole("heading", { level: 1, name: "A page title" })
      .closest("section") as HTMLElement;
    expect(section.className).toContain("bg-canvas");

    const title = screen.getByRole("heading", {
      level: 1,
      name: "A page title",
    });
    expect(title.className).toContain("text-foreground");
  });
});

describe("card surface contract", () => {
  it("keeps the audience cards as bordered surfaces with a heading and body", async () => {
    await renderWithRouter(<AudienceSection />);

    const section = document.querySelector("#audiences") as HTMLElement;
    const cards = section.querySelectorAll(
      '[data-ocid^="home.audiences.item."]',
    );
    expect(cards).toHaveLength(5);

    for (const card of cards) {
      expect(card.className).toContain("bg-card");
      expect(card.className).toContain("border-hairline");
      expect(card.querySelector("h3")).not.toBeNull();
      expect(card.querySelector("p")).not.toBeNull();
    }
  });

  it("keeps the pricing tier cards as bordered surfaces with a heading and total", () => {
    renderWithProviders(
      <PricingTierCard
        index={0}
        tier={{
          id: "premium-pro",
          name: "Premium Pro",
          tagline: "A tagline.",
          transcriptionHours: "4 transcription hours / day",
          lineItems: [
            { label: "A line item", detail: "A detail.", price: "$1.00" },
          ],
          total: "$609.30",
        }}
      />,
    );

    const card = document.querySelector(
      '[data-ocid="pricing.card.1"]',
    ) as HTMLElement;
    expect(card).not.toBeNull();
    expect(card.tagName).toBe("ARTICLE");
    expect(card.className).toContain("bg-card");
    expect(card.className).toContain("border-hairline");
    expect(
      within(card).getByRole("heading", { level: 3, name: "Premium Pro" }),
    ).toBeInTheDocument();
    expect(within(card).getByText("$609.30")).toBeInTheDocument();
  });
});
