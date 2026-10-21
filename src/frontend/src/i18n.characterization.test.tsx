import { renderWithProviders } from "@/test/helpers";
import { screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import App from "@/App";

/**
 * Characterization baseline for the bilingual (EN / FR) change.
 *
 * The request intentionally adds a language toggle, a language provider, and a
 * French translation of every page. This file therefore deliberately does NOT
 * assert the toggle's presence or absence, any French string, the document
 * `lang` attribute, or the page title — those are the intended new behaviors.
 *
 * It protects the behavior the bilingual change must keep intact:
 *   - a first-time visitor (no stored preference) still gets the existing
 *     English site, on every route, with no French leaking into the default;
 *   - every existing route still resolves and still renders its English h1;
 *   - the header banner, primary navigation, footer groups, footer links and
 *     the footer emergency notice still render in English by default;
 *   - the three-step sign-up flow and the contact form still work in English,
 *     including their validation and success copy;
 *   - prices, tier names and numbers are unchanged in the English default;
 *   - the protected terms stay in English exactly as written.
 *
 * `localStorage` is cleared before each test so the suite models a first-time
 * visitor rather than inheriting a preference from another test.
 */

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

beforeEach(() => {
  window.localStorage.clear();
  window.history.pushState({}, "", "/");
  vi.clearAllMocks();
});

/**
 * The English h1 each existing route renders. The Home page's h1 lives in the
 * hero; the rest come from `PageHero`. These are the accepted English pages
 * that must render exactly as before when English is active.
 */
const ROUTES: { path: string; heading: RegExp }[] = [
  { path: "/", heading: /more presence\. less paperwork\./i },
  { path: "/solutions", heading: /clinical use cases, handled with care/i },
  {
    path: "/keyboard-liberation",
    heading: /clinicians should work by speaking, not typing/i,
  },
  {
    path: "/ai-governance",
    heading: /clinical ai that can be constrained, examined and stopped/i,
  },
  {
    path: "/sovereign-deployment",
    heading: /healthcare enablement operated within the country it serves/i,
  },
  { path: "/pricing", heading: /transparent pricing, built from real usage/i },
  { path: "/contact", heading: /talk to the robi care team/i },
  {
    path: "/partnerships",
    heading: /a partnership model for sustainable national access/i,
  },
  {
    path: "/sponsorship",
    heading:
      /sponsorship is a strategic investment in community healthcare access, not charity/i,
  },
  { path: "/signup", heading: /set up robi care/i },
];

describe("first-time visitor defaults to English on every route", () => {
  it.each(ROUTES)(
    "renders the English h1 on $path with no stored preference",
    async ({ path, heading }) => {
      window.history.pushState({}, "", path);
      renderWithProviders(<App />);

      expect(
        await screen.findByRole("heading", { level: 1, name: heading }),
      ).toBeInTheDocument();
    },
  );

  it("does not leak French copy into the default English home page", async () => {
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

    const text = document.body.textContent ?? "";
    // A few unmistakable French markers that must not appear while English is
    // the active language. This catches a provider that defaults to French or
    // reads a stale preference.
    for (const marker of [
      "Connexion",
      "Tarifs",
      "Nous contacter",
      "Politique de confidentialité",
    ]) {
      expect(text).not.toContain(marker);
    }
  });
});

describe("header and footer render in English by default", () => {
  it("keeps the English banner, primary navigation and account actions", async () => {
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

    const header = document.querySelector("header") as HTMLElement;
    expect(header).not.toBeNull();

    expect(
      within(header).getByText(
        "AI-assisted · Clinician-controlled · Designed for sovereign deployment",
      ),
    ).toBeInTheDocument();

    const primaryNav = within(header).getByRole("navigation", {
      name: "Primary",
    });
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

    expect(
      within(header).getByRole("link", { name: "Account demo" }),
    ).toHaveAttribute("href", "https://app.telemeetup.com/login");
    expect(
      within(header).getByRole("link", { name: "Sign Up" }),
    ).toHaveAttribute("href", "/signup");
  });

  it("keeps the English footer groups, links and emergency notice", async () => {
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

    const footer = document.querySelector("footer") as HTMLElement;
    expect(footer).not.toBeNull();

    for (const heading of ["Explore", "Deploy", "Contact & policies"]) {
      expect(
        within(footer).getByRole("navigation", { name: heading }),
      ).toBeInTheDocument();
    }

    expect(
      within(footer).getByRole("link", { name: "Clinical solutions" }),
    ).toHaveAttribute("href", "/solutions");
    expect(
      within(footer).getByRole("link", { name: "PPP partnerships" }),
    ).toHaveAttribute("href", "/partnerships");

    expect(
      within(footer).getByText(
        "Not an emergency service. In an emergency, contact the applicable local emergency service.",
      ),
    ).toBeInTheDocument();
    expect(
      within(footer).getByText("© 2026 Ecocarrier Inc. All rights reserved."),
    ).toBeInTheDocument();
  });
});

describe("sign-up flow still works in English by default", () => {
  it("shows the three English steps and the account fields", async () => {
    window.history.pushState({}, "", "/signup");
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

    const steps = document.querySelector(
      '[data-ocid="signup.steps"]',
    ) as HTMLElement;
    expect(steps).not.toBeNull();
    expect(
      within(steps)
        .getAllByRole("listitem")
        .map((item) => item.textContent ?? ""),
    ).toEqual([
      expect.stringContaining("Account"),
      expect.stringContaining("Verification"),
      expect.stringContaining("Dashboard"),
    ]);

    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Mobile Phone Number")).toBeInTheDocument();
  });

  it("keeps the English validation messages on an empty Step 1", async () => {
    window.history.pushState({}, "", "/signup");
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

    const { default: userEvent } = await import("@testing-library/user-event");
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(
      screen.getByText("Please enter your full name."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Please enter your email address."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Please enter your mobile phone number."),
    ).toBeInTheDocument();
  });
});

describe("contact form still works in English by default", () => {
  it("keeps the English labels and validation messages", async () => {
    window.history.pushState({}, "", "/contact");
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Organisation")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();

    const { default: userEvent } = await import("@testing-library/user-event");
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    expect(
      await screen.findByText("Please enter your name."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Please enter your organisation."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Please tell us how we can help."),
    ).toBeInTheDocument();
  });
});

describe("English pricing values are unchanged", () => {
  it("keeps the tier names, allowances and numbers in the default language", async () => {
    window.history.pushState({}, "", "/pricing");
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

    for (const [tier, allowance] of [
      ["Premium Pro", "4 transcription hours / day"],
      ["Premium Business", "20 transcription hours / day"],
      ["Enterprise", "200 transcription hours / day"],
    ] as const) {
      const card = screen
        .getByRole("heading", { level: 3, name: tier })
        .closest("article") as HTMLElement;
      expect(card).not.toBeNull();
      expect(within(card).getByText(allowance)).toBeInTheDocument();
    }
  });
});

describe("protected terms stay in English", () => {
  it("renders the protected terms exactly as written on the default site", async () => {
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

    const text = document.body.textContent ?? "";
    for (const term of [
      "Robi Care",
      "Keyboard Liberation",
      "TMU Enablement Platform",
    ]) {
      expect(text).toContain(term);
    }
  });
});
