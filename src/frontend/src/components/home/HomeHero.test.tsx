import { HomeHero } from "@/components/home/HomeHero";
import { HOME_HERO_COPY, HOME_HERO_CTAS, HOME_HERO_IMAGE } from "@/lib/site";
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
 * Accepted behavior for the Home hero copy change. The headline, eyebrow,
 * supporting text and CTA labels are pinned to their exact accepted strings,
 * and the hero renders exactly two CTAs with their accepted variants and
 * destinations. The invariants the copy update must keep intact are also
 * protected here: the hero still renders the accepted consultation photograph,
 * a single h1 and supporting paragraph sourced from the site constants, and
 * the decorative left-confined scrim.
 */
describe("HomeHero", () => {
  it("renders the accepted headline as the page h1", async () => {
    await renderWithRouter(<HomeHero />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("More presence. Less paperwork.");
    expect(HOME_HERO_COPY.headline).toBe("More presence. Less paperwork.");
  });

  it("renders the GOVERNED CLINICAL AI eyebrow above the headline", async () => {
    await renderWithRouter(<HomeHero />);

    const eyebrow = screen.getByText("GOVERNED CLINICAL AI");
    expect(eyebrow).toBeInTheDocument();
    expect(HOME_HERO_COPY.eyebrow).toBe("GOVERNED CLINICAL AI");

    // The eyebrow precedes the h1 in document order.
    const heading = screen.getByRole("heading", { level: 1 });
    expect(
      eyebrow.compareDocumentPosition(heading) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("renders the exact accepted supporting text below the headline", async () => {
    await renderWithRouter(<HomeHero />);

    const supporting =
      "Robi Care helps healthcare professionals capture, structure and review clinical information—while keeping qualified clinicians in control of patient-care decisions.";
    expect(screen.getByText(supporting)).toBeInTheDocument();
    expect(HOME_HERO_COPY.supporting).toBe(supporting);
    // The em dash is part of the accepted copy, not a hyphen.
    expect(supporting).toContain("information—while");
  });

  it("renders exactly two CTAs with their accepted labels, variants and destinations", async () => {
    await renderWithRouter(<HomeHero />);

    const hero = document.querySelector(
      '[data-ocid="home.hero"]',
    ) as HTMLElement;
    expect(hero).not.toBeNull();

    // Exactly the two accepted CTAs, no more and no fewer.
    expect(within(hero).getAllByRole("link")).toHaveLength(2);
    expect(HOME_HERO_CTAS).toHaveLength(2);

    const primary = within(hero).getByRole("link", {
      name: "Sign Up",
    });
    expect(primary).toHaveAttribute("href", "/signup");
    expect(primary.className).toContain("btn-primary");

    const outline = within(hero).getByRole("link", {
      name: "Explore clinical solutions",
    });
    expect(outline).toHaveAttribute("href", "/solutions");
    expect(outline.className).toContain("btn-secondary");

    // The two accepted variants are present exactly once each.
    expect(HOME_HERO_CTAS.map((cta) => cta.variant).sort()).toEqual([
      "outline",
      "primary",
    ]);
    expect(
      hero.querySelector('[data-ocid="home.hero.cta.primary"]'),
    ).not.toBeNull();
    expect(
      hero.querySelector('[data-ocid="home.hero.cta.outline"]'),
    ).not.toBeNull();
  });

  it("renders the accepted consultation photograph with descriptive alt text", async () => {
    await renderWithRouter(<HomeHero />);

    const image = screen.getByRole("img", { name: HOME_HERO_IMAGE.alt });
    expect(image).toHaveAttribute("src", HOME_HERO_IMAGE.src);
    expect(image.getAttribute("alt")?.trim().length ?? 0).toBeGreaterThan(0);
    expect(HOME_HERO_IMAGE.src).toContain("hero-eye-contact-consultation");
  });

  it("fades the deep-green scrim into the photograph on all four edges", async () => {
    await renderWithRouter(<HomeHero />);

    const hero = document.querySelector(
      '[data-ocid="home.hero"]',
    ) as HTMLElement;
    const scrim = hero.querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(scrim).not.toBeNull();

    // A left-to-right deep-green gradient that fades to transparent, so the
    // right side of the photograph stays uncovered.
    expect(scrim.className).toContain("bg-gradient-to-r");
    expect(scrim.className).toContain("from-deep-green");
    expect(scrim.className).toContain("via-deep-green");
    expect(scrim.className).toContain("to-transparent");
    // A vertical mask feathers the same layer's top and bottom edges, so the
    // panel dissolves into the photo instead of ending on a hard straight line.
    expect(scrim.className).toContain("mask-image");
    expect(scrim.className).toContain("to_bottom");
    // The scrim is a decorative layer, never a full-bleed overlay on the photo.
    expect(scrim.className).toContain("absolute");
    expect(scrim.className).not.toContain("inset-0");
  });

  it("keeps the copy and CTAs inside the scrim's coordinate wrapper", async () => {
    await renderWithRouter(<HomeHero />);

    const hero = document.querySelector(
      '[data-ocid="home.hero"]',
    ) as HTMLElement;
    const scrim = hero.querySelector('[aria-hidden="true"]') as HTMLElement;
    const headline = screen.getByRole("heading", { level: 1 });
    const cta = screen.getByRole("link", { name: HOME_HERO_CTAS[0].label });

    // The scrim and the copy share one relative wrapper, so the opaque plateau
    // is defined relative to the text and cannot under-cover it.
    const wrapper = scrim.parentElement as HTMLElement;
    expect(wrapper.contains(headline)).toBe(true);
    expect(wrapper.contains(cta)).toBe(true);
  });

  it("keeps the site constants shaped for the rendered hero", () => {
    // The accepted copy and CTA contract are frozen here.
    expect(typeof HOME_HERO_COPY.headline).toBe("string");
    expect(typeof HOME_HERO_COPY.supporting).toBe("string");
    expect(HOME_HERO_COPY.eyebrow).toBe("GOVERNED CLINICAL AI");
    expect(HOME_HERO_CTAS.map((cta) => cta.to)).toEqual([
      "/signup",
      "/solutions",
    ]);
    expect(HOME_HERO_CTAS.map((cta) => cta.variant)).toEqual([
      "primary",
      "outline",
    ]);
    expect(HOME_HERO_CTAS.map((cta) => cta.label)).toEqual([
      "Sign Up",
      "Explore clinical solutions",
    ]);
  });
});
