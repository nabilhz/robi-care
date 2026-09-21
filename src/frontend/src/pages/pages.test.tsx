import { AiGovernancePage } from "@/pages/AiGovernancePage";
import { ContactPage } from "@/pages/ContactPage";
import { HomePage } from "@/pages/HomePage";
import { KeyboardLiberationPage } from "@/pages/KeyboardLiberationPage";
import { PartnershipsPage } from "@/pages/PartnershipsPage";
import { PricingPage } from "@/pages/PricingPage";
import { SolutionsPage } from "@/pages/SolutionsPage";
import { SovereignDeploymentPage } from "@/pages/SovereignDeploymentPage";
import { renderWithProviders, renderWithRouter } from "@/test/helpers";
import { cleanup, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

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

const PAGES: { name: string; element: ReactElement }[] = [
  { name: "Home", element: <HomePage /> },
  { name: "Solutions", element: <SolutionsPage /> },
  { name: "Keyboard Liberation", element: <KeyboardLiberationPage /> },
  { name: "AI Governance", element: <AiGovernancePage /> },
  { name: "Sovereign Deployment", element: <SovereignDeploymentPage /> },
  { name: "Partnerships", element: <PartnershipsPage /> },
  { name: "Pricing", element: <PricingPage /> },
  { name: "Contact", element: <ContactPage /> },
];

afterEach(() => {
  cleanup();
});

describe("page content requirements", () => {
  it.each(PAGES)("$name includes at least one image", async ({ element }) => {
    await renderWithRouter(element);
    const images = document.querySelectorAll("img");
    expect(images.length).toBeGreaterThanOrEqual(1);
    for (const image of images) {
      expect(image.getAttribute("alt")?.trim().length ?? 0).toBeGreaterThan(0);
    }
  });

  it("Sovereign Deployment uses placeholders instead of invented claims", () => {
    renderWithProviders(<SovereignDeploymentPage />);
    const text = document.body.textContent ?? "";
    expect(text).toContain("[certification/region to be confirmed]");
    // No invented hosting regions or certification names.
    expect(text).not.toMatch(/\b(ISO\s?27001|SOC\s?2|HIPAA|GDPR)\b/i);
    expect(text).not.toMatch(
      /\b(EU|US|UK|Canada|Australia)\s+(region|data centre|datacenter)\b/i,
    );
  });

  it("Keyboard Liberation makes no invented certification or region claims", () => {
    renderWithProviders(<KeyboardLiberationPage />);
    const text = document.body.textContent ?? "";
    expect(text).not.toMatch(/\b(ISO\s?27001|SOC\s?2|HIPAA|GDPR)\b/i);
    expect(text).not.toMatch(
      /\b(EU|US|UK|Canada|Australia)\s+(region|data centre|datacenter)\b/i,
    );
  });

  it("AI Governance states the review-before-use position", () => {
    renderWithProviders(<AiGovernancePage />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Clinical AI that can be constrained, examined and stopped.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/AI prepares, clinicians decide/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/review-before-use is the default/i),
    ).toBeInTheDocument();
  });
});
