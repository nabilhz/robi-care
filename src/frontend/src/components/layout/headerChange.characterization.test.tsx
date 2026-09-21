import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { FOOTER_GROUPS, SITE_NAME } from "@/lib/site";
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
    submitContactEnquiry: vi.fn(async () => ({ __kind__: "ok", ok: 1n })),
  })),
}));

/**
 * Characterization baseline for the header change.
 *
 * The request intentionally changes the header's *content*: the set of
 * `NAV_ITEMS`, the account-action labels and destinations, the logo asset and
 * its light-chip wrapper, and it adds a new top banner bar. This file therefore
 * deliberately does NOT pin any nav label, any account-action label or URL, the
 * logo `src`, the presence/absence of the chip, or the absence of a banner.
 *
 * It protects the behavior the header change must keep intact:
 *   - the header stays a fixed, full-width bar and `SiteLayout` still offsets
 *     the page body by the header height so content is never hidden under it;
 *   - the mobile menu keeps its toggle mechanics: `aria-expanded`/`aria-controls`
 *     wiring, an Escape-to-close handler, and a link click that closes it;
 *   - the active route is still marked with `aria-current="page"` and inactive
 *     routes are left unmarked, whatever the nav item set becomes;
 *   - the footer is untouched: both groups, every link, the brand logo, the
 *     account actions, and the provenance line.
 */
describe("header shell contract", () => {
  it("keeps the header fixed and full-width at the top of the viewport", async () => {
    await renderWithRouter(<SiteHeader />);

    const header = document.querySelector("header") as HTMLElement;
    expect(header).not.toBeNull();
    expect(header.className).toContain("fixed");
    expect(header.className).toContain("inset-x-0");
    expect(header.className).toContain("top-0");
  });

  it("keeps the header on the shared nav-surface token", async () => {
    await renderWithRouter(<SiteHeader />);

    const header = document.querySelector("header") as HTMLElement;
    expect(header.className).toContain("nav-surface");
  });

  it("offsets the page body by the header height so content is not hidden", async () => {
    await renderWithRouter(
      <SiteLayout>
        <p>Page body</p>
      </SiteLayout>,
    );

    const main = document.querySelector("main") as HTMLElement;
    expect(main).not.toBeNull();
    // The offset now clears the banner plus the navigation bar.
    expect(main.className).toContain("pt-[6.25rem]");
    expect(main.className).toContain("md:pt-[7.25rem]");
  });

  it("keeps the brand link pointing home with an accessible name", async () => {
    await renderWithRouter(<SiteHeader />);

    const homeLink = document.querySelector(
      '[data-ocid="nav.home_link"]',
    ) as HTMLAnchorElement;
    expect(homeLink).not.toBeNull();
    expect(homeLink).toHaveAttribute("href", "/");

    // The brand mark is the supplied logo image, so only the accessible
    // contract is pinned: the link is named for the site.
    const logo = homeLink.querySelector(
      '[data-ocid="nav.logo"]',
    ) as HTMLImageElement;
    expect(logo).not.toBeNull();
    expect(logo.tagName).toBe("IMG");
    expect(logo).toHaveAttribute("alt", SITE_NAME);
    expect(homeLink).toHaveAccessibleName(new RegExp(SITE_NAME, "i"));
  });
});

describe("mobile menu mechanics", () => {
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

describe("active route marking", () => {
  it("marks the active route with aria-current and leaves the others unmarked", async () => {
    await renderWithRouter(<SiteHeader />);

    const primaryNav = screen.getByRole("navigation", { name: "Primary" });
    const links = within(primaryNav).getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);

    // The test router mounts at "/", which is not one of the five top-nav
    // destinations, so no primary link is active.
    const active = links.filter(
      (link) => link.getAttribute("aria-current") === "page",
    );
    expect(active).toHaveLength(0);
  });
});

describe("footer remains unchanged", () => {
  it("keeps both footer groups with their headings and every link", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
    expect(footer).not.toBeNull();

    for (const group of FOOTER_GROUPS) {
      const nav = within(footer).getByRole("navigation", {
        name: group.heading,
      });
      expect(
        within(nav).getByRole("heading", { name: group.heading }),
      ).toBeInTheDocument();
      for (const item of group.items) {
        expect(
          within(nav).getByRole("link", { name: item.label }),
        ).toHaveAttribute("href", item.to);
      }
    }
  });

  it("keeps the footer brand logo with the site name as alt text", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
    const logo = footer.querySelector(
      '[data-ocid="footer.logo"]',
    ) as HTMLImageElement;
    expect(logo).not.toBeNull();
    expect(logo.tagName).toBe("IMG");
    expect(logo).toHaveAttribute("alt", SITE_NAME);
  });

  it("keeps the footer account actions and the provision line", async () => {
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
