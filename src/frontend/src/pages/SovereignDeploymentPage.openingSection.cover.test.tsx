import { SovereignDeploymentPage } from "@/pages/SovereignDeploymentPage";
import { renderWithRouter } from "@/test/helpers";
import { screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({
    actor: {
      submitContactEnquiry: vi.fn(async () => ({ __kind: "ok", ok: 1n })),
    },
    isFetching: false,
  }),
}));

vi.mock("@/backend", () => ({
  createActor: vi.fn(() => ({
    submitContactEnquiry: vi.fn(async () => ({ __kind: "ok", ok: 1n })),
  })),
}));

const LABEL = "Accessible by design";
const HEADLINE = "Local service. Sovereign options. Practical economics.";
const BODY =
  "Robi Care is designed for managed, in-country service through SAAAS, supporting local data controls, approved model routing and partnership-led adoption.";

const CARDS = [
  {
    title: "In-country operations",
    description:
      "Deployment patterns aligned to local institutions, regulation and support.",
  },
  {
    title: "Data sovereignty",
    description:
      "Configurable residency, retention and access controls for each jurisdiction.",
  },
  {
    title: "Democratized access",
    description:
      "Transparent usage-based economics for individual professionals through national programs.",
  },
];

/**
 * Cover for the accepted Sovereign Deployment opening section: the exact label,
 * headline, body text, and three cards, placed above the existing detailed
 * content. The characterization file protects the surrounding page and the
 * ordering of the pre-existing sections; this file pins only the content the
 * request intentionally added.
 */
describe("SovereignDeploymentPage accepted opening section", () => {
  it("renders the exact label, headline and body text", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    // The label is rendered through the shared `.eyebrow` class, which applies
    // `text-transform: uppercase`; the DOM text is the source string.
    expect(screen.getByText(LABEL)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: HEADLINE }),
    ).toBeInTheDocument();
    expect(screen.getByText(BODY)).toBeInTheDocument();
  });

  it("renders the three accepted cards with their titles and descriptions", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    CARDS.forEach((card, index) => {
      const article = document.querySelector(
        `[data-ocid="sovereign.access_card.${index + 1}"]`,
      ) as HTMLElement | null;
      expect(article).not.toBeNull();
      expect(
        within(article as HTMLElement).getByRole("heading", {
          level: 3,
          name: card.title,
        }),
      ).toBeInTheDocument();
      expect(
        within(article as HTMLElement).getByText(card.description),
      ).toBeInTheDocument();
    });
  });

  it("places the opening section above the existing detailed content", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    const headline = screen.getByRole("heading", { level: 2, name: HEADLINE });
    const existingHeadings = [
      "Documentation tools often move clinical data somewhere you cannot see",
      "Four steps, each with a clear owner",
      "What sovereignty means in practice",
      "Review the deployment model with your governance team",
    ];

    for (const name of existingHeadings) {
      const heading = screen.getByRole("heading", { level: 2, name });
      const position = headline.compareDocumentPosition(heading);
      expect((position & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).toBe(true);
    }
  });

  it("keeps the opening section below the page hero h1", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    const h1 = screen.getByRole("heading", { level: 1 });
    const headline = screen.getByRole("heading", { level: 2, name: HEADLINE });
    const position = h1.compareDocumentPosition(headline);
    expect((position & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).toBe(true);
  });

  it("anchors the opening section at the accessible-by-design id", async () => {
    await renderWithRouter(<SovereignDeploymentPage />);

    const section = document.querySelector("#accessible-by-design");
    expect(section).not.toBeNull();
    expect(
      within(section as HTMLElement).getByRole("heading", {
        level: 2,
        name: HEADLINE,
      }),
    ).toBeInTheDocument();
  });
});
