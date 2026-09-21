import { AudienceSection } from "@/components/home/AudienceSection";
import { HOME_AUDIENCES, HOME_SAFETY_BANNER } from "@/lib/site";
import { HomePage } from "@/pages/HomePage";
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
 * Accepted behavior for the new Home audience section: five audience cards
 * directly below the hero, each with an icon, a short label and one line of
 * value proposition, followed by the exact safety banner. The section must sit
 * between the hero and the existing "How it works" section without disturbing
 * the sections below it.
 */
describe("AudienceSection", () => {
  it("renders exactly five audience cards", async () => {
    await renderWithRouter(<AudienceSection />);

    const section = document.querySelector("#audiences") as HTMLElement;
    expect(section).not.toBeNull();

    const items = section.querySelectorAll(
      '[data-ocid^="home.audiences.item."]',
    );
    expect(items).toHaveLength(5);
  });

  it("renders each card's label and one-line value proposition", async () => {
    await renderWithRouter(<AudienceSection />);

    const section = document.querySelector("#audiences") as HTMLElement;
    expect(section).not.toBeNull();

    for (const audience of HOME_AUDIENCES) {
      const card = section.querySelector(
        `[data-ocid="home.audiences.item.${audience.id}"]`,
      ) as HTMLElement;
      expect(card).not.toBeNull();
      expect(
        within(card).getByRole("heading", { level: 3, name: audience.label }),
      ).toBeInTheDocument();
      expect(within(card).getByText(audience.value)).toBeInTheDocument();
    }
  });

  it("gives every card a decorative icon and no text over an image", async () => {
    await renderWithRouter(<AudienceSection />);

    const section = document.querySelector("#audiences") as HTMLElement;
    const cards = section.querySelectorAll(
      '[data-ocid^="home.audiences.item."]',
    );
    expect(cards).toHaveLength(5);

    for (const card of cards) {
      // Each card carries a decorative icon (aria-hidden svg), not a photo.
      const icon = card.querySelector('svg[aria-hidden="true"]');
      expect(icon).not.toBeNull();
      // No image inside a card, so no text can sit over a photo.
      expect(card.querySelector("img")).toBeNull();
    }
  });

  it("renders the exact safety banner below the cards", async () => {
    await renderWithRouter(<AudienceSection />);

    const banner = document.querySelector(
      '[data-ocid="home.safety_banner"]',
    ) as HTMLElement;
    expect(banner).not.toBeNull();
    expect(
      within(banner).getByText(
        "AI-assisted, clinician-controlled. Robi Care prepares information for professional review; it does not replace clinical judgment.",
      ),
    ).toBeInTheDocument();

    // The banner follows the card list in document order.
    const list = document.querySelector("#audiences ul") as HTMLElement;
    expect(list).not.toBeNull();
    expect(
      list.compareDocumentPosition(banner) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("keeps the site constants in sync with the rendered section", () => {
    expect(HOME_AUDIENCES).toHaveLength(5);
    expect(HOME_AUDIENCES.map((audience) => audience.label)).toEqual([
      "Physicians and Medical Personnel",
      "Nursing Teams",
      "Emergency Departments",
      "EMS Organizations",
      "Clinics and Hospital Administrators",
    ]);
    expect(HOME_SAFETY_BANNER).toBe(
      "AI-assisted, clinician-controlled. Robi Care prepares information for professional review; it does not replace clinical judgment.",
    );
  });
});

describe("HomePage audience placement", () => {
  it("places the audience section directly below the hero and above How it works", async () => {
    await renderWithRouter(<HomePage />);

    const hero = document.querySelector(
      '[data-ocid="home.hero"]',
    ) as HTMLElement;
    const audiences = document.querySelector("#audiences") as HTMLElement;
    const howItWorks = document.querySelector("#how-it-works") as HTMLElement;

    for (const node of [hero, audiences, howItWorks]) {
      expect(node).not.toBeNull();
    }

    // hero -> audiences -> how-it-works, in that document order.
    expect(
      hero.compareDocumentPosition(audiences) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      audiences.compareDocumentPosition(howItWorks) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("keeps the existing sections below the audience section in order", async () => {
    await renderWithRouter(<HomePage />);

    const audiences = document.querySelector("#audiences") as HTMLElement;
    const clinicianControl = document.querySelector(
      "#clinician-control",
    ) as HTMLElement;
    const platform = document.querySelector("#platform") as HTMLElement;
    const ctaBand = document.querySelector(
      '[data-ocid="cta.primary_button"]',
    ) as HTMLElement;

    for (const node of [audiences, clinicianControl, platform, ctaBand]) {
      expect(node).not.toBeNull();
    }

    const ordered = [audiences, clinicianControl, platform, ctaBand];
    for (let i = 1; i < ordered.length; i += 1) {
      expect(
        ordered[i - 1].compareDocumentPosition(ordered[i]) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    }
  });
});
