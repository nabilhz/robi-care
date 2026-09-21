import {
  ACCOUNT_DEMO_URL,
  FOOTER_GROUPS,
  GET_STARTED_URL,
  HEADER_BANNER_TEXT,
  HOME_HERO_CTAS,
  SIGN_IN_URL,
} from "@/lib/site";
import { renderWithProviders } from "@/test/helpers";
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
    submitContactEnquiry: vi.fn(async () => ({ __kind__: "ok", ok: 1n })),
  })),
}));

/**
 * Characterization baseline for the signup change.
 *
 * The request intentionally changes the *solid* call-to-action in two places:
 * the header's solid action becomes an in-app "Sign Up" link to `/signup`
 * (desktop and mobile), and the Home hero's primary CTA becomes "Sign Up" to
 * `/signup`. A new `/signup` route and page are added.
 *
 * This file therefore deliberately does NOT pin the solid action's label or
 * destination, the hero primary CTA's label or destination, or the absence of a
 * `/signup` route. It protects the behavior the change must keep intact:
 *
 *   - the header's *outlined* "Account demo" action keeps its label, its
 *     TeleMeetUp destination, and its outline treatment on desktop and mobile;
 *   - the hero's *secondary* "Explore clinical solutions" action keeps its
 *     `/solutions` destination and its outline treatment, and the hero primary
 *     keeps the solid `btn-primary` recipe (only its label/target change);
 *   - every one of the eight existing public routes still renders inside the
 *     shared shell, so adding `/signup` removes nothing;
 *   - the footer and the closing CtaBand keep their own account actions and
 *     navigation groups, which the request does not touch;
 *   - the header shell mechanics (fixed bar, banner, mobile menu, active-route
 *     marking) survive the CTA change.
 *
 * The shell is rendered through the real `App` router rather than the minimal
 * test router, so these assertions keep resolving once `/signup` is registered.
 */
const EXISTING_ROUTES: { path: string; level: 1 | 2; heading: RegExp }[] = [
  {
    path: "/",
    level: 2,
    heading: /from consultation to clear documentation in three steps/i,
  },
  { path: "/solutions", level: 1, heading: /clinical use cases/i },
  { path: "/keyboard-liberation", level: 1, heading: /work by speaking/i },
  {
    path: "/ai-governance",
    level: 1,
    heading: /clinical ai that can be constrained, examined and stopped/i,
  },
  {
    path: "/sovereign-deployment",
    level: 1,
    heading: /healthcare enablement operated within the country it serves/i,
  },
  {
    path: "/partnerships",
    level: 1,
    heading: /a partnership model for sustainable national access/i,
  },
  { path: "/pricing", level: 1, heading: /transparent pricing/i },
  { path: "/contact", level: 1, heading: /talk to the robi care team/i },
];

beforeEach(() => {
  window.history.pushState({}, "", "/");
  vi.clearAllMocks();
});

describe("header outlined account action is untouched", () => {
  it("keeps the desktop Account demo label, destination, and outline treatment", async () => {
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

    const accountDemo = document.querySelector(
      '[data-ocid="nav.account_demo_button"]',
    ) as HTMLAnchorElement;
    expect(accountDemo).not.toBeNull();
    expect(accountDemo).toHaveTextContent("Account demo");
    expect(accountDemo).toHaveAttribute("href", ACCOUNT_DEMO_URL);
    // The outlined action stays transparent with a cyan border; only the solid
    // action is being repointed.
    expect(accountDemo.className).toContain("bg-transparent");
    expect(accountDemo.className).toContain("border-primary");
  });

  it("keeps the mobile Account demo label and destination", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

    await user.click(
      screen.getByRole("button", { name: /open navigation menu/i }),
    );

    const accountDemo = document.querySelector(
      '[data-ocid="nav.mobile_account_demo_button"]',
    ) as HTMLAnchorElement;
    expect(accountDemo).not.toBeNull();
    expect(accountDemo).toHaveTextContent("Account demo");
    expect(accountDemo).toHaveAttribute("href", ACCOUNT_DEMO_URL);
  });
});

