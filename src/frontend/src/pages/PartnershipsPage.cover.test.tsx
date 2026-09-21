import { PartnershipsPage } from "@/pages/PartnershipsPage";
import { renderWithProviders, renderWithRouter } from "@/test/helpers";
import { screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import App from "@/App";

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

const HEADLINE = "A partnership model for sustainable national access.";

const PPP_PARAGRAPH =
  "Robi Care is deployed through Public-Private Partnerships (PPP) with private enterprise, NGOs and local or national government in each country. Ecocarrier Inc. provides Robi Care, the TMU Enablement Platform and the SAAAS implementation and technical support.";

const PPP_ROWS: { participant: string; role: string }[] = [
  {
    participant: "Government or Public Institution",
    role: "Policy alignment, program sponsorship, public-system participation",
  },
  {
    participant: "Local Private Enterprise",
    role: "Operations, adoption, support and commercial execution",
  },
  {
    participant: "NGO or Development Partner",
    role: "Community access, program funding, evaluation, capacity building",
  },
  {
    participant: "Ecocarrier Inc.",
    role: "Robi Care, TMU Enablement Platform, SAAAS implementation and technical support",
  },
  {
    participant: "Healthcare Institutions",
    role: "Clinical governance, professional oversight and workflow integration",
  },
];

/**
 * Cover for the accepted Partnerships main-content change: the new headline,
 * the PPP paragraph naming Ecocarrier Inc., the collaboration photograph above
 * the table, and the two-column Participant | Role table with its five rows.
 */
describe("PartnershipsPage PPP main content", () => {
  it("opens the main content area with the accepted headline", async () => {
    await renderWithRouter(<PartnershipsPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: HEADLINE }),
    ).toBeInTheDocument();
  });

  it("renders the PPP paragraph directly beneath the headline with the exact wording", async () => {
    await renderWithRouter(<PartnershipsPage />);

    const headline = screen.getByRole("heading", { level: 1, name: HEADLINE });
    const paragraph = screen.getByText(PPP_PARAGRAPH);

    // The paragraph must follow the headline in document order.
    expect(
      headline.compareDocumentPosition(paragraph) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(paragraph.textContent).toContain(
      "Ecocarrier Inc. provides Robi Care, the TMU Enablement Platform and the SAAAS implementation and technical support.",
    );
  });

  it("renders a collaboration photograph above the table with non-empty alt text", async () => {
    await renderWithRouter(<PartnershipsPage />);

    const table = document.querySelector(
      '[data-ocid="partnerships.ppp_table"]',
    ) as HTMLElement;
    expect(table).not.toBeNull();

    const images = Array.from(document.querySelectorAll("img"));
    const aboveTable = images.filter(
      (image) =>
        (image.compareDocumentPosition(table) &
          Node.DOCUMENT_POSITION_FOLLOWING) !==
        0,
    );
    expect(aboveTable.length).toBeGreaterThanOrEqual(1);
    for (const image of aboveTable) {
      expect(image.getAttribute("alt")?.trim().length ?? 0).toBeGreaterThan(0);
    }
  });

  it("renders a two-column Participant | Role table with all five rows", async () => {
    await renderWithRouter(<PartnershipsPage />);

    const table = document.querySelector(
      '[data-ocid="partnerships.ppp_table"]',
    ) as HTMLElement;
    expect(table).not.toBeNull();

    const columnHeaders = within(table).getAllByRole("columnheader");
    expect(columnHeaders).toHaveLength(2);
    expect(columnHeaders[0]).toHaveTextContent("Participant");
    expect(columnHeaders[1]).toHaveTextContent("Role");

    const bodyRows = table.querySelectorAll("tbody tr");
    expect(bodyRows).toHaveLength(5);

    for (const row of PPP_ROWS) {
      const rowElement = within(table).getByRole("rowheader", {
        name: row.participant,
      });
      expect(rowElement).toBeInTheDocument();
      expect(within(table).getByText(row.role)).toBeInTheDocument();
    }
  });

  it("keeps the header row distinguishable and the role text unclipped", async () => {
    await renderWithRouter(<PartnershipsPage />);

    const table = document.querySelector(
      '[data-ocid="partnerships.ppp_table"]',
    ) as HTMLElement;
    expect(table).not.toBeNull();

    // The header row carries a distinct background from the body rows.
    const thead = table.querySelector("thead") as HTMLElement;
    expect(thead).not.toBeNull();
    expect(thead.className).toContain("bg-section-alt");

    // Role cells wrap rather than clip, and the table is fixed-layout so the
    // two columns share the available width on narrow viewports.
    expect(table.className).toContain("table-fixed");
    const roleCells = table.querySelectorAll("tbody td");
    expect(roleCells).toHaveLength(5);
    for (const cell of roleCells) {
      expect(cell.className).toContain("break-words");
    }
  });

  it("keeps the shared footer and the rest of the shell when navigating to Partnerships", async () => {
    window.history.pushState({}, "", "/partnerships");
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1, name: HEADLINE });

    const footer = document.querySelector("footer") as HTMLElement;
    expect(footer).not.toBeNull();
    expect(
      within(footer).getByText("© 2026 Ecocarrier Inc. All rights reserved."),
    ).toBeInTheDocument();

    // Partnerships is intentionally absent from the top navigation; the page
    // stays reachable at its route and through the footer.
    const primaryNav = screen.getByRole("navigation", { name: "Primary" });
    expect(
      within(primaryNav).queryByRole("link", { name: "Partnerships" }),
    ).not.toBeInTheDocument();
    expect(
      within(footer).getByRole("link", { name: "PPP partnerships" }),
    ).toHaveAttribute("href", "/partnerships");
  });
});

describe("PartnershipsPage unchanged neighbours", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
    vi.clearAllMocks();
  });

  it("keeps the home page headline and shell unchanged", async () => {
    renderWithProviders(<App />);
    expect(
      await screen.findByRole("heading", {
        level: 2,
        name: /from consultation to clear documentation in three steps/i,
      }),
    ).toBeInTheDocument();

    const footer = document.querySelector("footer") as HTMLElement;
    expect(
      within(footer).getByText("© 2026 Ecocarrier Inc. All rights reserved."),
    ).toBeInTheDocument();
  });
});
