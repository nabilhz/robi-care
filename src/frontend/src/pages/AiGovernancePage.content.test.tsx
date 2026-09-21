import { AiGovernancePage } from "@/pages/AiGovernancePage";
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

const HEADLINE = "Clinical AI that can be constrained, examined and stopped.";

const GOVERNANCE_PRINCIPLES = [
  "AI actions begin with explicit identity, role and authorization checks",
  "Applicable policies are evaluated before any action proceeds",
  "Restricted actions are denied by default when authorization or information is missing",
  "Higher-risk outputs require human approval",
  "Material actions generate time-stamped evidence and governance receipts",
  "Administrators can suspend workflows, models, integrations or user privileges",
  "Incidents can be reconstructed from protected records",
  "Model confidence never overrides an applicable clinical or organizational rule",
];

const FAIL_SAFE_NOTE =
  "Fail-safe and fail-closed are design objectives subject to testing, validation and contractual scope — not a guarantee that failure or harm is impossible.";

const DIAGRAM_NODES = [
  "Clinician/Nurse/EMS/Administrator",
  "Robi Care PWA",
  "Identity, Consent and Role Controls",
  "SSOT-AI-GOV Policy Gates",
  "TMU Clinical Workflow Services",
  "Evidence Ledger and Audit Receipts",
  "Approved AI Models and Clinical/Administrative Systems",
  "Clinician Review and Sign-off",
];

describe("AiGovernancePage headline", () => {
  it("renders the exact accepted headline as the single page-level h1", async () => {
    await renderWithRouter(<AiGovernancePage />);

    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(HEADLINE);
  });
});

describe("AiGovernancePage governance principles", () => {
  it("renders all eight principles verbatim and in order as bullet points", async () => {
    await renderWithRouter(<AiGovernancePage />);

    const list = document.querySelector(
      '[data-ocid="governance.principles_list"]',
    ) as HTMLElement | null;
    expect(list).not.toBeNull();

    const items = within(list as HTMLElement).getAllByRole("listitem");
    expect(items).toHaveLength(GOVERNANCE_PRINCIPLES.length);

    GOVERNANCE_PRINCIPLES.forEach((principle, index) => {
      expect(items[index]).toHaveTextContent(principle);
    });
  });
});

describe("AiGovernancePage architecture diagram", () => {
  it("renders every diagram node in the accepted order", async () => {
    await renderWithRouter(<AiGovernancePage />);

    const diagram = document.querySelector(
      '[data-ocid="governance.diagram"]',
    ) as HTMLElement | null;
    expect(diagram).not.toBeNull();

    const text = diagram?.textContent ?? "";
    for (const node of DIAGRAM_NODES) {
      expect(text).toContain(node);
    }

    // The nodes appear in the specified top-to-bottom order.
    const positions = DIAGRAM_NODES.map((node) => text.indexOf(node));
    for (let i = 1; i < positions.length; i += 1) {
      expect(positions[i]).toBeGreaterThan(positions[i - 1]);
    }
  });

  it("shows the two parallel branches and their convergence", async () => {
    await renderWithRouter(<AiGovernancePage />);

    const diagram = document.querySelector(
      '[data-ocid="governance.diagram"]',
    ) as HTMLElement | null;
    expect(diagram).not.toBeNull();

    const text = diagram?.textContent ?? "";
    expect(text).toMatch(/parallel branches/i);
    expect(text).toMatch(/converge/i);

    // The two branches share a single list container, so they are siblings.
    const branchList = diagram?.querySelector("ul");
    expect(branchList).not.toBeNull();
    const branches = within(branchList as HTMLElement).getAllByRole("listitem");
    expect(branches).toHaveLength(2);
    expect(branches[0]).toHaveTextContent("TMU Clinical Workflow Services");
    expect(branches[1]).toHaveTextContent("Evidence Ledger and Audit Receipts");
  });

  it("is built from HTML/CSS rather than a substituted image", async () => {
    await renderWithRouter(<AiGovernancePage />);

    const diagram = document.querySelector(
      '[data-ocid="governance.diagram"]',
    ) as HTMLElement | null;
    expect(diagram).not.toBeNull();
    // No <img> inside the diagram: the flow is real DOM, not a picture.
    expect(diagram?.querySelector("img")).toBeNull();
    expect(diagram?.querySelectorAll("ol li").length).toBeGreaterThan(0);
  });
});

describe("AiGovernancePage supporting photo", () => {
  it("shows the administrator/compliance dashboard photo with alt text", async () => {
    await renderWithRouter(<AiGovernancePage />);

    const image = document.querySelector(
      'img[src="/assets/generated/ai-governance-admin-dashboard.dim_1536x1024.jpg"]',
    ) as HTMLImageElement | null;
    expect(image).not.toBeNull();
    expect(image?.getAttribute("alt")?.trim().length ?? 0).toBeGreaterThan(0);
  });
});

describe("AiGovernancePage fail-safe note", () => {
  it("renders the exact note below the diagram", async () => {
    await renderWithRouter(<AiGovernancePage />);

    const note = document.querySelector(
      '[data-ocid="governance.failsafe_note"]',
    ) as HTMLElement | null;
    expect(note).not.toBeNull();
    expect(note).toHaveTextContent(FAIL_SAFE_NOTE);

    const diagram = document.querySelector(
      '[data-ocid="governance.diagram"]',
    ) as HTMLElement | null;
    expect(diagram).not.toBeNull();
    // The note follows the diagram in document order.
    const position = diagram?.compareDocumentPosition(note as Node);
    expect(
      position !== undefined &&
        (position & Node.DOCUMENT_POSITION_FOLLOWING) !== 0,
    ).toBe(true);
  });
});
