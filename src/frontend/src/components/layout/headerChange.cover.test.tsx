import { SiteHeader } from "@/components/layout/SiteHeader";
import {
  ACCOUNT_DEMO_URL,
  HEADER_BANNER_TEXT,
  LOGO_IMAGE,
  NAV_ITEMS,
  SIGN_UP_ROUTE,
} from "@/lib/site";
import { renderWithProviders, renderWithRouter } from "@/test/helpers";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
    submitContactEnquiry: vi.fn(async () => ({ __kind: "ok", ok: 1n })),
  })),
}));

/**
 * Cover for the accepted header change:
 *   - a thin full-width banner above the navigation with the exact text;
 *   - exactly five primary links in the accepted order;
 *   - Home, Partnerships and Contact removed from the top navigation only;
 *   - the Sovereign AI label on the existing Sovereign Deployment route;
 *   - the outlined "Account demo" and solid in-app "Sign Up" actions;
 *   - the transparent-background logo rendered directly on the navy bar with
 *     no chip or background container.
 */
describe("header banner bar", () => {
  it("renders the banner above the main navigation with the exact text", async () => {
    await renderWithRouter(<SiteHeader />);

    const banner = document.querySelector(
      '[data-ocid="nav.banner"]',
    ) as HTMLElement;
    expect(banner).not.toBeNull();
    expect(banner).toHaveTextContent(HEADER_BANNER_TEXT);

    // The banner sits above the navigation row in document order.
    const primaryNav = screen.getByRole("navigation", { name: "Primary" });
    expect(
      banner.compareDocumentPosition(primaryNav) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("centers the banner text and renders it small and uppercase", async () => {
    await renderWithRouter(<SiteHeader />);

    const banner = document.querySelector(
      '[data-ocid="nav.banner"]',
    ) as HTMLElement;
    const text = within(banner).getByText(HEADER_BANNER_TEXT);
    expect(text.className).toContain("text-center");
    expect(text.className).toContain("uppercase");
  });
});

describe("primary navigation link set", () => {
  it("renders exactly the five accepted links in order", async () => {
    await renderWithRouter(<SiteHeader />);

    const primaryNav = screen.getByRole("navigation", { name: "Primary" });
    const links = within(primaryNav).getAllByRole("link");
    expect(links.map((link) => link.textContent?.trim())).toEqual([
      "Solutions",
      "Keyboard Liberation",
      "AI Governance",
      "Sovereign AI",
      "Pricing",
    ]);
    expect(links.map((link) => link.getAttribute("href"))).toEqual(
      NAV_ITEMS.map((item) => item.to),
    );
  });

  it("removes Home, Partnerships and Contact from the top navigation", async () => {
    await renderWithRouter(<SiteHeader />);

    const primaryNav = screen.getByRole("navigation", { name: "Primary" });
    for (const label of ["Home", "Partnerships", "Contact"]) {
      expect(
        within(primaryNav).queryByRole("link", { name: label }),
      ).not.toBeInTheDocument();
    }
  });

  it("points the Sovereign AI link at the existing Sovereign Deployment route", async () => {
    await renderWithRouter(<SiteHeader />);

    const primaryNav = screen.getByRole("navigation", { name: "Primary" });
    expect(
      within(primaryNav).getByRole("link", { name: "Sovereign AI" }),
    ).toHaveAttribute("href", "/sovereign-deployment");
  });
});

describe("header account actions", () => {
  it("renders the outlined Account demo and solid Sign Up actions", async () => {
    await renderWithRouter(<SiteHeader />);

    const accountDemo = document.querySelector(
      '[data-ocid="nav.account_demo_button"]',
    ) as HTMLAnchorElement;
    const signUp = document.querySelector(
      '[data-ocid="nav.sign_up_button"]',
    ) as HTMLAnchorElement;

    expect(accountDemo).not.toBeNull();
    expect(signUp).not.toBeNull();
    expect(accountDemo).toHaveAttribute("href", ACCOUNT_DEMO_URL);
    expect(signUp).toHaveAttribute("href", SIGN_UP_ROUTE);

    // The outlined action is transparent with a cyan border; the solid action
    // is filled with the accent.
    expect(accountDemo.className).toContain("bg-transparent");
    expect(accountDemo.className).toContain("border-primary");
    expect(signUp.className).toContain("bg-primary");
  });

  it("no longer renders Sign In or Get Started in the header", async () => {
    await renderWithRouter(<SiteHeader />);

    const header = document.querySelector("header") as HTMLElement;
    expect(
      within(header).queryByRole("link", { name: "Sign In" }),
    ).not.toBeInTheDocument();
    expect(
      within(header).queryByRole("link", { name: "Get Started" }),
    ).not.toBeInTheDocument();
  });
});

describe("header logo treatment", () => {
  it("renders the supplied logo image directly with no chip container", async () => {
    await renderWithRouter(<SiteHeader />);

    const logo = document.querySelector(
      '[data-ocid="nav.logo"]',
    ) as HTMLImageElement;
    expect(logo).not.toBeNull();
    expect(logo.tagName).toBe("IMG");
    expect(logo).toHaveAttribute("src", LOGO_IMAGE.src);
    expect(logo).toHaveAttribute("alt", LOGO_IMAGE.alt);

    // The logo is a direct child of the brand link: no wrapper element with a
    // background/foreground chip sits between the link and the mark.
    const homeLink = logo.parentElement as HTMLElement;
    expect(homeLink).toHaveAttribute("data-ocid", "nav.home_link");
    expect(logo.previousElementSibling).toBeNull();
    expect(logo.nextElementSibling).toBeNull();
  });
});

describe("removed top-navigation pages stay reachable", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("keeps the Partnerships page reachable at its existing route", async () => {
    window.history.pushState({}, "", "/partnerships");
    renderWithProviders(<App />);

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: /a partnership model for sustainable national access/i,
      }),
    ).toBeInTheDocument();
  });

  it("keeps the Contact page reachable at its existing route", async () => {
    window.history.pushState({}, "", "/contact");
    renderWithProviders(<App />);

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: /talk to the robi care team/i,
      }),
    ).toBeInTheDocument();
  });

  it("keeps Partnerships and Contact reachable from the footer", async () => {
    window.history.pushState({}, "", "/");
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

    const footer = document.querySelector("footer") as HTMLElement;
    expect(
      within(footer).getByRole("link", { name: "PPP partnerships" }),
    ).toHaveAttribute("href", "/partnerships");
    expect(
      within(footer).getByRole("link", { name: "Contact" }),
    ).toHaveAttribute("href", "/contact");
  });
});

describe("mobile navigation follows the same link set", () => {
  it("shows the five accepted links and the two demo actions in the mobile panel", async () => {
    const user = userEvent.setup();
    await renderWithRouter(<SiteHeader />);

    await user.click(
      screen.getByRole("button", { name: /open navigation menu/i }),
    );

    const mobileNav = screen.getByRole("navigation", { name: "Mobile" });
    expect(
      within(mobileNav)
        .getAllByRole("link")
        .map((link) => link.textContent?.trim()),
    ).toEqual([
      "Solutions",
      "Keyboard Liberation",
      "AI Governance",
      "Sovereign AI",
      "Pricing",
    ]);

    expect(
      document.querySelector('[data-ocid="nav.mobile_account_demo_button"]'),
    ).toHaveAttribute("href", ACCOUNT_DEMO_URL);
    expect(
      document.querySelector('[data-ocid="nav.mobile_sign_up_button"]'),
    ).toHaveAttribute("href", SIGN_UP_ROUTE);
  });
});