describe("hero secondary action is untouched", () => {
  it("keeps Explore clinical solutions on /solutions with the outline recipe", async () => {
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

    const hero = document.querySelector(
      '[data-ocid="home.hero"]',
    ) as HTMLElement;
    expect(hero).not.toBeNull();

    const outline = within(hero).getByRole("link", {
      name: "Explore clinical solutions",
    });
    expect(outline).toHaveAttribute("href", "/solutions");
    expect(outline.className).toContain("btn-secondary");

    // The secondary CTA is still the outline variant in the site constants.
    const outlineCta = HOME_HERO_CTAS.find((cta) => cta.variant === "outline");
    expect(outlineCta?.to).toBe("/solutions");
    expect(outlineCta?.label).toBe("Explore clinical solutions");
  });

  it("keeps the hero primary CTA on the solid btn-primary recipe", async () => {
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

    const primary = document.querySelector(
      '[data-ocid="home.hero.cta.primary"]',
    ) as HTMLElement;
    expect(primary).not.toBeNull();
    // Only the label and destination change; the solid recipe stays.
    expect(primary.className).toContain("btn-primary");
  });
});

describe("existing routes survive the signup addition", () => {
  it.each(EXISTING_ROUTES)(
    "still renders $path inside the shared shell",
    async ({ path, level, heading }) => {
      window.history.pushState({}, "", path);
      renderWithProviders(<App />);

      expect(
        await screen.findByRole("heading", { level, name: heading }),
      ).toBeInTheDocument();

      const header = document.querySelector("header") as HTMLElement;
      expect(header).not.toBeNull();
      expect(header.className).toContain("fixed");

      const footer = document.querySelector("footer") as HTMLElement;
      expect(footer).not.toBeNull();
      expect(
        within(footer).getByText("© 2026 Ecocarrier Inc. All rights reserved."),
      ).toBeInTheDocument();
    },
  );
});

describe("footer and closing CtaBand account actions are untouched", () => {
  it("keeps the footer Get Started and Sign In destinations", async () => {
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

    const footer = document.querySelector("footer") as HTMLElement;
    const getStarted = document.querySelector(
      '[data-ocid="footer.get_started_button"]',
    ) as HTMLAnchorElement;
    const signIn = document.querySelector(
      '[data-ocid="footer.sign_in_button"]',
    ) as HTMLAnchorElement;

    expect(getStarted).toHaveAttribute("href", GET_STARTED_URL);
    expect(signIn).toHaveAttribute("href", SIGN_IN_URL);

    // The footer's three navigation groups are unchanged by the header change.
    for (const group of FOOTER_GROUPS) {
      expect(
        within(footer).getByRole("navigation", { name: group.heading }),
      ).toBeInTheDocument();
    }
  });

  it("keeps the closing CtaBand Get Started and Sign In destinations", async () => {
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

    const getStarted = document.querySelector(
      '[data-ocid="cta.primary_button"]',
    ) as HTMLAnchorElement;
    const signIn = document.querySelector(
      '[data-ocid="cta.secondary_button"]',
    ) as HTMLAnchorElement;

    expect(getStarted).toHaveAttribute("href", GET_STARTED_URL);
    expect(signIn).toHaveAttribute("href", SIGN_IN_URL);
  });
});

describe("header shell mechanics survive the CTA change", () => {
  it("keeps the fixed nav-surface bar and the announcement banner", async () => {
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

    const header = document.querySelector("header") as HTMLElement;
    expect(header.className).toContain("fixed");
    expect(header.className).toContain("nav-surface");

    const banner = document.querySelector(
      '[data-ocid="nav.banner"]',
    ) as HTMLElement;
    expect(banner).not.toBeNull();
    expect(banner).toHaveTextContent(HEADER_BANNER_TEXT);
  });

  it("keeps the mobile menu toggle wiring and Escape-to-close", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

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

    await user.keyboard("{Escape}");
    expect(
      screen.queryByRole("navigation", { name: "Mobile" }),
    ).not.toBeInTheDocument();
  });

  it("keeps the five primary navigation links and their destinations", async () => {
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

    const primaryNav = screen.getByRole("navigation", { name: "Primary" });
    expect(
      within(primaryNav)
        .getAllByRole("link")
        .map((link) => link.textContent?.trim()),
    ).toEqual([
      "Solutions",
      "Keyboard Liberation",
      "AI Governance",
      "Sovereign AI",
      "Pricing",
    ]);
  });
});
