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

const LABEL = "HUMAN AUTHORITY BY DESIGN";
const HEADLINE = "AI may assist. The clinician decides.";
const BODY =
  "Robi Care combines clinical workflow support with policy gates, human authorization and traceable evidence through SSOT-AI-GOV.";
const BUTTON = "See the governance architecture";
const FAIL_CLOSED_BODY =
  "Restricted actions are denied when authorization, required evidence or governance services are unavailable.";
const REVIEW_FIRST_BODY =
  "Draft clinical content remains visibly unapproved until an authorized professional signs off.";

/**
 * Cover for the accepted AI Governance opening section: the exact label,
 * headline, body text, architecture button, and the two side callouts, placed
 * above the existing detailed governance content. The characterization file
 * protects the surrounding page and the ordering of the pre-existing sections;
 * this file pins only the content the request intentionally added.
 */
describe("AiGovernancePage accepted opening section", () => {
  it("renders the exact label, headline and body text", async () => {
    await renderWithRouter(<AiGovernancePage />);

    expect(screen.getByText(LABEL)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: HEADLINE }),
    ).toBeInTheDocument();
    expect(screen.getByText(BODY)).toBeInTheDocument();
  });

  it("renders the governance architecture button pointing at the architecture section", async () => {
    await renderWithRouter(<AiGovernancePage />);

    const button = document.querySelector(
      '[data-ocid="governance.opening_button"]',
    ) as HTMLAnchorElement | null;
    expect(button).not.toBeNull();
    expect(button).toHaveTextContent(BUTTON);
    expect(button).toHaveAttribute("href", "#governance-architecture");
  });

  it("renders the Fail-closed and Review first callouts with their body text", async () => {
    await renderWithRouter(<AiGovernancePage />);

    const failClosed = screen.getByRole("heading", {
      level: 3,
      name: "Fail-closed",
    });
    const reviewFirst = screen.getByRole("heading", {
      level: 3,
      name: "Review first",
    });

    expect(failClosed).toBeInTheDocument();
    expect(reviewFirst).toBeInTheDocument();
    expect(screen.getByText(FAIL_CLOSED_BODY)).toBeInTheDocument();
    expect(screen.getByText(REVIEW_FIRST_BODY)).toBeInTheDocument();
  });

  it("places the opening section above the existing governance principles content", async () => {
    await renderWithRouter(<AiGovernancePage />);

    const headline = screen.getByRole("heading", { level: 2, name: HEADLINE });
    const principlesHeading = screen.getByRole("heading", {
      level: 2,
      name: "Four commitments that shape how the system behaves",
    });
    const principlesList = document.querySelector(
      '[data-ocid="governance.principles_list"]',
    ) as Element;

    const position = headline.compareDocumentPosition(principlesHeading);
    expect((position & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).toBe(true);
    const listPosition = headline.compareDocumentPosition(principlesList);
    expect((listPosition & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).toBe(true);
  });

  it("keeps the opening section below the page hero h1", async () => {
    await renderWithRouter(<AiGovernancePage />);

    const h1 = screen.getByRole("heading", { level: 1 });
    const headline = screen.getByRole("heading", { level: 2, name: HEADLINE });
    const position = h1.compareDocumentPosition(headline);
    expect((position & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).toBe(true);
  });

  it("keeps the opening section's callouts distinct from the existing principle cards", async () => {
    await renderWithRouter(<AiGovernancePage />);

    // The two callouts are the only h3s in the opening section; the existing
    // principle cards keep their own headings below.
    const callouts = screen.getAllByRole("heading", { level: 3 });
    const calloutNames = callouts.map((heading) => heading.textContent?.trim());
    expect(calloutNames).toContain("Fail-closed");
    expect(calloutNames).toContain("Review first");

    const principlesList = document.querySelector(
      '[data-ocid="governance.principles_list"]',
    ) as HTMLElement;
    expect(
      within(principlesList).queryByRole("heading", { name: "Fail-closed" }),
    ).toBeNull();
  });
});
