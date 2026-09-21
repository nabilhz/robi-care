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
    submitContactEnquiry: vi.fn(async () => ({ __kind: "ok", ok: 1n })),
  })),
}));

/**
 * Characterization baseline for the Sovereign AI / AI Governance photo change.
 *
 * The request intentionally replaces the Sovereign Deployment hero photograph
 * and its "Next step" panel photograph (currently data-center / server-rack
 * imagery) with clinical photography, and rewrites their alt text. This file
 * therefore deliberately does NOT pin the current Sovereign image `src` values
 * or the current data-center alt wording — those are the behavior that is
 * allowed to change.
 *
 * It protects the surrounding behavior that must survive the swap:
 *
 *   - the Sovereign hero and Next step sections keep their structure: a framed
 *     ImagePanel with a real photograph, non-empty alt text, and a caption in a
 *     separate figcaption rather than overlaid on the photo;
 *   - the hero and Next step actions keep their destinations;
 *   - the AI Governance page keeps its clinical photography unchanged (the
 *     request only changes the Sovereign page);
 *   - the Sovereign page never falls back to the retired physician photo, and
 *     the two pages do not accidentally share a photograph.
 */

const SOVEREIGN_HERO_IMAGE_SELECTOR = "section img";
const NEXT_STEP_HEADING =
  /review the deployment model with your governance team/i;

/** The photo retired from the supporting sections in an earlier change. */
const RETIRED_PHOTO_SRC =
  "/assets/generated/hero-clinical-room.dim_1536x1024.jpg";

/** The AI Governance clinical photographs, which this request does not touch. */
const AI_GOVERNANCE_IMAGES = [
  {
    src: "/assets/generated/ai-governance-clinician-review.dim_1536x1024.jpg",
    alt: /clinician's hands reviewing a printed structured clinical note/i,
  },
  {
    src: "/assets/generated/ai-governance-human-in-the-loop.dim_1536x1024.jpg",
    alt: /clinician seated at a workstation pointing at a monitor/i,
  },
  {
    src: "/assets/generated/ai-governance-admin-dashboard.dim_1536x1024.jpg",
    alt: /hospital administrator in a blue blazer reviewing a governance dashboard/i,
  },
] as const;

/** Locates the framed ImagePanel figure that owns a given image. */
function figureFor(image: HTMLImageElement): HTMLElement {
  const figure = image.closest("figure") as HTMLElement | null;
  expect(figure).not.toBeNull();
  return figure as HTMLElement;
}

describe("SovereignDeploymentPage hero photo structure", () => {
  it("keeps a framed hero photograph with non-empty alt text", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    const hero = document.querySelector(
      SOVEREIGN_HERO_IMAGE_SELECTOR,
    ) as HTMLImageElement | null;
    expect(hero).not.toBeNull();
    expect(hero?.getAttribute("src")?.trim().length ?? 0).toBeGreaterThan(0);
    expect(hero?.getAttribute("alt")?.trim().length ?? 0).toBeGreaterThan(0);

    // The hero photo lives inside the shared framed ImagePanel.
    const figure = figureFor(hero as HTMLImageElement);
    expect(figure.className).toContain("border-hairline");
  });

  it("keeps the hero caption in a separate figcaption, never overlaid on the photo", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    const hero = document.querySelector(
      SOVEREIGN_HERO_IMAGE_SELECTOR,
    ) as HTMLImageElement;
    const figure = figureFor(hero);

    const caption = figure.querySelector("figcaption") as HTMLElement | null;
    expect(caption).not.toBeNull();
    expect(caption?.textContent?.trim().length ?? 0).toBeGreaterThan(0);
    expect(hero.contains(caption as Node)).toBe(false);
    expect((caption as HTMLElement).contains(hero)).toBe(false);
  });

  it("keeps the hero eyebrow, headline and both actions", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    expect(screen.getByText("Sovereign Deployment")).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);

    const getStarted = document.querySelector(
      '[data-ocid="sovereign.primary_button"]',
    ) as HTMLAnchorElement | null;
    const talkToTeam = document.querySelector(
      '[data-ocid="sovereign.secondary_button"]',
    ) as HTMLAnchorElement | null;
    expect(getStarted).toHaveAttribute(
      "href",
      "https://app.telemeetup.com/register",
    );
    expect(talkToTeam).toHaveAttribute("href", "/contact");
  });
});

