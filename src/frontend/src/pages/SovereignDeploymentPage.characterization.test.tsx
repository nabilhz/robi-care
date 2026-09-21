import { SovereignDeploymentPage } from "@/pages/SovereignDeploymentPage";
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
 * Characterization baseline for the Sovereign Deployment page *around* the
 * intended change. The hero headline ("Clinical documentation that stays under
 * your governance") and the body sections are being replaced intentionally, so
 * this file deliberately does NOT pin the current headline or the current
 * section list. It protects the parts the request does not change: the page
 * renders at /sovereign-deployment inside the shared shell, the hero actions
 * and closing CTA keep their destinations, the unconfirmed-certification
 * placeholder and no-invented-claims rule survive, every image keeps alt text,
 * and the rest of the site's navigation is unaffected.
 */
describe("SovereignDeploymentPage stable content", () => {
  it("renders a single page-level h1 inside the shared shell", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0].textContent?.trim().length ?? 0).toBeGreaterThan(0);
  });

  it("keeps the hero eyebrow and the Get Started action pointing at the account system", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    expect(screen.getByText("Sovereign Deployment")).toBeInTheDocument();

    const getStarted = document.querySelector(
      '[data-ocid="sovereign.primary_button"]',
    ) as HTMLAnchorElement;
    expect(getStarted).not.toBeNull();
    expect(getStarted).toHaveAttribute(
      "href",
      "https://app.telemeetup.com/register",
    );
  });

  it("keeps the hero's secondary action pointing at the contact page", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    const talkToTeam = document.querySelector(
      '[data-ocid="sovereign.secondary_button"]',
    ) as HTMLAnchorElement;
    expect(talkToTeam).not.toBeNull();
    expect(talkToTeam).toHaveAttribute("href", "/contact");
  });

  it("keeps the unconfirmed-certification placeholder and invents no claims", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    const text = document.body.textContent ?? "";
    expect(text).toContain("[certification/region to be confirmed]");
    // No invented hosting regions or certification names.
    expect(text).not.toMatch(/\b(ISO\s?27001|SOC\s?2|HIPAA|GDPR)\b/i);
    expect(text).not.toMatch(
      /\b(EU|US|UK|Canada|Australia)\s+(region|data centre|datacenter)\b/i,
    );
  });

  it("keeps the underlying-platform fact as the TeleMeetUp Enablement Platform", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    const platformFact = document.querySelector(
      '[data-ocid="sovereign.fact.platform"]',
    ) as HTMLElement;
    expect(platformFact).not.toBeNull();
    expect(
      within(platformFact).getByText("TMU · TeleMeetUp Enablement Platform"),
    ).toBeInTheDocument();
  });

  it("renders every image with non-empty alt text", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    const images = document.querySelectorAll("img");
    expect(images.length).toBeGreaterThanOrEqual(1);
    for (const image of images) {
      expect(image.getAttribute("alt")?.trim().length ?? 0).toBeGreaterThan(0);
    }
  });

  it("keeps the closing call-to-action band with both account actions", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    const getStarted = document.querySelector(
      '[data-ocid="cta.primary_button"]',
    ) as HTMLAnchorElement;
    const signIn = document.querySelector(
      '[data-ocid="cta.secondary_button"]',
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

describe("SovereignDeploymentPage shared shell", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/sovereign-deployment");
    vi.clearAllMocks();
  });

  it("renders at /sovereign-deployment inside the fixed header and shared footer", async () => {
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

    const header = document.querySelector("header");
    expect(header).not.toBeNull();
    expect(header?.className).toContain("fixed");

    // The top-navigation label is now "Sovereign AI" but the route is unchanged.
    const primaryNav = screen.getByRole("navigation", { name: "Primary" });
    expect(
      within(primaryNav).getByRole("link", { name: "Sovereign AI" }),
    ).toHaveAttribute("href", "/sovereign-deployment");

    const footer = document.querySelector("footer") as HTMLElement;
    expect(footer).not.toBeNull();
    expect(
      within(footer).getByText("© 2026 Ecocarrier Inc. All rights reserved."),
    ).toBeInTheDocument();
  });
});
