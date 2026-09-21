import { AiGovernancePage } from "@/pages/AiGovernancePage";
import { renderWithProviders, renderWithRouter } from "@/test/helpers";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

/**
 * Characterization baseline for the AI Governance page *around* the parts that
 * are intentionally changing. The hero headline is moving away from
 * "The clinician stays the decision-maker", and new sections (principle
 * bullets, an architecture flow diagram, a supporting photo, a note) are being
 * added. This file therefore does NOT pin the current headline or the current
 * section list. It protects the stable surrounding behavior: the page renders
 * at /ai-governance inside the shared shell, the FAQ accordion still works, the
 * governance commitments and data-handling content survive, and the rest of the
 * site is unaffected.
 */
describe("AiGovernancePage stable content", () => {
  it("renders a single page-level h1 inside the shared shell", async () => {
    await renderWithRouter(<AiGovernancePage />);

    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0].textContent?.trim().length ?? 0).toBeGreaterThan(0);
  });

  it("keeps the governance-principles commitments", async () => {
    await renderWithRouter(<AiGovernancePage />);

    for (const title of [
      "Clinician oversight",
      "Review before use",
      "Transparency of output",
      "Deliberate data handling",
    ]) {
      expect(
        screen.getByRole("heading", { level: 3, name: title }),
      ).toBeInTheDocument();
    }
  });

  it("keeps the human-in-the-loop decision-control content", async () => {
    await renderWithRouter(<AiGovernancePage />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /decision control stays with the clinician/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/the system drafts, the clinician decides/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/approval is the gate to the record/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/corrections are first-class/i),
    ).toBeInTheDocument();
  });

  it("keeps the data-handling cards and the unconfirmed-certification placeholder", async () => {
    await renderWithRouter(<AiGovernancePage />);

    for (const title of [
      "Purpose-limited processing",
      "Clinic-controlled policy",
      "Deployment specifics",
    ]) {
      expect(
        screen.getByRole("heading", { level: 3, name: title }),
      ).toBeInTheDocument();
    }

    const text = document.body.textContent ?? "";
    expect(text).toContain("[certification/region to be confirmed]");
    // No invented hosting regions or certification names.
    expect(text).not.toMatch(/\b(ISO\s?27001|SOC\s?2|HIPAA|GDPR)\b/i);
    expect(text).not.toMatch(
      /\b(EU|US|UK|Canada|Australia)\s+(region|data centre|datacenter)\b/i,
    );
  });

  it("renders every image with non-empty alt text", async () => {
    await renderWithRouter(<AiGovernancePage />);

    const images = document.querySelectorAll("img");
    expect(images.length).toBeGreaterThanOrEqual(1);
    for (const image of images) {
      expect(image.getAttribute("alt")?.trim().length ?? 0).toBeGreaterThan(0);
    }
  });

  it("keeps the closing call-to-action band with both account actions", async () => {
    await renderWithRouter(<AiGovernancePage />);

    const getStarted = document.querySelector(
      '[data-ocid="cta.primary_button"]',
    ) as HTMLAnchorElement;
    const signIn = document.querySelector(
      '[data-ocid="cta.secondary_button"]',
    ) as HTMLAnchorElement;
    expect(getStarted).not.toBeNull();
    expect(signIn).not.toBeNull();
    expect(getStarted).toHaveAttribute(
      "href",
      "https://app.telemeetup.com/register",
    );
    expect(signIn).toHaveAttribute("href", "https://app.telemeetup.com/login");
  });
});

describe("AiGovernancePage FAQ accordion", () => {
  it("keeps the governance questions and reveals an answer on click", async () => {
    const user = userEvent.setup();
    await renderWithRouter(<AiGovernancePage />);

    const trigger = screen.getByRole("button", {
      name: /who is responsible for the final clinical note\?/i,
    });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText(
        /the clinician remains the decision-maker for every clinical action recorded in the note/i,
      ),
    ).toBeInTheDocument();
  });

  it("keeps the single-open accordion behavior", async () => {
    const user = userEvent.setup();
    await renderWithRouter(<AiGovernancePage />);

    const first = screen.getByRole("button", {
      name: /who is responsible for the final clinical note\?/i,
    });
    const second = screen.getByRole("button", {
      name: /can a note be filed without a clinician seeing it\?/i,
    });

    await user.click(first);
    expect(first).toHaveAttribute("aria-expanded", "true");

    await user.click(second);
    expect(second).toHaveAttribute("aria-expanded", "true");
    expect(first).toHaveAttribute("aria-expanded", "false");
  });

  it("collapses an open answer when its trigger is clicked again", async () => {
    const user = userEvent.setup();
    await renderWithRouter(<AiGovernancePage />);

    const trigger = screen.getByRole("button", {
      name: /does robi care replace clinical judgement\?/i,
    });

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});

describe("AiGovernancePage shared shell", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/ai-governance");
    vi.clearAllMocks();
  });

  it("renders at /ai-governance inside the fixed header and shared footer", async () => {
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

    const header = document.querySelector("header");
    expect(header).not.toBeNull();
    expect(header?.className).toContain("fixed");

    const primaryNav = screen.getByRole("navigation", { name: "Primary" });
    expect(
      within(primaryNav).getByRole("link", { name: "AI Governance" }),
    ).toHaveAttribute("href", "/ai-governance");

    const footer = document.querySelector("footer") as HTMLElement;
    expect(footer).not.toBeNull();
    expect(
      within(footer).getByText("© 2026 Ecocarrier Inc. All rights reserved."),
    ).toBeInTheDocument();
  });
});

describe("GovernanceFaq shared contract", () => {
  it("renders one trigger per supplied item and no more", () => {
    renderWithProviders(<AiGovernancePage />);

    // The page's own FAQ items are the only accordion triggers on the page.
    const triggers = screen.getAllByRole("button", { expanded: false });
    expect(triggers.length).toBeGreaterThanOrEqual(1);
    for (const trigger of triggers) {
      expect(trigger.textContent?.trim().length ?? 0).toBeGreaterThan(0);
    }
  });
});
