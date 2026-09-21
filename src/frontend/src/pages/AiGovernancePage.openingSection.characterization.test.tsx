import { AiGovernancePage } from "@/pages/AiGovernancePage";
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

/**
 * Characterization baseline for the AI Governance page *around* the intended
 * change: a new opening section is being inserted after the PageHero and before
 * the first existing Section. This file deliberately does NOT pin the position
 * of the first section or the total section count, because those legitimately
 * change. It protects the invariants that must survive the insertion:
 *
 *   - the hero stays the first content block, above every existing section;
 *   - the existing detailed sections keep their relative order among
 *     themselves, so the new opening section cannot displace or reorder them;
 *   - the existing detailed content is still present below the hero.
 *
 * Ordering is asserted with `compareDocumentPosition`, which is insensitive to
 * how many new siblings are inserted around the existing ones.
 */
function precedes(first: Element, second: Element): boolean {
  const position = first.compareDocumentPosition(second);
  return (position & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
}

const EXISTING_SECTION_HEADINGS = [
  "Four commitments that shape how the system behaves",
  "The rules the system is held to",
  "How a request is governed end to end",
  "Governance that can be inspected, not just asserted",
  "Decision control stays with the clinician",
  "Patient information, handled deliberately",
  "Governance questions, answered plainly",
];

describe("AiGovernancePage opening-section insertion invariants", () => {
  it("keeps the hero h1 above every existing detailed section", async () => {
    await renderWithRouter(<AiGovernancePage />);

    const h1 = screen.getByRole("heading", { level: 1 });
    for (const name of EXISTING_SECTION_HEADINGS) {
      const heading = screen.getByRole("heading", { level: 2, name });
      expect(precedes(h1, heading)).toBe(true);
    }
  });

  it("keeps the existing detailed sections in their original relative order", async () => {
    await renderWithRouter(<AiGovernancePage />);

    const headings = EXISTING_SECTION_HEADINGS.map((name) =>
      screen.getByRole("heading", { level: 2, name }),
    );

    for (let i = 1; i < headings.length; i += 1) {
      expect(precedes(headings[i - 1], headings[i])).toBe(true);
    }
  });

  it("keeps the existing detailed content present below the hero", async () => {
    await renderWithRouter(<AiGovernancePage />);

    const h1 = screen.getByRole("heading", { level: 1 });

    // A representative marker from each existing detailed section.
    const markers = [
      screen.getByRole("heading", { level: 3, name: "Clinician oversight" }),
      screen.getByRole("heading", { level: 3, name: "Review before use" }),
      screen.getByRole("heading", { level: 3, name: "Transparency of output" }),
      screen.getByRole("heading", {
        level: 3,
        name: "Deliberate data handling",
      }),
      screen.getByRole("heading", {
        level: 3,
        name: "Purpose-limited processing",
      }),
      screen.getByRole("heading", {
        level: 3,
        name: "Clinic-controlled policy",
      }),
      screen.getByRole("heading", { level: 3, name: "Deployment specifics" }),
    ];

    for (const marker of markers) {
      expect(precedes(h1, marker)).toBe(true);
    }
  });

  it("keeps the governance principles list and fail-safe note below the hero", async () => {
    await renderWithRouter(<AiGovernancePage />);

    const h1 = screen.getByRole("heading", { level: 1 });
    const principlesList = document.querySelector(
      '[data-ocid="governance.principles_list"]',
    );
    const failsafeNote = document.querySelector(
      '[data-ocid="governance.failsafe_note"]',
    );

    expect(principlesList).not.toBeNull();
    expect(failsafeNote).not.toBeNull();
    expect(precedes(h1, principlesList as Element)).toBe(true);
    expect(precedes(h1, failsafeNote as Element)).toBe(true);
  });
});
