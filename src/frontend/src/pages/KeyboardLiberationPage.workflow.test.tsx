import { WorkflowDiagram } from "@/components/keyboard/WorkflowDiagram";
import { KeyboardLiberationPage } from "@/pages/KeyboardLiberationPage";
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

const WORKFLOW_STEPS = [
  "Patient Consent",
  "Clinical Encounter",
  "Secure Transcription",
  "Structured Draft",
  "Clinician Review",
  "Approve or Correct",
  "Authorized Record",
] as const;

const NARRATIVE =
  "Clinical documentation is indispensable, but the keyboard should not stand between a healthcare professional and the person seeking care. Robi Care uses consent-based, AI-assisted, multilingual voice documentation to transform authorized clinical conversations into reviewable drafts, summaries and structured records — just speak to it in your own language. The clinician remains responsible for verifying, correcting and approving the resulting clinical documentation — this human sign-off is a safety control, not an inconvenience.";

/**
 * Cover for the accepted Keyboard Liberation main-content change: the new
 * intro section (headline, verbatim narrative, face-to-face hero photo), the
 * seven-step workflow diagram below the narrative, and the paraphrased Topol
 * note below the diagram. jsdom has no layout engine, so the photo's visual
 * placement relative to the text is not asserted here.
 */
describe("KeyboardLiberationPage intro section", () => {
  it("shows the accepted headline in the main content area", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Let clinicians face patients again.",
      }),
    ).toBeInTheDocument();
  });

  it("shows the narrative text verbatim", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    expect(screen.getByText(NARRATIVE)).toBeInTheDocument();
  });

  it("shows the face-to-face hero photo in the intro with non-empty alt text", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    const intro = document.querySelector(
      "#keyboard-liberation-intro",
    ) as HTMLElement;
    expect(intro).not.toBeNull();

    const photo = within(intro).getByRole("img", {
      name: /face-to-face with an older patient/i,
    });
    expect(photo.getAttribute("alt")?.trim().length ?? 0).toBeGreaterThan(0);
    expect(photo).toHaveAttribute(
      "src",
      "/assets/generated/keyboard-liberation-hero.dim_1536x1024.jpg",
    );

    // The photo belongs to the same intro section as the narrative copy.
    expect(within(intro).getByText(NARRATIVE)).toBeInTheDocument();
  });
});

describe("KeyboardLiberationPage workflow diagram", () => {
  it("renders the seven steps in the exact accepted order below the narrative", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    const diagram = document.querySelector(
      '[data-ocid="keyboard.workflow.list"]',
    ) as HTMLElement;
    expect(diagram).not.toBeNull();

    const items = within(diagram).getAllByRole("listitem");
    const labels = items
      .map((item) => item.textContent?.trim() ?? "")
      .filter((text) => text.length > 0);
    expect(labels).toEqual([...WORKFLOW_STEPS]);

    const narrative = screen.getByText(NARRATIVE);
    expect(
      narrative.compareDocumentPosition(diagram) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("connects the steps left to right with thin gray arrows", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    const diagram = document.querySelector(
      '[data-ocid="keyboard.workflow.list"]',
    ) as HTMLElement;
    // Connectors are aria-hidden, so query the DOM rather than the a11y tree.
    const items = Array.from(diagram.querySelectorAll(":scope > li"));
    // Seven step cards plus six connectors between them.
    expect(items).toHaveLength(WORKFLOW_STEPS.length * 2 - 1);

    const connectors = items.filter(
      (item) => item.getAttribute("aria-hidden") === "true",
    );
    expect(connectors).toHaveLength(WORKFLOW_STEPS.length - 1);
    for (const connector of connectors) {
      expect(connector.querySelector("svg")).not.toBeNull();
    }
  });

  it("renders each step as a rounded card on a pale green background with dark ink text", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    const diagram = document.querySelector(
      '[data-ocid="keyboard.workflow.list"]',
    ) as HTMLElement;
    const cards = within(diagram)
      .getAllByRole("listitem")
      .filter((item) => item.getAttribute("aria-hidden") !== "true");
    expect(cards).toHaveLength(WORKFLOW_STEPS.length);

    for (const card of cards) {
      expect(card.className).toContain("rounded-xl");
      expect(card.className).toContain("bg-section-alt");
      expect(card.className).toContain("text-foreground");
    }
  });

  it("wraps the diagram row on smaller screens", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    const diagram = document.querySelector(
      '[data-ocid="keyboard.workflow.list"]',
    ) as HTMLElement;
    expect(diagram.className).toContain("flex-wrap");
  });

  it("keeps all seven step labels the same size and weight", () => {
    renderWithProviders(<WorkflowDiagram />);

    const diagram = document.querySelector(
      '[data-ocid="keyboard.workflow.list"]',
    ) as HTMLElement;
    const cards = within(diagram)
      .getAllByRole("listitem")
      .filter((item) => item.getAttribute("aria-hidden") !== "true");

    const classNames = new Set(cards.map((card) => card.className));
    expect(classNames.size).toBe(1);
    for (const card of cards) {
      expect(card.className).toContain("text-sm");
      expect(card.className).toContain("font-medium");
    }
  });
});

describe("KeyboardLiberationPage Topol note", () => {
  it("places the paraphrased Topol note below the diagram without claiming endorsement", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    const diagram = document.querySelector(
      '[data-ocid="keyboard.workflow.list"]',
    ) as HTMLElement;
    const note = screen.getByText(
      /This approach reflects the broader case made by Dr\. Eric Topol/i,
    );

    expect(
      diagram.compareDocumentPosition(note) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    // The note paraphrases Topol and explicitly disclaims endorsement.
    expect(note.textContent).toMatch(/broader case made by Dr\. Eric Topol/i);
    expect(note.textContent).toMatch(
      /does not imply that Dr\. Topol endorses Robi Care/i,
    );
    // No affirmative endorsement claim anywhere in the note.
    expect(note.textContent).not.toMatch(
      /(?<!does not imply that )Dr\. Topol endorses Robi Care/i,
    );
  });
});
