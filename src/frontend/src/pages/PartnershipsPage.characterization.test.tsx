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

/**
 * Characterization baseline for the Partnerships page *around* the intended
 * change. The hero headline ("Build clinical documentation into what you
 * already run") is being replaced intentionally, and a new PPP paragraph, a
 * new photo, and a new Participant/Role table are being added to the main
 * content area, so this file deliberately does NOT pin the current headline or
 * the current section list. It protects the parts the request does not change:
 * the page renders at /partnerships inside the shared shell, the hero actions
 * and closing CTA keep their destinations, the existing partnership-model,
 * platform-capability, and four-step content survives, every image keeps alt
 * text, and the rest of the site's navigation is unaffected.
 */
describe("PartnershipsPage stable content", () => {
  it("renders a single page-level h1 inside the shared shell", async () => {
    await renderWithRouter(<PartnershipsPage />);

    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0].textContent?.trim().length ?? 0).toBeGreaterThan(0);
  });

  it("keeps the hero eyebrow and the partnership contact action", async () => {
    await renderWithRouter(<PartnershipsPage />);

    expect(screen.getByText("Partnerships")).toBeInTheDocument();

    const contact = document.querySelector(
      '[data-ocid="partnerships.primary_button"]',
    ) as HTMLAnchorElement;
    expect(contact).not.toBeNull();
    expect(contact).toHaveAttribute("href", "/contact");
  });

  it("keeps the hero's Get Started action pointing at the account system", async () => {
    await renderWithRouter(<PartnershipsPage />);

    const getStarted = document.querySelector(
      '[data-ocid="partnerships.secondary_button"]',
    ) as HTMLAnchorElement;
    expect(getStarted).not.toBeNull();
    expect(getStarted).toHaveAttribute(
      "href",
      "https://app.telemeetup.com/register",
    );
  });

  it("keeps the three partnership models with their titles and points", async () => {
    await renderWithRouter(<PartnershipsPage />);

    const section = document.querySelector("#partner-models") as HTMLElement;
    expect(section).not.toBeNull();
    expect(
      within(section).getByRole("heading", {
        level: 2,
        name: /three ways to work with us/i,
      }),
    ).toBeInTheDocument();

    const cards = section.querySelectorAll(
      '[data-ocid^="partnerships.model_card."]',
    );
    expect(cards).toHaveLength(3);

    const models: { title: string; point: string }[] = [
      {
        title: "Clinics and care providers",
        point: "Rollout support for multi-site clinical teams",
      },
      {
        title: "Health programmes",
        point: "Deployment scoped to a defined care pathway",
      },
      {
        title: "Platform integrators",
        point: "Shared identity and access through the platform",
      },
    ];
    for (const model of models) {
      expect(
        within(section).getByRole("heading", { level: 3, name: model.title }),
      ).toBeInTheDocument();
      expect(within(section).getByText(model.point)).toBeInTheDocument();
    }
  });

  it("keeps the platform-capability section with its three capabilities", async () => {
    await renderWithRouter(<PartnershipsPage />);

    const section = document.querySelector(
      "#build-on-the-platform",
    ) as HTMLElement;
    expect(section).not.toBeNull();
    expect(
      within(section).getByRole("heading", {
        level: 2,
        name: /what partners build on/i,
      }),
    ).toBeInTheDocument();

    for (const capability of [
      "Shared identity and access",
      "One governance model",
      "Partner support",
    ]) {
      expect(
        within(section).getByRole("heading", {
          level: 3,
          name: capability,
        }),
      ).toBeInTheDocument();
    }
  });

  it("keeps the four-stage partnership process", async () => {
    await renderWithRouter(<PartnershipsPage />);

    const section = document.querySelector(
      "#how-partnerships-start",
    ) as HTMLElement;
    expect(section).not.toBeNull();
    expect(
      within(section).getByRole("heading", {
        level: 2,
        name: /from first conversation to organisation-wide rollout/i,
      }),
    ).toBeInTheDocument();

    const steps = section.querySelectorAll(
      '[data-ocid^="partnerships.step_card."]',
    );
    expect(steps).toHaveLength(4);

    for (const step of [
      "Scope the partnership",
      "Design the integration",
      "Pilot with a real team",
      "Scale across the organisation",
    ]) {
      expect(
        within(section).getByRole("heading", { level: 3, name: step }),
      ).toBeInTheDocument();
    }
  });

  it("keeps the partnership-enquiries section with both actions", async () => {
    await renderWithRouter(<PartnershipsPage />);

    const section = document.querySelector(
      "#partnership-enquiries",
    ) as HTMLElement;
    expect(section).not.toBeNull();
    expect(
      within(section).getByRole("heading", {
        level: 2,
        name: /tell us about the care setting you want to support/i,
      }),
    ).toBeInTheDocument();

    const contact = document.querySelector(
      '[data-ocid="partnerships.contact_button"]',
    ) as HTMLAnchorElement;
    const deployment = document.querySelector(
      '[data-ocid="partnerships.deployment_button"]',
    ) as HTMLAnchorElement;
    expect(contact).not.toBeNull();
    expect(deployment).not.toBeNull();
    expect(contact).toHaveAttribute("href", "/contact");
    expect(deployment).toHaveAttribute("href", "/sovereign-deployment");
  });

  it("keeps the closing call-to-action band with both account actions", async () => {
    await renderWithRouter(<PartnershipsPage />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /partner with the tmu · telemeetup enablement platform/i,
      }),
    ).toBeInTheDocument();

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

  it("renders every Partnerships page image with non-empty alt text", async () => {
    await renderWithRouter(<PartnershipsPage />);

    const images = document.querySelectorAll("img");
    expect(images.length).toBeGreaterThanOrEqual(1);
    for (const image of images) {
      expect(image.getAttribute("alt")?.trim().length ?? 0).toBeGreaterThan(0);
    }
  });

  it("keeps the existing sections in their current relative order", async () => {
    await renderWithRouter(<PartnershipsPage />);

    // New PPP content is expected in the main content area, so this pins the
    // relative order of the existing sections rather than their absolute
    // positions.
    const hero = screen.getByRole("heading", { level: 1 });
    const partnerModels = document.querySelector(
      "#partner-models",
    ) as HTMLElement;
    const buildOnPlatform = document.querySelector(
      "#build-on-the-platform",
    ) as HTMLElement;
    const howPartnershipsStart = document.querySelector(
      "#how-partnerships-start",
    ) as HTMLElement;
    const enquiries = document.querySelector(
      "#partnership-enquiries",
    ) as HTMLElement;
    const ctaBand = document.querySelector(
      '[data-ocid="cta.primary_button"]',
    ) as HTMLElement;

    for (const node of [
      partnerModels,
      buildOnPlatform,
      howPartnershipsStart,
      enquiries,
      ctaBand,
    ]) {
      expect(node).not.toBeNull();
    }

    const ordered = [
      hero,
      partnerModels,
      buildOnPlatform,
      howPartnershipsStart,
      enquiries,
      ctaBand,
    ];
    for (let i = 1; i < ordered.length; i += 1) {
      expect(
        ordered[i - 1].compareDocumentPosition(ordered[i]) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    }
  });
});

describe("PartnershipsPage shared shell", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/partnerships");
    vi.clearAllMocks();
  });

  it("renders at /partnerships inside the fixed header and shared footer", async () => {
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

    const header = document.querySelector("header");
    expect(header).not.toBeNull();
    expect(header?.className).toContain("fixed");

    // Partnerships is intentionally absent from the top navigation; the page
    // stays reachable at its route and through the footer.
    const primaryNav = screen.getByRole("navigation", { name: "Primary" });
    expect(
      within(primaryNav).queryByRole("link", { name: "Partnerships" }),
    ).not.toBeInTheDocument();

    const footer = document.querySelector("footer") as HTMLElement;
    expect(
      within(footer).getByRole("link", { name: "PPP partnerships" }),
    ).toHaveAttribute("href", "/partnerships");
    expect(footer).not.toBeNull();
    expect(
      within(footer).getByText("© 2026 Ecocarrier Inc. All rights reserved."),
    ).toBeInTheDocument();
  });
});
