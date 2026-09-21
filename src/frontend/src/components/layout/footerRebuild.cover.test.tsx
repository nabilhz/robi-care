import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteLayout } from "@/components/layout/SiteLayout";
import {
  CONTACT_EMAIL,
  FOOTER_COPYRIGHT,
  FOOTER_EMERGENCY_NOTICE,
  FOOTER_GROUPS,
  FOOTER_PROVISION,
  FOOTER_TAGLINE,
  LOGO_IMAGE,
  SITE_NAME,
} from "@/lib/site";
import { renderWithProviders, renderWithRouter } from "@/test/helpers";
import { screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import App from "@/App";

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
 * Cover for the accepted footer rebuild: an exact four-column structure on
 * every page (brand, Explore, Deploy, Contact & policies) plus a two-part
 * bottom bar. The column order, headings, link labels and destinations, brand
 * copy, and bottom-bar copy are all pinned here because the request fixes them
 * exactly.
 */
const EXPECTED_GROUPS: { heading: string; labels: string[] }[] = [
  {
    heading: "Explore",
    labels: [
      "Clinical solutions",
      "Keyboard Liberation",
      "AI governance",
      "Pricing",
      "Sponsorship",
    ],
  },
  {
    heading: "Deploy",
    labels: [
      "Sovereign AI",
      "PPP partnerships",
      "Onboarding",
      "Account demonstration",
    ],
  },
  {
    heading: "Contact & policies",
    labels: [
      "Contact",
      "hello@tmu.ai",
      "Privacy",
      "Terms of Use",
      "Clinical disclaimer",
    ],
  },
];

describe("footer four-column structure", () => {
  it("renders exactly four top-level columns in the accepted order", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
    const grid = footer.querySelector(".grid") as HTMLElement;
    expect(grid).not.toBeNull();

    // The brand block is the first column; the three nav groups follow it.
    const columns = Array.from(grid.children) as HTMLElement[];
    expect(columns).toHaveLength(4);

    const brand = columns[0];
    expect(brand.querySelector('[data-ocid="footer.logo"]')).not.toBeNull();

    const navs = columns.slice(1);
    expect(navs.map((nav) => nav.getAttribute("aria-label"))).toEqual([
      "Explore",
      "Deploy",
      "Contact & policies",
    ]);
  });

  it("renders the three accepted group headings in order", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
    const headings = within(footer)
      .getAllByRole("heading", { level: 2 })
      .map((heading) => heading.textContent?.trim());
    expect(headings).toEqual(["Explore", "Deploy", "Contact & policies"]);
  });

  it("renders each group's links in the accepted order", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
    for (const group of EXPECTED_GROUPS) {
      const nav = within(footer).getByRole("navigation", {
        name: group.heading,
      });
      expect(
        within(nav)
          .getAllByRole("link")
          .map((link) => link.textContent?.trim()),
      ).toEqual(group.labels);
    }
  });

  it("keeps the footer groups data in sync with the rendered columns", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
    expect(FOOTER_GROUPS.map((group) => group.heading)).toEqual(
      EXPECTED_GROUPS.map((group) => group.heading),
    );
    for (const group of FOOTER_GROUPS) {
      const nav = within(footer).getByRole("navigation", {
        name: group.heading,
      });
      for (const item of group.items) {
        const link = within(nav).getByRole("link", { name: item.label });
        expect(link).toHaveAttribute("href", item.to ?? item.href);
      }
    }
  });
});

describe("footer brand column", () => {
  it("shows the logo, the tagline, and the provision line", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
    const logo = footer.querySelector(
      '[data-ocid="footer.logo"]',
    ) as HTMLImageElement;
    expect(logo).not.toBeNull();
    expect(logo.tagName).toBe("IMG");
    expect(logo).toHaveAttribute("src", LOGO_IMAGE.src);
    expect(logo).toHaveAttribute("alt", SITE_NAME);

    expect(within(footer).getByText(FOOTER_TAGLINE)).toBeInTheDocument();
    expect(within(footer).getByText(FOOTER_PROVISION)).toBeInTheDocument();
  });

  it("uses the accepted tagline and provision copy verbatim", () => {
    expect(FOOTER_TAGLINE).toBe(
      "Governed clinical enablement for more human care.",
    );
    expect(FOOTER_PROVISION).toBe(
      "A service provision of Ecocarrier Inc., Ontario, Canada.",
    );
  });
});

describe("footer contact and policy destinations", () => {
  it("points the email link at the accepted mailto address", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
    expect(
      within(footer).getByRole("link", { name: CONTACT_EMAIL }),
    ).toHaveAttribute("href", `mailto:${CONTACT_EMAIL}`);
  });

  it("keeps every in-app footer link pointing at a real route", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
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

    for (const link of within(footer).getAllByRole("link")) {
      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("/")) {
        expect(knownRoutes.has(href)).toBe(true);
      }
    }
  });
});

describe("footer bottom bar", () => {
  it("shows the accepted copyright on the left and emergency notice on the right", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
    const copyright = footer.querySelector(
      '[data-ocid="footer.copyright"]',
    ) as HTMLElement;
    const notice = footer.querySelector(
      '[data-ocid="footer.emergency_notice"]',
    ) as HTMLElement;

    expect(copyright).not.toBeNull();
    expect(notice).not.toBeNull();
    expect(copyright).toHaveTextContent(FOOTER_COPYRIGHT);
    expect(notice).toHaveTextContent(FOOTER_EMERGENCY_NOTICE);

    // The copyright precedes the emergency notice in document order.
    expect(
      copyright.compareDocumentPosition(notice) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("uses the accepted bottom-bar copy verbatim", () => {
    expect(FOOTER_COPYRIGHT).toBe(
      "© 2026 Ecocarrier Inc. All rights reserved.",
    );
    expect(FOOTER_EMERGENCY_NOTICE).toBe(
      "Not an emergency service. In an emergency, contact the applicable local emergency service.",
    );
  });
});

describe("footer is shared across every page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("mounts exactly one four-column footer through SiteLayout", async () => {
    await renderWithRouter(
      <SiteLayout>
        <p>Page body</p>
      </SiteLayout>,
    );

    const footers = document.querySelectorAll("footer");
    expect(footers).toHaveLength(1);
    expect(footers[0]).toHaveAttribute("data-ocid", "footer");

    const grid = footers[0].querySelector(".grid") as HTMLElement;
    expect(grid.children).toHaveLength(4);
  });

  it("renders the four-column footer on the home page", async () => {
    window.history.pushState({}, "", "/");
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

    const footer = document.querySelector("footer") as HTMLElement;
    expect(footer).not.toBeNull();
    expect(
      within(footer).getByRole("navigation", { name: "Explore" }),
    ).toBeInTheDocument();
    expect(
      within(footer).getByRole("navigation", { name: "Deploy" }),
    ).toBeInTheDocument();
    expect(
      within(footer).getByRole("navigation", { name: "Contact & policies" }),
    ).toBeInTheDocument();
    expect(within(footer).getByText(FOOTER_COPYRIGHT)).toBeInTheDocument();
  });

  it("renders the four-column footer on a non-home route", async () => {
    window.history.pushState({}, "", "/pricing");
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

    const footer = document.querySelector("footer") as HTMLElement;
    expect(footer).not.toBeNull();
    expect(
      within(footer).getByRole("navigation", { name: "Explore" }),
    ).toBeInTheDocument();
    expect(
      within(footer).getByRole("navigation", { name: "Contact & policies" }),
    ).toBeInTheDocument();
    expect(
      within(footer).getByText(FOOTER_EMERGENCY_NOTICE),
    ).toBeInTheDocument();
  });
});
