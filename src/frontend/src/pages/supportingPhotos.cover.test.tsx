import { HomeHero } from "@/components/home/HomeHero";
import { CtaBand } from "@/components/layout/CtaBand";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AiGovernancePage } from "@/pages/AiGovernancePage";
import { KeyboardLiberationPage } from "@/pages/KeyboardLiberationPage";
import { SovereignDeploymentPage } from "@/pages/SovereignDeploymentPage";
import { renderWithProviders, renderWithRouter } from "@/test/helpers";
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
 * Cover for the accepted supporting-photo change: the repeated physician photo
 * is gone from the Keyboard Liberation "Proof points", AI Governance "Human in
 * the loop", and Sovereign Deployment "Next step" sections, and each section
 * now shows its own distinct photograph inside the existing framed ImagePanel
 * with a caption and descriptive alt text.
 *
 * The three sections are located by their own section headings rather than by
 * document position, so the assertions survive unrelated page reordering.
 */
const SECTIONS = [
  {
    name: "Keyboard Liberation proof points",
    render: () => renderWithRouter(<KeyboardLiberationPage />),
    heading: /what changes when the keyboard steps aside/i,
    expectedSrc:
      "/assets/generated/keyboard-liberation-proof-points.dim_1536x1024.jpg",
  },
  {
    name: "AI Governance human in the loop",
    render: () => renderWithRouter(<AiGovernancePage />),
    heading: /decision control stays with the clinician/i,
    expectedSrc:
      "/assets/generated/ai-governance-human-in-the-loop.dim_1536x1024.jpg",
  },
  {
    name: "Sovereign Deployment next step",
    render: () => renderWithRouter(<SovereignDeploymentPage />),
    heading: /review the deployment model with your governance team/i,
    expectedSrc:
      "/assets/generated/sovereign-deployment-next-step.dim_1536x1024.jpg",
  },
] as const;

/** The photo the request removes from all three sections. */
const RETIRED_PHOTO_SRC =
  "/assets/generated/hero-clinical-room.dim_1536x1024.jpg";

describe("supporting photos are distinct per section", () => {
  it.each(SECTIONS)(
    "$name shows its own new photo in a framed panel with caption and alt",
    async ({ render, heading, expectedSrc }) => {
      await render();

      const section = screen
        .getByRole("heading", { level: 2, name: heading })
        .closest("section") as HTMLElement;
      expect(section).not.toBeNull();

      const figure = section.querySelector("figure") as HTMLElement;
      expect(figure).not.toBeNull();

      const image = within(figure).getByRole("img");
      expect(image).toHaveAttribute("src", expectedSrc);
      expect(image.getAttribute("alt")?.trim().length ?? 0).toBeGreaterThan(0);

      // The caption is a separate figcaption, never overlaid on the photo.
      const caption = figure.querySelector("figcaption") as HTMLElement;
      expect(caption).not.toBeNull();
      expect(caption.textContent?.trim().length ?? 0).toBeGreaterThan(0);
      expect(image.contains(caption)).toBe(false);
      expect(caption.contains(image)).toBe(false);
    },
  );

  it("does not reuse the retired physician photo in any of the three sections", async () => {
    for (const { render, heading } of SECTIONS) {
      await render();

      const section = screen
        .getByRole("heading", { level: 2, name: heading })
        .closest("section") as HTMLElement;
      const images = Array.from(section.querySelectorAll("img"));
      for (const image of images) {
        expect(image.getAttribute("src")).not.toBe(RETIRED_PHOTO_SRC);
      }
    }
  });

  it("uses three different photo sources across the three sections", async () => {
    const sources: string[] = [];

    for (const { render, heading } of SECTIONS) {
      await render();

      const section = screen
        .getByRole("heading", { level: 2, name: heading })
        .closest("section") as HTMLElement;
      const figure = section.querySelector("figure") as HTMLElement;
      const image = within(figure).getByRole("img");
      sources.push(image.getAttribute("src") ?? "");
    }

    expect(new Set(sources).size).toBe(SECTIONS.length);
  });
});

describe("deep-green dark surfaces", () => {
  it("renders the Home hero panel on the deep-green surface", async () => {
    await renderWithRouter(<HomeHero />);

    const hero = document.querySelector(
      '[data-ocid="home.hero"]',
    ) as HTMLElement;
    expect(hero).not.toBeNull();
    expect(hero.className).toContain("bg-deep-green");
    // The panel must not fall back to the near-black ink surface.
    expect(hero.className).not.toContain("bg-foreground");
  });

  it("renders the closing CtaBand on the deep-green surface", () => {
    renderWithProviders(
      <CtaBand title="A closing title" description="A closing description." />,
    );

    const band = screen
      .getByRole("heading", { level: 2, name: "A closing title" })
      .closest("section") as HTMLElement;
    expect(band).not.toBeNull();
    expect(band.className).toContain("bg-deep-green");
    expect(band.className).not.toContain("bg-foreground");
  });

  it("renders the site footer on the deep-green surface", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
    expect(footer).not.toBeNull();
    expect(footer.className).toContain("bg-deep-green");
    expect(footer.className).not.toContain("bg-foreground");
  });
});
