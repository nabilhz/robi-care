import { SovereignDeploymentPage } from "@/pages/SovereignDeploymentPage";
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
 * Characterization baseline for the Sovereign Deployment page *around* the
 * intended change: a new opening section is being inserted after the PageHero
 * and before the first existing Section. This file deliberately does NOT pin
 * the position of the first section or the total section count, because those
 * legitimately change. It protects the invariants that must survive:
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
  "Documentation tools often move clinical data somewhere you cannot see",
  "Four steps, each with a clear owner",
  "What sovereignty means in practice",
  "Review the deployment model with your governance team",
];

describe("SovereignDeploymentPage opening-section insertion invariants", () => {
  it("keeps the hero h1 above every existing detailed section", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    const h1 = screen.getByRole("heading", { level: 1 });
    for (const name of EXISTING_SECTION_HEADINGS) {
      const heading = screen.getByRole("heading", { level: 2, name });
      expect(precedes(h1, heading)).toBe(true);
    }
  });

  it("keeps the existing detailed sections in their original relative order", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    const headings = EXISTING_SECTION_HEADINGS.map((name) =>
      screen.getByRole("heading", { level: 2, name }),
    );

    for (let i = 1; i < headings.length; i += 1) {
      expect(precedes(headings[i - 1], headings[i])).toBe(true);
    }
  });

  it("keeps the existing detailed content present below the hero", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    const h1 = screen.getByRole("heading", { level: 1 });

    // A representative marker from each existing detailed section.
    const markers = [
      screen.getByRole("heading", {
        level: 3,
        name: "The boundary becomes unclear",
      }),
      screen.getByRole("heading", {
        level: 3,
        name: "Custody is quietly transferred",
      }),
      screen.getByRole("heading", {
        level: 3,
        name: "Review is treated as optional",
      }),
      screen.getByRole("heading", {
        level: 3,
        name: "Capture inside the care setting",
      }),
      screen.getByRole("heading", {
        level: 3,
        name: "Process in the deployment you control",
      }),
      screen.getByRole("heading", {
        level: 3,
        name: "Review before anything is committed",
      }),
      screen.getByRole("heading", {
        level: 3,
        name: "Retain under your own policy",
      }),
      screen.getByRole("heading", {
        level: 3,
        name: "A defined processing boundary",
      }),
      screen.getByRole("heading", {
        level: 3,
        name: "Data custody stays with the provider",
      }),
      screen.getByRole("heading", {
        level: 3,
        name: "Access tied to existing accounts",
      }),
      screen.getByRole("heading", {
        level: 3,
        name: "Reviewable by design",
      }),
    ];

    for (const marker of markers) {
      expect(precedes(h1, marker)).toBe(true);
    }
  });

  it("keeps the workflow steps, sovereignty pillars, and deployment facts below the hero", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    const h1 = screen.getByRole("heading", { level: 1 });
    const workflowStep = document.querySelector(
      '[data-ocid="sovereign.workflow_step.1"]',
    );
    const pillarCard = document.querySelector(
      '[data-ocid="sovereign.pillar_card.1"]',
    );
    const platformFact = document.querySelector(
      '[data-ocid="sovereign.fact.platform"]',
    );

    expect(workflowStep).not.toBeNull();
    expect(pillarCard).not.toBeNull();
    expect(platformFact).not.toBeNull();
    expect(precedes(h1, workflowStep as Element)).toBe(true);
    expect(precedes(h1, pillarCard as Element)).toBe(true);
    expect(precedes(h1, platformFact as Element)).toBe(true);
  });
});
