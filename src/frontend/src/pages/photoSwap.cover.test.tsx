import { HomeHero } from "@/components/home/HomeHero";
import { HOME_HERO_IMAGE } from "@/lib/site";
import { SolutionsPage } from "@/pages/SolutionsPage";
import { SovereignDeploymentPage } from "@/pages/SovereignDeploymentPage";
import { renderWithRouter } from "@/test/helpers";
import { screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({
    actor: {
      submitContactEnquiry: vi.fn(async () => ({ __kind: "ok", ok: 1n })),
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
 * Cover for the accepted two-photo swap.
 *
 * The request replaces exactly two photographs and their alt text:
 *   - the Home hero image, now a physician examining a young child's ear with
 *     an otoscope, and
 *   - the Solutions "Conversation capture" card image, now a physician
 *     attending to a toddler on an exam table.
 *
 * Both keep their existing asset paths and rendered aspect ratios. Every other
 * photograph, including the Sovereign AI hospital ward photo, must not change.
 * The surrounding invariants are protected by
 * `photoSwapInvariants.characterization.test.tsx`; this file pins only the
 * behavior the request intentionally changed, plus the explicit "must not
 * change" ward photo.
 */

/** The new Home hero photograph and its accepted alt text. */
const NEW_HOME_HERO = {
  src: "/assets/generated/hero-eye-contact-consultation.dim_1920x1080.jpg",
  alt: "A physician examining a young child's ear with an otoscope, with the child's mother present and a colleague nearby, in a clinic exam room.",
};

/** The new Solutions Conversation capture photograph and its accepted alt text. */
const NEW_CONVERSATION_CAPTURE = {
  src: "/assets/generated/solution-conversation-capture.dim_1536x1024.jpg",
  alt: "A physician attending to a toddler seated on an exam table, with a colleague present.",
};

/** The Sovereign AI hospital ward photo, which must not change. */
const SOVEREIGN_WARD_PHOTO = {
  src: "/assets/generated/sovereign-deployment-in-country-hosting.dim_1536x1024.jpg",
  alt: "A group consultation in a bright hospital ward: a physician in a white coat, a nurse in blue scrubs and a seated clinician gather around a patient's bed to review a chart together, with a vital-signs monitor beside the bed.",
};

describe("Home hero shows the new otoscope ear-examination photograph", () => {
  it("renders the new photo at the existing hero path with the accepted alt text", async () => {
    await renderWithRouter(<HomeHero />);

    const image = screen.getByRole("img", { name: NEW_HOME_HERO.alt });
    expect(image).toHaveAttribute("src", NEW_HOME_HERO.src);
    expect(image.getAttribute("alt")).toBe(NEW_HOME_HERO.alt);
  });

  it("keeps the hero photograph at its existing 1920x1080 aspect ratio", async () => {
    await renderWithRouter(<HomeHero />);

    const image = screen.getByRole("img", { name: NEW_HOME_HERO.alt });
    expect(image).toHaveAttribute("width", "1920");
    expect(image).toHaveAttribute("height", "1080");
  });

  it("sources the hero image from the site constant", () => {
    expect(HOME_HERO_IMAGE.src).toBe(NEW_HOME_HERO.src);
    expect(HOME_HERO_IMAGE.alt).toBe(NEW_HOME_HERO.alt);
  });
});

describe("Solutions Conversation capture shows the new toddler exam-table photograph", () => {
  it("renders the new photo at the existing path with the accepted alt text", async () => {
    await renderWithRouter(<SolutionsPage />);

    const card = document.querySelector(
      '[data-ocid="solutions.card.conversation-capture"]',
    ) as HTMLElement | null;
    expect(card).not.toBeNull();

    const image = within(card as HTMLElement).getByRole("img", {
      name: NEW_CONVERSATION_CAPTURE.alt,
    });
    expect(image).toHaveAttribute("src", NEW_CONVERSATION_CAPTURE.src);
    expect(image.getAttribute("alt")).toBe(NEW_CONVERSATION_CAPTURE.alt);
  });

  it("keeps the Conversation capture photograph at its existing 4/3 aspect ratio", async () => {
    await renderWithRouter(<SolutionsPage />);

    const card = document.querySelector(
      '[data-ocid="solutions.card.conversation-capture"]',
    ) as HTMLElement | null;
    const image = within(card as HTMLElement).getByRole("img", {
      name: NEW_CONVERSATION_CAPTURE.alt,
    });
    expect(image.className).toContain("aspect-[4/3]");
  });
});

describe("the Sovereign AI hospital ward photograph is unchanged", () => {
  it("keeps the exact ward photo source and alt text", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    const image = document.querySelector(
      `img[src="${SOVEREIGN_WARD_PHOTO.src}"]`,
    ) as HTMLImageElement | null;
    expect(image).not.toBeNull();
    expect(image?.getAttribute("alt")).toBe(SOVEREIGN_WARD_PHOTO.alt);
  });
});
