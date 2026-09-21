import { PricingPage } from "@/pages/PricingPage";
import { renderWithProviders } from "@/test/helpers";
import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

/**
 * Cover for the accepted Pricing main-content change: a three-tier usage
 * comparison table (Premium Pro / Premium Business / Enterprise) with unit
 * counts and US$ amounts, plus the base-unit-rates note directly below it.
 *
 * The table is located by its `data-ocid` seam rather than by page position, so
 * these assertions stay stable if surrounding sections move.
 */
function getUsageTable(): HTMLElement {
  const table = document.querySelector(
    '[data-ocid="pricing.usage_table"]',
  ) as HTMLElement | null;
  expect(table).not.toBeNull();
  return table as HTMLElement;
}

describe("PricingPage usage comparison table", () => {
  it("renders a table in the main content area with the three tier columns and their daily allowances", () => {
    renderWithProviders(<PricingPage />);

    const table = getUsageTable();
    const columnHeaders = within(table).getAllByRole("columnheader");

    // Three tier columns plus the two stacked "Units" / "Number of Units"
    // label headers in the first column.
    expect(columnHeaders.length).toBeGreaterThanOrEqual(3);

    for (const [tier, allowance] of [
      ["Premium Pro", "4 hours/day"],
      ["Premium Business", "20 hours/day"],
      ["Enterprise", "200 hours/day"],
    ] as const) {
      const header = within(table).getByRole("columnheader", {
        name: new RegExp(tier),
      });
      expect(header).toHaveTextContent(tier);
      expect(header).toHaveTextContent(allowance);
    }
  });

  it("labels the columns Units, Number of Units, and US$", () => {
    renderWithProviders(<PricingPage />);

    const table = getUsageTable();
    expect(
      within(table).getByRole("columnheader", { name: "Units" }),
    ).toBeInTheDocument();
    expect(
      within(table).getByRole("columnheader", { name: "Number of Units" }),
    ).toBeInTheDocument();
    expect(
      within(table).getAllByRole("columnheader", { name: "US$" }).length,
    ).toBeGreaterThanOrEqual(3);
  });

  it("shows the Speech-to-Text Transcription row with exact units and prices", () => {
    renderWithProviders(<PricingPage />);

    const table = getUsageTable();
    const row = within(table).getByRole("rowheader", {
      name: "Speech-to-Text Transcription (minutes)",
    });
    const rowElement = row.closest("tr") as HTMLElement;
    expect(rowElement).not.toBeNull();

    for (const value of [
      "7,200 min",
      "$532.80",
      "36,000 min",
      "$2,664.00",
      "360,000 min",
      "$26,640.00",
    ]) {
      expect(within(rowElement).getByText(value)).toBeInTheDocument();
    }
  });

  it("shows the Access to ChatGPT row with exact units and prices", () => {
    renderWithProviders(<PricingPage />);

    const table = getUsageTable();
    const row = within(table).getByRole("rowheader", {
      name: "Access to ChatGPT (1,000 tokens)",
    });
    const rowElement = row.closest("tr") as HTMLElement;
    expect(rowElement).not.toBeNull();

    for (const value of [
      "2,880",
      "$57.60",
      "14,400",
      "$288.00",
      "144,000",
      "$2,880.00",
    ]) {
      expect(within(rowElement).getByText(value)).toBeInTheDocument();
    }
  });

  it("shows the Audio Recording row with exact units and prices", () => {
    renderWithProviders(<PricingPage />);

    const table = getUsageTable();
    const row = within(table).getByRole("rowheader", {
      name: "Audio Recording (GB per month)",
    });
    const rowElement = row.closest("tr") as HTMLElement;
    expect(rowElement).not.toBeNull();

    for (const value of [
      "3.6 GB",
      "$18.90",
      "18 GB",
      "$94.50",
      "180 GB",
      "$945.00",
    ]) {
      expect(within(rowElement).getByText(value)).toBeInTheDocument();
    }
  });

  it("renders the base-unit-rates note directly below the table", () => {
    renderWithProviders(<PricingPage />);

    const table = getUsageTable();
    const note = document.querySelector(
      '[data-ocid="pricing.rates_note"]',
    ) as HTMLElement | null;
    expect(note).not.toBeNull();

    // The note must follow the table in document order.
    expect(
      table.compareDocumentPosition(note as HTMLElement) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();

    const text = (note as HTMLElement).textContent ?? "";
    expect(text).toContain("Speech-to-Text Transcription $0.074/minute");
    expect(text).toContain("Access to ChatGPT $0.02 per 1,000 tokens");
    expect(text).toContain("Audio Recording $5.25/GB per month");
  });

  it("renders every table cell in Dark Ink text on the Warm White canvas", () => {
    renderWithProviders(<PricingPage />);

    const table = getUsageTable();

    // The table surface is the warm-white canvas, not a colored panel.
    expect(table.className).toContain("bg-canvas");

    // Every header and body cell carries the dark-ink foreground token and no
    // competing text color, so no cell is color-on-color.
    const cells = [
      ...table.querySelectorAll("th"),
      ...table.querySelectorAll("td"),
    ];
    expect(cells.length).toBeGreaterThan(0);
    for (const cell of cells) {
      expect(cell.className).toContain("text-foreground");
      expect(cell.className).not.toMatch(/text-(white|primary|accent|muted)/);
    }
  });

  it("keeps the table legible on a narrow viewport without clipping columns", () => {
    renderWithProviders(<PricingPage />);

    const table = getUsageTable();

    // The wrapper scrolls horizontally rather than clipping, and the table
    // keeps a minimum width so its columns never collapse or overlap.
    expect(table.className).toContain("overflow-x-auto");
    const tableElement = table.querySelector("table") as HTMLElement;
    expect(tableElement).not.toBeNull();
    expect(tableElement.className).toContain("min-w-");
  });
});
