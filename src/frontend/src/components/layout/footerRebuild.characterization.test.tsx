import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { FOOTER_PROVISION, LOGO_IMAGE, SITE_NAME } from "@/lib/site";
import { renderWithRouter } from "@/test/helpers";
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
 * Characterization baseline for the footer rebuild.
 *
 * The request intentionally changes the footer's *structure*: the current
 * three-column grid (brand block + two `FOOTER_GROUPS` nav columns) becomes an
 * exact four-column layout (brand, Explore, Deploy, Contact & policies) plus a
 * two-part bottom bar. This file therefore deliberately does NOT pin the
 * current column count, the current `FOOTER_GROUPS` headings ("Platform",
 * "Organisation"), the current link set, or the current single bottom bar.
 *
 * It protects the behavior the rebuild must keep intact:
 *   - the footer is still the single shared `<footer>` mounted once by
 *     `SiteLayout`, so every page inherits whatever structure it has;
 *   - the brand block still carries the supplied logo image with the site name
 *     as alt text, the tagline copy, and the provenance line;
 *   - the account actions still point at the TeleMeetUp account system;
 *   - the footer still exposes at least one navigation landmark with a heading
 *     and at least one in-app link, and every in-app link still resolves to a
 *     real route rather than a dead target;
 *   - the footer still sits on the shared deep-surface token.
 */
describe("footer shell contract", () => {
  it("is mounted once by SiteLayout so every page shares one footer", async () => {
    await renderWithRouter(
      <SiteLayout>
        <p>Page body</p>
      </SiteLayout>,
    );

    const footers = document.querySelectorAll("footer");
    expect(footers).toHaveLength(1);
    expect(footers[0]).toHaveAttribute("data-ocid", "footer");
  });

  it("keeps the footer on the shared deep surface token", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
    expect(footer).not.toBeNull();
    expect(footer.className).toContain("bg-deep-green");
  });
});

describe("footer brand block contract", () => {
  it("keeps the supplied logo image with the site name as alt text", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
    const logo = footer.querySelector(
      '[data-ocid="footer.logo"]',
    ) as HTMLImageElement;
    expect(logo).not.toBeNull();
    expect(logo.tagName).toBe("IMG");
    expect(logo).toHaveAttribute("src", LOGO_IMAGE.src);
    expect(logo).toHaveAttribute("alt", SITE_NAME);
  });

  it("keeps the provision line verbatim", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
    expect(within(footer).getByText(FOOTER_PROVISION)).toBeInTheDocument();
  });

  it("keeps the account actions pointing at the TeleMeetUp account system", async () => {
    await renderWithRouter(<SiteFooter />);

    const getStarted = document.querySelector(
      '[data-ocid="footer.get_started_button"]',
    ) as HTMLAnchorElement;
    const signIn = document.querySelector(
      '[data-ocid="footer.sign_in_button"]',
    ) as HTMLAnchorElement;
    expect(getStarted).not.toBeNull();
    expect(signIn).not.toBeNull();
    expect(getStarted).toHaveAttribute(
      "href",
      "https://app.telemeetup.com/register",
    );
    expect(signIn).toHaveAttribute("href", "https://app.telemeetup.com/login");
  });
});

describe("footer navigation contract", () => {
  it("keeps at least one labelled navigation landmark with a heading and links", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
    const navs = within(footer).getAllByRole("navigation");
    expect(navs.length).toBeGreaterThanOrEqual(1);

    for (const nav of navs) {
      const label = nav.getAttribute("aria-label");
      expect(label?.trim().length ?? 0).toBeGreaterThan(0);
      expect(
        within(nav).getByRole("heading", { name: label as string }),
      ).toBeInTheDocument();
      expect(within(nav).getAllByRole("link").length).toBeGreaterThanOrEqual(1);
    }
  });

  it("keeps every in-app footer link pointing at a real route", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
    const links = within(footer).getAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(1);

    const knownRoutes = new Set([
      "/",
      "/solutions",
      "/keyboard-liberation",
      "/ai-governance",
      "/sovereign-deployment",
      "/partnerships",
      "/pricing",
      "/contact",
      "/sponsorship",
    ]);

    for (const link of links) {
      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("/")) {
        expect(knownRoutes.has(href)).toBe(true);
      }
    }
  });

  it("keeps the Partnerships and Contact routes reachable from the footer", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
    expect(
      within(footer).getByRole("link", { name: "PPP partnerships" }),
    ).toHaveAttribute("href", "/partnerships");
    expect(
      within(footer).getByRole("link", { name: "Contact" }),
    ).toHaveAttribute("href", "/contact");
  });
});

describe("footer bottom bar contract", () => {
  it("keeps the accepted copyright line", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
    expect(
      within(footer).getByText("© 2026 Ecocarrier Inc. All rights reserved."),
    ).toBeInTheDocument();
  });
});
