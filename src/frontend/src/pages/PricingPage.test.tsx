import { PricingPage } from "@/pages/PricingPage";
import { renderWithProviders } from "@/test/helpers";
import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("PricingPage", () => {
  it("shows all three tiers with their exact monthly totals", () => {
    renderWithProviders(<PricingPage />);

    for (const [tier, total] of [
      ["Premium Pro", "$609.30"],
      ["Premium Business", "$3,046.50"],
      ["Enterprise", "$30,465.00"],
    ] as const) {
      expect(
        screen.getByRole("heading", { level: 3, name: tier }),
      ).toBeInTheDocument();
      expect(screen.getByText(total)).toBeInTheDocument();
    }
  });

  it("shows the exact metered line items for each tier", () => {
    renderWithProviders(<PricingPage />);

    const tiers = document.querySelector("#tiers") as HTMLElement;
    const cards = within(tiers).getAllByRole("article");

    expect(
      within(cards[0]).getByText("7,200 minutes per month"),
    ).toBeInTheDocument();
    expect(within(cards[0]).getByText("$532.80")).toBeInTheDocument();
    expect(
      within(cards[1]).getByText("36,000 minutes per month"),
    ).toBeInTheDocument();
    expect(within(cards[1]).getByText("$2,664.00")).toBeInTheDocument();
    expect(
      within(cards[2]).getByText("360,000 minutes per month"),
    ).toBeInTheDocument();
    expect(within(cards[2]).getByText("$26,640.00")).toBeInTheDocument();
  });

  it("shows the base unit-rate footnote", () => {
    renderWithProviders(<PricingPage />);

    const note = document.querySelector('[data-ocid="pricing.rates_note"]');
    expect(note).not.toBeNull();
    const text = (note as HTMLElement).textContent ?? "";
    expect(text).toContain("Speech-to-Text Transcription $0.074/minute");
    expect(text).toContain("Access to ChatGPT $0.02 per 1,000 tokens");
    expect(text).toContain("Audio Recording $5.25/GB per month");
  });

  it("offers a Get Started action on every tier", () => {
    renderWithProviders(<PricingPage />);

    const buttons = screen.getAllByRole("link", { name: /get started/i });
    expect(buttons.length).toBeGreaterThanOrEqual(3);
    for (const button of buttons) {
      expect(button).toHaveAttribute(
        "href",
        "https://app.telemeetup.com/register",
      );
    }
  });

  it("renders the tier cards inside the pricing section", () => {
    renderWithProviders(<PricingPage />);

    const tiers = document.querySelector("#tiers") as HTMLElement;
    const cards = within(tiers).getAllByRole("article");
    expect(cards).toHaveLength(3);
    expect(
      within(cards[0]).getByRole("heading", { level: 3 }),
    ).toHaveTextContent("Premium Pro");
    expect(
      within(cards[1]).getByRole("heading", { level: 3 }),
    ).toHaveTextContent("Premium Business");
    expect(
      within(cards[2]).getByRole("heading", { level: 3 }),
    ).toHaveTextContent("Enterprise");
  });
});
