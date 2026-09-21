import { SponsorshipPage } from "@/pages/SponsorshipPage";
import { renderWithProviders, renderWithRouter } from "@/test/helpers";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

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
 * Cover for the accepted Sponsorship Program page.
 *
 * The request fixes the page's copy and structure exactly: a hero framing
 * sponsorship as a strategic investment rather than charity, a subsidy section,
 * four named sponsor categories, exactly three sponsorship tiers with their
 * commitments and monthly figures, a pricing note, and a "Become a Sponsor"
 * call to action pointing at the Contact page. It also adds a "Sponsorship"
 * entry to the footer's Explore column.
 *
 * `App.tsx` builds its router once at module scope, so a bare `pushState`
 * between renders does not move an already-mounted router. Re-importing the
 * module after `vi.resetModules()` gives each route a fresh router created at
 * the pushed URL, which is what a real direct load does.
 */
async function renderAppAt(path: string) {
  window.history.pushState({}, "", path);
  vi.resetModules();
  const { default: App } = await import("@/App");
  renderWithProviders(<App />);
}

describe("sponsorship route loads inside the shared shell", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders a level-1 heading at /sponsorship without a blank screen", async () => {
    await renderAppAt("/sponsorship");

    const h1 = await screen.findByRole("heading", { level: 1 });
    expect(h1).toBeInTheDocument();
    expect(h1.textContent?.trim().length ?? 0).toBeGreaterThan(0);
  });

  it("mounts the fixed header and the single shared footer at /sponsorship", async () => {
    await renderAppAt("/sponsorship");
    await screen.findByRole("heading", { level: 1 });

    const header = document.querySelector("header");
    expect(header).not.toBeNull();
    expect(header?.className).toContain("fixed");

    const footers = document.querySelectorAll("footer");
    expect(footers).toHaveLength(1);
    expect(footers[0]).toHaveAttribute("data-ocid", "footer");
  });
});

describe("sponsorship hero frames sponsorship as an investment", () => {
  it("states that sponsorship is a strategic investment in community healthcare access, not charity", async () => {
    await renderWithRouter(<SponsorshipPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /strategic investment in community healthcare access, not charity/i,
      }),
    ).toBeInTheDocument();
  });
});

describe("sponsorship subsidy section", () => {
  it("explains that sponsorship subsidizes subscription costs for healthcare professionals and institutions", async () => {
    await renderWithRouter(<SponsorshipPage />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /sponsorship subsidizes the subscription, not the standard of care/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /subsidizes subscription costs for healthcare professionals and institutions/i,
      ),
    ).toBeInTheDocument();
  });

  it("names underserved communities as the priority for sponsored access", async () => {
    await renderWithRouter(<SponsorshipPage />);

    expect(
      screen.getByText(/underserved communities come first/i),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(
        /communities with the least capacity to absorb documentation overhead/i,
      ).length,
    ).toBeGreaterThanOrEqual(1);
  });
});

describe("sponsorship categories", () => {
  it("names the four accepted sponsor categories", async () => {
    await renderWithRouter(<SponsorshipPage />);

    for (const category of [
      "Health systems",
      "NGOs",
      "Healthcare-focused corporations",
      "Government and PPP partners",
    ]) {
      expect(
        screen.getByRole("heading", { level: 3, name: category }),
      ).toBeInTheDocument();
    }
  });
});

describe("sponsorship tiers", () => {
  it("renders exactly three tier cards", async () => {
    await renderWithRouter(<SponsorshipPage />);

    const cards = document.querySelectorAll(
      '[data-ocid^="sponsorship.tier_card."]',
    );
    expect(cards).toHaveLength(3);
  });

  it("shows each tier's name, commitment, monthly figure and supported recipients", async () => {
    await renderWithRouter(<SponsorshipPage />);

    const expected: {
      name: string;
      commitment: RegExp;
      price: string;
      supports: RegExp;
    }[] = [
      {
        name: "Community Supporter",
        commitment: /sponsors 1 premium subscription/i,
        price: "~$609/month",
        supports: /one independent physician or clinician/i,
      },
      {
        name: "Regional Partner",
        commitment: /sponsors 5 premium subscriptions/i,
        price: "~$3,045/month",
        supports: /a clinic or small care team/i,
      },
      {
        name: "Strategic Partner",
        commitment:
          /sponsors 10\+ premium subscriptions or a business-tier deployment/i,
        price: "~$6,090+/month",
        supports: /a hospital department or regional program/i,
      },
    ];

    for (const tier of expected) {
      const heading = screen.getByRole("heading", {
        level: 3,
        name: tier.name,
      });
      const card = heading.closest("article") as HTMLElement;
      expect(card).not.toBeNull();
      expect(within(card).getByText(tier.commitment)).toBeInTheDocument();
      expect(within(card).getByText(tier.price)).toBeInTheDocument();
      expect(within(card).getByText(tier.supports)).toBeInTheDocument();
    }
  });

  it("labels only the Strategic Partner tier as Custom — contact us.", async () => {
    await renderWithRouter(<SponsorshipPage />);

    const customNotes = document.querySelectorAll(
      '[data-ocid^="sponsorship.tier_custom_note."]',
    );
    expect(customNotes).toHaveLength(1);
    expect(customNotes[0]).toHaveTextContent("Custom — contact us.");

    const strategic = screen
      .getByRole("heading", { level: 3, name: "Strategic Partner" })
      .closest("article") as HTMLElement;
    expect(
      within(strategic).getByText("Custom — contact us."),
    ).toBeInTheDocument();
  });

  it("shows the published-pricing note under the tiers", async () => {
    await renderWithRouter(<SponsorshipPage />);

    expect(
      screen.getByText(
        "Sponsorship levels are based on Robi Care's published subscription pricing.",
      ),
    ).toBeInTheDocument();
  });
});

describe("sponsorship call to action", () => {
  it("links the 'Become a Sponsor' button to the Contact page", async () => {
    await renderWithRouter(<SponsorshipPage />);

    const buttons = screen.getAllByRole("link", {
      name: /become a sponsor/i,
    });
    expect(buttons.length).toBeGreaterThanOrEqual(1);
    for (const button of buttons) {
      expect(button).toHaveAttribute("href", "/contact");
    }
  });
});

describe("footer Sponsorship link", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("adds a Sponsorship link to the Explore column pointing at /sponsorship", async () => {
    await renderAppAt("/");
    await screen.findByRole("heading", { level: 1 });

    const footer = document.querySelector("footer") as HTMLElement;
    const explore = within(footer).getByRole("navigation", {
      name: "Explore",
    });
    expect(
      within(explore).getByRole("link", { name: "Sponsorship" }),
    ).toHaveAttribute("href", "/sponsorship");
  });

  it("navigates to the Sponsorship page from the footer link", async () => {
    const user = userEvent.setup();
    await renderAppAt("/");
    await screen.findByRole("heading", { level: 1 });

    const footer = document.querySelector("footer") as HTMLElement;
    await user.click(within(footer).getByRole("link", { name: "Sponsorship" }));

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: /strategic investment in community healthcare access, not charity/i,
      }),
    ).toBeInTheDocument();
    // The shared shell survives client-side navigation.
    expect(document.querySelector("footer")).not.toBeNull();
    expect(document.querySelector("header")).not.toBeNull();
  });
});
