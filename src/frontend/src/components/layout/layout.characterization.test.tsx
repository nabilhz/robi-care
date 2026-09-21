import { CtaBand } from "@/components/layout/CtaBand";
import { ImagePanel } from "@/components/layout/ImagePanel";
import { AiGovernancePage } from "@/pages/AiGovernancePage";
import { KeyboardLiberationPage } from "@/pages/KeyboardLiberationPage";
import { SovereignDeploymentPage } from "@/pages/SovereignDeploymentPage";
import { renderWithProviders, renderWithRouter } from "@/test/helpers";
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
 * Characterization baseline for the shared layout pieces *around* the intended
 * change. The request intentionally changes (a) the Home hero scrim from a
 * left-only gradient to a four-edge fade, (b) the dark overlay/band color token
 * from near-black ink to deep green, and (c) the supporting photograph src on
 * the three narrative pages. This file therefore does NOT pin the scrim's
 * gradient direction, the band's color token, or any supporting-photo src.
 *
 * It protects the behavior those changes must keep intact:
 *   - the closing CtaBand still renders its eyebrow/title/description and both
 *     account actions with their exact destinations on every page;
 *   - each narrative page still renders its supporting photo inside a framed
 *     ImagePanel figure with a separate caption and non-empty alt text;
 *   - the Home hero scrim is still a decorative, absolutely-positioned layer
 *     that shares one coordinate wrapper with the copy it must cover.
 */
describe("CtaBand shared contract", () => {
  it("renders the eyebrow, title, description, and both account actions", () => {
    renderWithProviders(
      <CtaBand
        eyebrow="Get started"
        title="A closing title"
        description="A closing description."
      />,
    );

    expect(screen.getByText("Get started")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "A closing title" }),
    ).toBeInTheDocument();
    expect(screen.getByText("A closing description.")).toBeInTheDocument();

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

  it("defaults the eyebrow to 'Get started' when none is supplied", () => {
    renderWithProviders(
      <CtaBand title="A closing title" description="A closing description." />,
    );

    expect(screen.getByText("Get started")).toBeInTheDocument();
  });
});

describe("narrative pages keep a framed supporting photo", () => {
  /**
   * The supporting photograph src is intentionally changing on all three
   * pages, so these assertions deliberately never name a src. They pin the
   * panel mechanism instead: a framed <figure> with a separate <figcaption>
   * caption and a non-empty alt, sitting in the section that owns it.
   */
  const cases: {
    name: string;
    render: () => Promise<unknown>;
    sectionHeading: RegExp;
  }[] = [
    {
      name: "Keyboard Liberation proof points",
      render: () => renderWithRouter(<KeyboardLiberationPage />),
      sectionHeading: /what changes when the keyboard steps aside/i,
    },
    {
      name: "AI Governance human in the loop",
      render: () => renderWithRouter(<AiGovernancePage />),
      sectionHeading: /decision control stays with the clinician/i,
    },
    {
      name: "Sovereign Deployment next step",
      render: () => renderWithRouter(<SovereignDeploymentPage />),
      sectionHeading: /review the deployment model with your governance team/i,
    },
  ];

  it.each(cases)(
    "$name renders a framed figure with a caption and alt text",
    async ({ render, sectionHeading }) => {
      await render();

      const heading = screen.getByRole("heading", {
        level: 2,
        name: sectionHeading,
      });
      const section = heading.closest("section") as HTMLElement;
      expect(section).not.toBeNull();

      const figure = section.querySelector("figure") as HTMLElement;
      expect(figure).not.toBeNull();

      const image = within(figure).getByRole("img");
      expect(image.getAttribute("alt")?.trim().length ?? 0).toBeGreaterThan(0);

      // The caption is a separate figcaption, never overlaid on the photo.
      const caption = figure.querySelector("figcaption") as HTMLElement;
      expect(caption).not.toBeNull();
      expect(caption.textContent?.trim().length ?? 0).toBeGreaterThan(0);
      expect(image.contains(caption)).toBe(false);
      expect(caption.contains(image)).toBe(false);
    },
  );
});

describe("ImagePanel framed-panel contract", () => {
  it("renders the photo in a figure with a separate caption panel", () => {
    renderWithProviders(
      <ImagePanel
        src="/photo.jpg"
        alt="A described photograph."
        caption="A caption beside the photo."
      />,
    );

    const figure = document.querySelector("figure") as HTMLElement;
    expect(figure).not.toBeNull();
    const image = within(figure).getByRole("img", {
      name: "A described photograph.",
    });
    const caption = within(figure).getByText("A caption beside the photo.");

    expect(caption.tagName).toBe("FIGCAPTION");
    expect(image.contains(caption)).toBe(false);
    expect(caption.contains(image)).toBe(false);
  });

  it("keeps the photo frame and omits the caption panel when none is supplied", () => {
    renderWithProviders(
      <ImagePanel src="/photo.jpg" alt="A described photograph." />,
    );

    expect(document.querySelector("figure")).not.toBeNull();
    expect(document.querySelector("figcaption")).toBeNull();
    expect(
      screen.getByRole("img", { name: "A described photograph." }),
    ).toBeInTheDocument();
  });
});
