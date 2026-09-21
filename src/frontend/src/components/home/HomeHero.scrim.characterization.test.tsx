import { HomeHero } from "@/components/home/HomeHero";
import { HOME_HERO_COPY, HOME_HERO_CTAS, HOME_HERO_IMAGE } from "@/lib/site";
import { renderWithRouter } from "@/test/helpers";
import { screen } from "@testing-library/react";
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
 * Characterization baseline for the Home hero *around* the intended scrim
 * change. The scrim is intentionally moving from a left-only gradient to a
 * gradient that fades on all four edges, so this file deliberately does NOT
 * pin the gradient direction or its `from`/`via`/`to` stops. It protects the
 * invariants the four-edge fade must keep intact: the hero still renders its
 * photograph, headline, supporting copy, and three CTAs; the scrim is still a
 * decorative, absolutely-positioned layer; and the scrim still shares one
 * coordinate wrapper with the copy it must cover.
 */
describe("HomeHero scrim containment", () => {
  it("keeps the scrim as a decorative, absolutely-positioned layer", async () => {
    await renderWithRouter(<HomeHero />);

    const hero = document.querySelector(
      '[data-ocid="home.hero"]',
    ) as HTMLElement;
    expect(hero).not.toBeNull();

    const scrim = hero.querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(scrim).not.toBeNull();
    expect(scrim.className).toContain("absolute");
    // The scrim is decorative and must never intercept pointer events.
    expect(scrim.className).toContain("pointer-events-none");
  });

  it("keeps the scrim and the copy in one shared coordinate wrapper", async () => {
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

  it("keeps the hero photograph, headline, supporting copy, and three CTAs", async () => {
    await renderWithRouter(<HomeHero />);

    const image = screen.getByRole("img", { name: HOME_HERO_IMAGE.alt });
    expect(image).toHaveAttribute("src", HOME_HERO_IMAGE.src);

    // The copy values are intentionally changing, so assert the rendered text
    // matches the site constants rather than pinning the literal strings.
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: HOME_HERO_COPY.headline,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(HOME_HERO_COPY.supporting)).toBeInTheDocument();

    const hero = document.querySelector(
      '[data-ocid="home.hero"]',
    ) as HTMLElement;
    for (const cta of HOME_HERO_CTAS) {
      expect(screen.getByRole("link", { name: cta.label })).toBeInTheDocument();
    }
    expect(hero.querySelectorAll("a")).toHaveLength(HOME_HERO_CTAS.length);
  });
});
