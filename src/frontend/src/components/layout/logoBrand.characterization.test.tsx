import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { LOGO_IMAGE, SITE_NAME } from "@/lib/site";
import { renderWithRouter } from "@/test/helpers";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
    submitContactEnquiry: vi.fn(async () => ({ __kind: "ok", ok: 1n })),
  })),
}));

/**
 * Characterization baseline for the Robi Care brand-logo change.
 *
 * The request intentionally changes the *logo artwork and its markup*:
 *   - the header brand mark moves from an inline SVG + text wordmark to a
 *     single `<img>` rendering a new combined logo asset;
 *   - the footer logo image `src` and its intrinsic width/height change to the
 *     new asset.
 *
 * This file therefore deliberately does NOT pin the header logo's tag, its
 * inner SVG/wordmark composition, its color classes, or the footer logo's
 * `src`/dimensions — those are the accepted change.
 *
 * It protects the behavior the logo change must keep intact:
 *   - the header brand link still points home and is named for the site, so the
 *     logo remains the accessible "home" affordance;
 *   - the header shell (fixed, full-width, nav-surface) and the announcement
 *     banner above the navigation are unchanged;
 *   - the mobile menu keeps its toggle wiring, Escape-to-close, and
 *     close-on-link mechanics;
 *   - the footer brand column still renders a real `<img>` logo with the site
 *     name as its alt text, inside the shared footer;
 *   - the `LOGO_IMAGE` constant still exposes the full `{ src, alt, width,
 *     height }` contract that the footer consumes, with a non-empty src and
 *     positive intrinsic dimensions.
 */
describe("header brand link survives the logo change", () => {
  it("keeps the brand link pointing home with an accessible name", async () => {
    await renderWithRouter(<SiteHeader />);

    const homeLink = document.querySelector(
      '[data-ocid="nav.home_link"]',
    ) as HTMLAnchorElement;
    expect(homeLink).not.toBeNull();
    expect(homeLink).toHaveAttribute("href", "/");
    // The mark's composition is intentionally changing, so only the accessible
    // contract is pinned: the link is named for the site.
    expect(homeLink).toHaveAccessibleName(new RegExp(SITE_NAME, "i"));
  });

  it("keeps the brand mark inside the home link", async () => {
    await renderWithRouter(<SiteHeader />);

    const homeLink = document.querySelector(
      '[data-ocid="nav.home_link"]',
    ) as HTMLElement;
    const logo = homeLink.querySelector(
      '[data-ocid="nav.logo"]',
    ) as HTMLElement | null;
    expect(logo).not.toBeNull();
    // The mark is the only brand element in the link, whatever its tag becomes.
    expect(homeLink.contains(logo as Node)).toBe(true);
  });

  it("keeps the header shell fixed, full-width, and on the nav-surface token", async () => {
    await renderWithRouter(<SiteHeader />);

    const header = document.querySelector("header") as HTMLElement;
    expect(header).not.toBeNull();
    expect(header.className).toContain("fixed");
    expect(header.className).toContain("inset-x-0");
    expect(header.className).toContain("top-0");
    expect(header.className).toContain("nav-surface");
  });

  it("keeps the announcement banner above the navigation", async () => {
    await renderWithRouter(<SiteHeader />);

    const banner = document.querySelector(
      '[data-ocid="nav.banner"]',
    ) as HTMLElement;
    expect(banner).not.toBeNull();

    const primaryNav = screen.getByRole("navigation", { name: "Primary" });
    expect(
      banner.compareDocumentPosition(primaryNav) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("offsets the page body by the header height so content is not hidden", async () => {
    await renderWithRouter(
      <SiteLayout>
        <p>Page body</p>
      </SiteLayout>,
    );

    const main = document.querySelector("main") as HTMLElement;
    expect(main).not.toBeNull();
    expect(main.className).toContain("pt-[6.25rem]");
    expect(main.className).toContain("md:pt-[7.25rem]");
  });
});

describe("mobile menu mechanics survive the logo change", () => {
  it("wires the toggle to the panel with aria-expanded and aria-controls", async () => {
    const user = userEvent.setup();
    await renderWithRouter(<SiteHeader />);

    const toggle = screen.getByRole("button", {
      name: /open navigation menu/i,
    });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls", "mobile-nav");

    await user.click(toggle);

    expect(
      screen.getByRole("button", { name: /close navigation menu/i }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(document.querySelector("#mobile-nav")).not.toBeNull();
  });

  it("closes the mobile menu on Escape", async () => {
    const user = userEvent.setup();
    await renderWithRouter(<SiteHeader />);

    await user.click(
      screen.getByRole("button", { name: /open navigation menu/i }),
    );
    expect(
      screen.getByRole("navigation", { name: "Mobile" }),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(
      screen.queryByRole("navigation", { name: "Mobile" }),
    ).not.toBeInTheDocument();
  });

  it("closes the mobile menu when a navigation link is chosen", async () => {
    const user = userEvent.setup();
    await renderWithRouter(<SiteHeader />);

    await user.click(
      screen.getByRole("button", { name: /open navigation menu/i }),
    );
    const mobileNav = screen.getByRole("navigation", { name: "Mobile" });
    const firstLink = within(mobileNav).getAllByRole("link")[0];
    expect(firstLink).toBeDefined();

    await user.click(firstLink as HTMLElement);

    expect(
      screen.queryByRole("navigation", { name: "Mobile" }),
    ).not.toBeInTheDocument();
  });
});

describe("footer brand logo mechanism survives the asset change", () => {
  it("keeps a real logo image with the site name as alt text", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
    const logo = footer.querySelector(
      '[data-ocid="footer.logo"]',
    ) as HTMLImageElement;
    expect(logo).not.toBeNull();
    expect(logo.tagName).toBe("IMG");
    expect(logo).toHaveAttribute("alt", SITE_NAME);
    // The src is intentionally changing, but it must still resolve to a
    // non-empty asset path rather than being dropped.
    expect((logo.getAttribute("src") ?? "").trim().length).toBeGreaterThan(0);
  });

  it("keeps the footer logo inside the shared footer brand column", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
    const grid = footer.querySelector(".grid") as HTMLElement;
    expect(grid).not.toBeNull();
    const brandColumn = grid.children[0] as HTMLElement;
    expect(
      brandColumn.querySelector('[data-ocid="footer.logo"]'),
    ).not.toBeNull();
  });
});

describe("LOGO_IMAGE constant keeps its consumer contract", () => {
  it("exposes a non-empty src, the site name as alt, and positive dimensions", () => {
    expect(typeof LOGO_IMAGE.src).toBe("string");
    expect(LOGO_IMAGE.src.trim().length).toBeGreaterThan(0);
    expect(LOGO_IMAGE.alt).toBe(SITE_NAME);
    expect(LOGO_IMAGE.width).toBeGreaterThan(0);
    expect(LOGO_IMAGE.height).toBeGreaterThan(0);
  });
});
