import { HomePage } from "@/pages/HomePage";
import { SolutionsPage } from "@/pages/SolutionsPage";
import { SovereignDeploymentPage } from "@/pages/SovereignDeploymentPage";
import { renderWithRouter } from "@/test/helpers";
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
 * Characterization baseline for the accepted two-photo swap.
 *
 * The request intentionally replaces exactly two photographs:
 *   - the Home hero image, and
 *   - the Solutions "Conversation capture" card image.
 *
 * This file therefore deliberately does NOT pin either of those two images'
 * `src` or alt text — that is the behavior allowed to change. It protects the
 * surrounding photography that must survive the swap:
 *
 *   - the Sovereign AI hospital ward photograph (the explicit "must not
 *     change" image) keeps its exact source and its ward alt text;
 *   - every other Solutions photograph keeps its exact source and alt text;
 *   - the two swapped images are distinct from every other photograph on the
 *     site, so the swap cannot accidentally duplicate an existing asset;
 *   - every image on the affected pages still carries non-empty alt text.
 */

/** The Sovereign AI hospital ward photo, which must not change. */
const SOVEREIGN_WARD_PHOTO = {
  src: "/assets/generated/sovereign-deployment-in-country-hosting.dim_1536x1024.jpg",
  alt: "A group consultation in a bright hospital ward: a physician in a white coat, a nurse in blue scrubs and a seated clinician gather around a patient's bed to review a chart together, with a vital-signs monitor beside the bed.",
};

/** The Solutions photographs the request does not touch. */
const UNCHANGED_SOLUTIONS_PHOTOS = [
  {
    src: "/assets/generated/solutions-hero-clinic-team.dim_1536x1024.jpg",
    alt: "Two clinicians reviewing patient information together at a bright clinic workstation.",
  },
  {
    src: "/assets/generated/solution-structured-documentation.dim_1536x1024.jpg",
    alt: "A laptop on a tidy desk showing a structured clinical note beside a stethoscope and notebook.",
  },
  {
    src: "/assets/generated/solution-follow-up-coordination.dim_1536x1024.jpg",
    alt: "A clinician reviewing an appointment schedule on a wall-mounted screen in a modern clinic corridor.",
  },
  {
    src: "/assets/generated/audience-nurse-handover.dim_1536x1024.jpg",
    alt: "Healthcare staff in scrubs reviewing notes together during a handover briefing in a bright hospital corridor.",
  },
  {
    src: "/assets/generated/audience-ems-field-handover.dim_1536x1024.jpg",
    alt: "Paramedics in high-visibility jackets handing over a patient report to receiving clinicians outside a hospital emergency bay.",
  },
] as const;

/** The two images the request intentionally replaces. */
const SWAPPED_IMAGE_SRCS = [
  "/assets/generated/hero-eye-contact-consultation.dim_1920x1080.jpg",
  "/assets/generated/solution-conversation-capture.dim_1536x1024.jpg",
] as const;

function imageSources(root: ParentNode): string[] {
  return Array.from(root.querySelectorAll("img"))
    .map((image) => image.getAttribute("src") ?? "")
    .filter((src) => src.length > 0);
}

describe("Sovereign AI hospital ward photo is unchanged", () => {
  it("keeps the exact ward photograph and its descriptive alt text", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    const image = document.querySelector(
      `img[src="${SOVEREIGN_WARD_PHOTO.src}"]`,
    ) as HTMLImageElement | null;
    expect(image).not.toBeNull();
    expect(image?.getAttribute("alt")).toBe(SOVEREIGN_WARD_PHOTO.alt);
  });

  it("does not reuse either swapped image on the Sovereign AI page", async () => {
    const { container } = await renderWithRouter(<SovereignDeploymentPage />);

    for (const src of imageSources(container)) {
      expect(SWAPPED_IMAGE_SRCS).not.toContain(src);
    }
  });
});

describe("Solutions photographs other than Conversation capture are unchanged", () => {
  it.each(UNCHANGED_SOLUTIONS_PHOTOS)(
    "keeps $src with its exact alt text",
    async ({ src, alt }) => {
      await renderWithRouter(<SolutionsPage />);

      const image = document.querySelector(
        `img[src="${src}"]`,
      ) as HTMLImageElement | null;
      expect(image).not.toBeNull();
      expect(image?.getAttribute("alt")).toBe(alt);
    },
  );

  it("renders every unchanged Solutions photograph exactly once", async () => {
    const { container } = await renderWithRouter(<SolutionsPage />);
    const sources = imageSources(container);

    for (const { src } of UNCHANGED_SOLUTIONS_PHOTOS) {
      expect(sources.filter((candidate) => candidate === src)).toHaveLength(1);
    }
  });
});

describe("the two swapped images stay distinct from the rest of the site", () => {
  it("does not duplicate a swapped image source on the Home page", async () => {
    const { container } = await renderWithRouter(<HomePage />);
    const sources = imageSources(container);

    // The Home page renders exactly one photograph (the hero), so neither
    // swapped source may appear more than once.
    for (const src of SWAPPED_IMAGE_SRCS) {
      expect(
        sources.filter((candidate) => candidate === src).length,
      ).toBeLessThanOrEqual(1);
    }
  });

  it("does not duplicate a swapped image source on the Solutions page", async () => {
    const { container } = await renderWithRouter(<SolutionsPage />);
    const sources = imageSources(container);

    for (const src of SWAPPED_IMAGE_SRCS) {
      expect(
        sources.filter((candidate) => candidate === src).length,
      ).toBeLessThanOrEqual(1);
    }
  });

  it("keeps the swapped images distinct from every unchanged Solutions photo", async () => {
    const { container } = await renderWithRouter(<SolutionsPage />);
    const sources = imageSources(container);
    const unchanged = UNCHANGED_SOLUTIONS_PHOTOS.map((photo) => photo.src);

    for (const src of SWAPPED_IMAGE_SRCS) {
      expect(unchanged).not.toContain(src);
    }
    // Every rendered source is either a swapped image or an unchanged one.
    for (const src of sources) {
      expect([...SWAPPED_IMAGE_SRCS, ...unchanged]).toContain(src);
    }
  });
});

describe("affected pages keep non-empty alt text on every image", () => {
  it.each([
    { name: "Home", element: <HomePage /> },
    { name: "Solutions", element: <SolutionsPage /> },
  ])(
    "$name renders every image with non-empty alt text",
    async ({ element }) => {
      await renderWithRouter(element);

      const images = Array.from(document.querySelectorAll("img"));
      expect(images.length).toBeGreaterThanOrEqual(1);
      for (const image of images) {
        expect(image.getAttribute("alt")?.trim().length ?? 0).toBeGreaterThan(
          0,
        );
      }
    },
  );
});
