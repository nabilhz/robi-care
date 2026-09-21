import { AiGovernancePage } from "@/pages/AiGovernancePage";
import { SovereignDeploymentPage } from "@/pages/SovereignDeploymentPage";
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
 * Cover for the accepted clinical-photography change.
 *
 * The request replaces the Sovereign AI page's hero photograph and its
 * "Next step" panel photograph — previously data-center / server-room imagery —
 * with real human clinical settings, and rewrites their alt text to match. The
 * AI Governance page must carry clinical photography only, and no data-center
 * style photograph may remain referenced anywhere on the site.
 *
 * The characterization file protects the surrounding page structure; this file
 * pins only the behavior the request intentionally changed.
 */

/** The two Sovereign photographs the request replaces. */
const SOVEREIGN_HERO_SRC =
  "/assets/generated/sovereign-deployment-in-country-hosting.dim_1536x1024.jpg";
const SOVEREIGN_NEXT_STEP_SRC =
  "/assets/generated/sovereign-deployment-next-step.dim_1536x1024.jpg";

const NEXT_STEP_HEADING =
  /review the deployment model with your governance team/i;

/** Wording that would describe technology-infrastructure imagery. */
const INFRASTRUCTURE_ALT = /data-?cent(er|re)|server|rack|server room/i;

/** Wording that describes a real human clinical setting. */
const CLINICAL_ALT =
  /hospital|patient room|consultation office|clinic|clinician|physician|nurse|patient|administrator|workstation|desk/i;

/** Locates the framed ImagePanel figure that owns a given image. */
function figureFor(image: HTMLImageElement): HTMLElement {
  const figure = image.closest("figure") as HTMLElement | null;
  expect(figure).not.toBeNull();
  return figure as HTMLElement;
}

describe("Sovereign AI hero photograph is clinical", () => {
  it("shows the replaced hero photo with clinical alt text and no infrastructure wording", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    const hero = document.querySelector(
      `img[src="${SOVEREIGN_HERO_SRC}"]`,
    ) as HTMLImageElement | null;
    expect(hero).not.toBeNull();

    const alt = hero?.getAttribute("alt") ?? "";
    expect(alt.trim().length).toBeGreaterThan(0);
    expect(alt).toMatch(CLINICAL_ALT);
    expect(alt).not.toMatch(INFRASTRUCTURE_ALT);

    // The photograph stays in the shared framed ImagePanel.
    const figure = figureFor(hero as HTMLImageElement);
    expect(figure.className).toContain("border-hairline");
  });
});

describe("Sovereign AI Next step photograph is clinical", () => {
  it("shows the replaced Next step photo with clinical alt text and no infrastructure wording", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    const section = screen
      .getByRole("heading", { level: 2, name: NEXT_STEP_HEADING })
      .closest("section") as HTMLElement | null;
    expect(section).not.toBeNull();

    const image = within(section as HTMLElement).getByRole(
      "img",
    ) as HTMLImageElement;
    expect(image).toHaveAttribute("src", SOVEREIGN_NEXT_STEP_SRC);

    const alt = image.getAttribute("alt") ?? "";
    expect(alt.trim().length).toBeGreaterThan(0);
    expect(alt).toMatch(CLINICAL_ALT);
    expect(alt).not.toMatch(INFRASTRUCTURE_ALT);

    const figure = figureFor(image);
    expect(figure.className).toContain("border-hairline");
  });
});

describe("no data-center photograph remains on the Sovereign AI page", () => {
  it("references no data-center style image source or alt text", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    const images = Array.from(document.querySelectorAll("img"));
    expect(images.length).toBeGreaterThanOrEqual(2);

    for (const image of images) {
      const src = image.getAttribute("src") ?? "";
      const alt = image.getAttribute("alt") ?? "";
      expect(src).not.toMatch(/data-?cent(er|re)|server/i);
      expect(alt).not.toMatch(INFRASTRUCTURE_ALT);
    }
  });

  it("does not reference the retired data-centre asset", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    for (const image of document.querySelectorAll("img")) {
      expect(image.getAttribute("src")).not.toContain(
        "sovereign-deployment-data-centre",
      );
    }
  });
});

describe("AI Governance carries clinical photography only", () => {
  it("renders every image with clinical alt text and no infrastructure wording", async () => {
    await renderWithRouter(<AiGovernancePage />);

    const images = Array.from(document.querySelectorAll("img"));
    expect(images.length).toBeGreaterThanOrEqual(3);

    for (const image of images) {
      const alt = image.getAttribute("alt") ?? "";
      expect(alt.trim().length).toBeGreaterThan(0);
      expect(alt).toMatch(CLINICAL_ALT);
      expect(alt).not.toMatch(INFRASTRUCTURE_ALT);
    }
  });

  it("keeps each clinical photograph in a framed panel", async () => {
    await renderWithRouter(<AiGovernancePage />);

    for (const image of document.querySelectorAll("img")) {
      const figure = figureFor(image as HTMLImageElement);
      expect(figure.className).toContain("border-hairline");
    }
  });
});

describe("replaced Sovereign photographs stay distinct", () => {
  it("uses two different clinical photographs for hero and Next step", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    const hero = document.querySelector(
      `img[src="${SOVEREIGN_HERO_SRC}"]`,
    ) as HTMLImageElement | null;
    const nextStep = document.querySelector(
      `img[src="${SOVEREIGN_NEXT_STEP_SRC}"]`,
    ) as HTMLImageElement | null;

    expect(hero).not.toBeNull();
    expect(nextStep).not.toBeNull();
    expect(hero?.getAttribute("src")).not.toBe(nextStep?.getAttribute("src"));
  });
});
