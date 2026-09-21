import { PricingPage } from "@/pages/PricingPage";
import { renderWithProviders } from "@/test/helpers";
import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

/**
 * Characterization baseline for the Pricing page, captured before the main
 * content area gains a three-tier comparison table.
 *
 * These tests freeze the parts of the page the request says must not change:
 * the hero, the tier cards, the "What every tier includes" section, and the
 * closing call to action. They deliberately do NOT assert the absence of the
 * new comparison table, because adding it is the intended change.
 */
describe("PricingPage characterization", () => {
  it("renders the hero headline and supporting copy", () => {
    renderWithProviders(<PricingPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Transparent pricing, built from real usage",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /every robi care tier is assembled from the same three/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Pricing")).toBeInTheDocument();
  });

  it("renders the hero photograph with descriptive alt text", () => {
    renderWithProviders(<PricingPage />);

    const image = screen.getByRole("img", {
      name: /light oak clinic desk/i,
    });
    expect(image).toHaveAttribute(
      "src",
      "/assets/generated/pricing-clinic-desk.dim_1536x1024.jpg",
    );
  });

  it("keeps the three tier cards with their daily transcription allowances", () => {
    renderWithProviders(<PricingPage />);

    for (const [tier, allowance] of [
      ["Premium Pro", "4 transcription hours / day"],
      ["Premium Business", "20 transcription hours / day"],
      ["Enterprise", "200 transcription hours / day"],
    ] as const) {
      const card = screen
        .getByRole("heading", { level: 3, name: tier })
        .closest("article") as HTMLElement;
      expect(card).not.toBeNull();
      expect(within(card).getByText(allowance)).toBeInTheDocument();
    }
  });

  it("keeps the tier section heading and its base-unit-rates note", () => {
    renderWithProviders(<PricingPage />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Three tiers, one platform",
      }),
    ).toBeInTheDocument();

    const tiers = document.querySelector("#tiers") as HTMLElement;
    expect(tiers).not.toBeNull();
    const note = within(tiers).getByText(/base unit rates:/i);
    expect(note).toBeInTheDocument();
  });

  it("keeps the 'What every tier includes' section and its three items", () => {
    renderWithProviders(<PricingPage />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "What every tier includes",
      }),
    ).toBeInTheDocument();

    const included = document.querySelector("#included") as HTMLElement;
    expect(included).not.toBeNull();
    for (const title of [
      "The full Robi Care workflow",
      "The TMU · TeleMeetUp account you already have",
      "Metered, transparent usage",
    ]) {
      expect(
        within(included).getByRole("heading", { level: 3, name: title }),
      ).toBeInTheDocument();
    }
  });

  it("keeps the closing call to action with both account actions", () => {
    renderWithProviders(<PricingPage />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Start with the tier that fits your practice",
      }),
    ).toBeInTheDocument();

    const primary = document.querySelector(
      '[data-ocid="cta.primary_button"]',
    ) as HTMLAnchorElement;
    const secondary = document.querySelector(
      '[data-ocid="cta.secondary_button"]',
    ) as HTMLAnchorElement;
    expect(primary).toHaveAttribute(
      "href",
      "https://app.telemeetup.com/register",
    );
    expect(secondary).toHaveAttribute(
      "href",
      "https://app.telemeetup.com/login",
    );
  });

  it("keeps the page's existing section anchors in order", () => {
    renderWithProviders(<PricingPage />);

    const ids = Array.from(document.querySelectorAll("section[id]")).map(
      (section) => section.id,
    );
    expect(ids).toEqual(["tiers", "included"]);
  });
});
