import { KeyboardLiberationPage } from "@/pages/KeyboardLiberationPage";
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
 * Characterization baseline for the Keyboard Liberation sections named in the
 * accepted requirements that the sibling characterization file does not pin:
 * the intro section, the workflow section heading and diagram, and the four
 * "how it works" step cards. The accepted change rewrites the intro/workflow
 * copy intentionally, so this file protects the section structure, the step
 * card contract, and the section ordering rather than freezing the copy that
 * is expected to change. It deliberately does not re-assert the hero, the
 * BeforeAfter comparison, the proof points, or the CtaBand, which
 * KeyboardLiberationPage.characterization.test.tsx already covers.
 */
describe("KeyboardLiberationPage intro section", () => {
  it("keeps the intro section anchored and paired with a heading and photo", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    const intro = document.querySelector(
      "#keyboard-liberation-intro",
    ) as HTMLElement;
    expect(intro).not.toBeNull();

    // The intro is a real section with a level-2 heading and a described photo.
    expect(
      within(intro).getByRole("heading", { level: 2 }),
    ).toBeInTheDocument();
    const photo = within(intro).getByRole("img");
    expect(photo.getAttribute("alt")?.trim().length ?? 0).toBeGreaterThan(0);
  });

  it("keeps the intro section between the hero and the workflow section", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    const hero = screen.getByRole("heading", { level: 1 });
    const intro = document.querySelector(
      "#keyboard-liberation-intro",
    ) as HTMLElement;
    const workflow = document.querySelector(
      "#keyboard-liberation-workflow",
    ) as HTMLElement;

    for (const node of [hero, intro, workflow]) {
      expect(node).not.toBeNull();
    }

    const ordered = [hero, intro, workflow];
    for (let i = 1; i < ordered.length; i += 1) {
      expect(
        ordered[i - 1].compareDocumentPosition(ordered[i]) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    }
  });
});

describe("KeyboardLiberationPage workflow section", () => {
  it("keeps the workflow section anchored with its heading and diagram", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    const workflow = document.querySelector(
      "#keyboard-liberation-workflow",
    ) as HTMLElement;
    expect(workflow).not.toBeNull();

    expect(
      within(workflow).getByRole("heading", { level: 2 }),
    ).toBeInTheDocument();
    expect(
      within(workflow).getByRole("list", { name: "" }),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-ocid="keyboard.workflow.list"]'),
    ).not.toBeNull();
  });

  it("keeps the workflow section on the raised navy band", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    const workflow = document.querySelector(
      "#keyboard-liberation-workflow",
    ) as HTMLElement;
    expect(workflow.className).toContain("bg-section-alt");
  });
});

describe("KeyboardLiberationPage step cards", () => {
  const STEP_TITLES = ["Capture", "Structure", "Review", "Record"] as const;

  it("keeps four step cards in order with their titles and descriptions", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    const cards = STEP_TITLES.map(
      (_, index) =>
        document.querySelector(
          `[data-ocid="keyboard.step.${index + 1}"]`,
        ) as HTMLElement,
    );
    for (const card of cards) {
      expect(card).not.toBeNull();
    }

    STEP_TITLES.forEach((title, index) => {
      const card = cards[index];
      expect(
        within(card).getByRole("heading", { level: 3, name: title }),
      ).toBeInTheDocument();
      expect(within(card).getByText(`Step ${index + 1}`)).toBeInTheDocument();
      // Each card carries a non-empty description beneath its title.
      const description = within(card)
        .getAllByText(/.+/)
        .map((node) => node.textContent?.trim() ?? "")
        .filter((text) => text.length > 0 && text !== title);
      expect(description.length).toBeGreaterThan(0);
    });
  });

  it("keeps the step cards in ascending document order", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    const cards = STEP_TITLES.map(
      (_, index) =>
        document.querySelector(
          `[data-ocid="keyboard.step.${index + 1}"]`,
        ) as HTMLElement,
    );

    for (let i = 1; i < cards.length; i += 1) {
      expect(
        cards[i - 1].compareDocumentPosition(cards[i]) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    }
  });
});