describe("SovereignDeploymentPage Next step photo structure", () => {
  it("keeps a framed Next step photograph with non-empty alt text", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    const section = screen
      .getByRole("heading", { level: 2, name: NEXT_STEP_HEADING })
      .closest("section") as HTMLElement | null;
    expect(section).not.toBeNull();

    const image = within(section as HTMLElement).getByRole(
      "img",
    ) as HTMLImageElement;
    expect(image.getAttribute("src")?.trim().length ?? 0).toBeGreaterThan(0);
    expect(image.getAttribute("alt")?.trim().length ?? 0).toBeGreaterThan(0);

    const figure = figureFor(image);
    expect(figure.className).toContain("border-hairline");
  });

  it("keeps the Next step caption in a separate figcaption, never overlaid on the photo", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    const section = screen
      .getByRole("heading", { level: 2, name: NEXT_STEP_HEADING })
      .closest("section") as HTMLElement;
    const image = within(section).getByRole("img") as HTMLImageElement;
    const figure = figureFor(image);

    const caption = figure.querySelector("figcaption") as HTMLElement | null;
    expect(caption).not.toBeNull();
    expect(caption?.textContent?.trim().length ?? 0).toBeGreaterThan(0);
    expect(image.contains(caption as Node)).toBe(false);
    expect((caption as HTMLElement).contains(image)).toBe(false);
  });

  it("keeps the Next step actions pointing at contact and pricing", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    const contact = document.querySelector(
      '[data-ocid="sovereign.contact_button"]',
    ) as HTMLAnchorElement | null;
    const pricing = document.querySelector(
      '[data-ocid="sovereign.pricing_button"]',
    ) as HTMLAnchorElement | null;
    expect(contact).toHaveAttribute("href", "/contact");
    expect(pricing).toHaveAttribute("href", "/pricing");
  });
});

describe("SovereignDeploymentPage photo hygiene", () => {
  it("renders every image with non-empty alt text", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    const images = document.querySelectorAll("img");
    expect(images.length).toBeGreaterThanOrEqual(2);
    for (const image of images) {
      expect(image.getAttribute("alt")?.trim().length ?? 0).toBeGreaterThan(0);
    }
  });

  it("never falls back to the retired physician photo", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    for (const image of document.querySelectorAll("img")) {
      expect(image.getAttribute("src")).not.toBe(RETIRED_PHOTO_SRC);
    }
  });
});

describe("AiGovernancePage clinical photography is unchanged", () => {
  it("keeps each clinical photograph with its descriptive alt text", async () => {
    await renderWithRouter(<AiGovernancePage />);

    for (const { src, alt } of AI_GOVERNANCE_IMAGES) {
      const image = document.querySelector(
        `img[src="${src}"]`,
      ) as HTMLImageElement | null;
      expect(image).not.toBeNull();
      expect(image?.getAttribute("alt")).toMatch(alt);
    }
  });

  it("keeps every image in a framed panel with non-empty alt text", async () => {
    await renderWithRouter(<AiGovernancePage />);

    const images = document.querySelectorAll("img");
    expect(images.length).toBeGreaterThanOrEqual(AI_GOVERNANCE_IMAGES.length);
    for (const image of images) {
      expect(image.getAttribute("alt")?.trim().length ?? 0).toBeGreaterThan(0);
      const figure = image.closest("figure") as HTMLElement | null;
      expect(figure).not.toBeNull();
      expect(figure?.className).toContain("border-hairline");
    }
  });
});

describe("Sovereign and AI Governance photos stay distinct", () => {
  it("does not share a photograph between the two pages", async () => {
    const sovereignSources = new Set<string>();
    const governanceSources = new Set<string>();

    // Scope each page's images to its own render container: the shared setup
    // cleans up between tests, not between two renders inside one test.
    const sovereign = await renderWithRouter(<SovereignDeploymentPage />);
    for (const image of sovereign.container.querySelectorAll("img")) {
      const src = image.getAttribute("src");
      if (src) sovereignSources.add(src);
    }

    const governance = await renderWithRouter(<AiGovernancePage />);
    for (const image of governance.container.querySelectorAll("img")) {
      const src = image.getAttribute("src");
      if (src) governanceSources.add(src);
    }

    expect(sovereignSources.size).toBeGreaterThanOrEqual(2);
    expect(governanceSources.size).toBeGreaterThanOrEqual(3);
    for (const src of sovereignSources) {
      expect(governanceSources.has(src)).toBe(false);
    }
  });
});
