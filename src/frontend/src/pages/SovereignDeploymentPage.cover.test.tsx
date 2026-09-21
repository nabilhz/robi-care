import { SovereignDeploymentPage } from "@/pages/SovereignDeploymentPage";
import { renderWithRouter } from "@/test/helpers";
import { screen } from "@testing-library/react";
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

const HEADLINE = "Healthcare enablement operated within the country it serves.";

/**
 * The verbatim SAAAS Platform for Sovereign AI body text accepted for the
 * Sovereign Deployment main content area. Pinned as a single string so a
 * partial rewrite of the managed in-country deployment copy fails here.
 */
const SAAAS_BODY_TEXT =
  "Robi Care is available as a managed service, deployed in-country through the SAAAS Platform for Sovereign AI — economical, readily accessible and built for democratized access. Deployment options include locally selected or approved sovereign hosting, local data-residency configuration, jurisdiction-specific retention and consent policies, approved model routing, local language and clinical-document formats, in-country support, and transparent metering and institutional reporting.";

const HERO_IMAGE_SRC =
  "/assets/generated/sovereign-deployment-in-country-hosting.dim_1536x1024.jpg";

/**
 * Cover for the accepted Sovereign Deployment hero change: the new headline,
 * the verbatim SAAAS body copy, and the in-country hosting hero photograph.
 * The characterization file protects the surrounding page and shell; this file
 * pins only the behavior the request intentionally changed.
 */
describe("SovereignDeploymentPage accepted hero content", () => {
  it("shows the accepted headline in the main content area", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: HEADLINE }),
    ).toBeInTheDocument();
  });

  it("shows the verbatim SAAAS Platform for Sovereign AI body text", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    expect(screen.getByText(SAAAS_BODY_TEXT)).toBeInTheDocument();
  });

  it("renders the in-country hosting hero photo with clinical alt text", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    const hero = document.querySelector(
      `img[src="${HERO_IMAGE_SRC}"]`,
    ) as HTMLImageElement | null;
    expect(hero).not.toBeNull();
    expect(hero?.getAttribute("alt")?.trim().length ?? 0).toBeGreaterThan(0);
    // The accepted change replaces the data-center photograph with clinical
    // imagery, so the alt text must describe a human clinical setting and must
    // no longer describe a data center or server room.
    expect(hero?.getAttribute("alt")).toMatch(
      /hospital ward|patient room|consultation office|clinic/i,
    );
    expect(hero?.getAttribute("alt")).not.toMatch(
      /data-?cent(er|re)|server|rack/i,
    );
  });

  it("keeps the map overlay out of the body copy and off the photo subject", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    // The map overlay is a separate corner element inside the hero photograph,
    // not a DOM node layered over the copy or the photo subject. Assert no
    // element with map/overlay semantics is rendered as a sibling overlay over
    // the body text.
    const body = screen.getByText(SAAAS_BODY_TEXT);
    expect(body.querySelector("[class*='overlay'], [class*='map']")).toBeNull();

    // The hero image itself carries the corner map overlay; the page must not
    // add a second absolutely-positioned overlay over the photograph.
    const hero = document.querySelector(
      `img[src="${HERO_IMAGE_SRC}"]`,
    ) as HTMLImageElement;
    const figure = hero.closest("figure") as HTMLElement;
    expect(figure).not.toBeNull();
    const overlays = figure.querySelectorAll(
      "[class*='absolute'], [class*='overlay']",
    );
    expect(overlays).toHaveLength(0);
  });
});
