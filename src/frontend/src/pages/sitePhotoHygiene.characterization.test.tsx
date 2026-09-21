import { AiGovernancePage } from "@/pages/AiGovernancePage";
import { ContactPage } from "@/pages/ContactPage";
import { HomePage } from "@/pages/HomePage";
import { KeyboardLiberationPage } from "@/pages/KeyboardLiberationPage";
import { PartnershipsPage } from "@/pages/PartnershipsPage";
import { PricingPage } from "@/pages/PricingPage";
import { SolutionsPage } from "@/pages/SolutionsPage";
import { SovereignDeploymentPage } from "@/pages/SovereignDeploymentPage";
import { SponsorshipPage } from "@/pages/SponsorshipPage";
import { renderWithRouter } from "@/test/helpers";
import { cleanup } from "@testing-library/react";
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

/**
 * Characterization baseline for the accepted data-centre asset deletion.
 *
 * The request removes one unused asset file,
 * `public/assets/generated/sovereign-deployment-data-centre.dim_1536x1024.jpg`,
 * and changes no source file, page, component, style or copy. The behavior that
 * must survive the deletion is the site-wide photography invariant:
 *
 *   - no photograph displayed on any page references the retired data-centre
 *     asset by name;
 *   - no displayed photograph's alt text describes data-centre / server-room
 *     infrastructure.
 *
 * This file deliberately does NOT assert that the orphan asset file exists on
 * disk — its removal is the intended change. It protects the observable
 * rendering contract instead, which is what the deletion must not disturb.
 */

/** Every public page that renders photography. */
const PAGES: { name: string; element: ReactElement }[] = [
  { name: "Home", element: <HomePage /> },
  { name: "Solutions", element: <SolutionsPage /> },
  { name: "Keyboard Liberation", element: <KeyboardLiberationPage /> },
  { name: "AI Governance", element: <AiGovernancePage /> },
  { name: "Sovereign Deployment", element: <SovereignDeploymentPage /> },
  { name: "Partnerships", element: <PartnershipsPage /> },
  { name: "Pricing", element: <PricingPage /> },
  { name: "Contact", element: <ContactPage /> },
  { name: "Sponsorship", element: <SponsorshipPage /> },
];

/** The retired asset's filename stem, which no rendered src may contain. */
const RETIRED_ASSET_STEM = "sovereign-deployment-data-centre";

/** Wording that would describe technology-infrastructure imagery. */
const INFRASTRUCTURE_ALT = /data-?cent(er|re)|server|rack|server room/i;

afterEach(() => {
  cleanup();
});

describe("no page references the retired data-centre asset", () => {
  it.each(PAGES)(
    "$name renders no image whose src names the retired asset",
    async ({ element }) => {
      await renderWithRouter(element);

      for (const image of document.querySelectorAll("img")) {
        expect(image.getAttribute("src")).not.toContain(RETIRED_ASSET_STEM);
      }
    },
  );
});

describe("no page displays infrastructure-style photography", () => {
  it.each(PAGES)(
    "$name renders every image with alt text free of infrastructure wording",
    async ({ element }) => {
      await renderWithRouter(element);

      const images = Array.from(document.querySelectorAll("img"));
      expect(images.length).toBeGreaterThanOrEqual(1);

      for (const image of images) {
        const alt = image.getAttribute("alt") ?? "";
        expect(alt.trim().length).toBeGreaterThan(0);
        expect(alt).not.toMatch(INFRASTRUCTURE_ALT);
      }
    },
  );
});
