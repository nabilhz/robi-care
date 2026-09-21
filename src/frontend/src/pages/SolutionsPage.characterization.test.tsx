import { ImagePanel } from "@/components/layout/ImagePanel";
import { Section, SectionHeading } from "@/components/layout/Section";
import { SolutionsPage } from "@/pages/SolutionsPage";
import { renderWithProviders, renderWithRouter } from "@/test/helpers";
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
    submitContactEnquiry: vi.fn(async () => ({ __kind: "ok", ok: 1n })),
  })),
}));

/**
 * Characterization baseline for the Solutions page *around* the intended
 * change. Seven audience sections and two supporting photographs now sit in
 * the main content area between the hero and the closing CTA. This file
 * protects the pre-existing hero, use-cases, workflow-fit, and CTA content,
 * the relative order of those existing sections, and the shared layout
 * contracts the additions must keep intact. The new audience sections
 * themselves are covered by SolutionsPage.audiences.test.tsx.
 */
describe("SolutionsPage existing sections", () => {
  it("keeps the hero with its eyebrow, title, description, and caption", async () => {
    await renderWithRouter(<SolutionsPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /clinical use cases, handled with care/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Solutions")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Robi Care supports three parts of the clinical encounter/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Each solution is designed to sit inside existing clinical workflows, not replace them\./i,
      ),
    ).toBeInTheDocument();
  });

  it("keeps the use-cases section with its heading and three solution cards", async () => {
    await renderWithRouter(<SolutionsPage />);

    const section = document.querySelector("#use-cases") as HTMLElement;
    expect(section).not.toBeNull();
    expect(
      within(section).getByRole("heading", {
        level: 2,
        name: /where robi care helps most/i,
      }),
    ).toBeInTheDocument();

    const cards = section.querySelectorAll('[data-ocid^="solutions.card."]');
    expect(cards).toHaveLength(3);

    for (const title of [
      "Conversation capture",
      "Structured documentation",
      "Follow-up coordination",
    ]) {
      expect(
        within(section).getByRole("heading", { level: 3, name: title }),
      ).toBeInTheDocument();
    }
  });

  it("keeps each solution card's description and bullet points", async () => {
    await renderWithRouter(<SolutionsPage />);

    const section = document.querySelector("#use-cases") as HTMLElement;
    expect(section).not.toBeNull();

    const expectations: {
      id: string;
      description: RegExp;
      points: string[];
    }[] = [
      {
        id: "conversation-capture",
        description: /Turn the spoken consultation into an accurate/i,
        points: [
          "Runs alongside the visit rather than replacing it",
          "Speaker-aware transcript for clear attribution",
          "Works for in-room and remote consultations",
        ],
      },
      {
        id: "structured-documentation",
        description: /Organise the transcript into the note structure/i,
        points: [
          "History, findings, assessment, and plan sections",
          "Draft notes that stay editable until approved",
          "Consistent structure across the whole clinical team",
        ],
      },
      {
        id: "follow-up-coordination",
        description: /Surface referrals, recalls, and next appointments/i,
        points: [
          "Action list generated from the consultation",
          "Referrals and recalls captured in one place",
          "Clear ownership for every follow-up step",
        ],
      },
    ];

    for (const expected of expectations) {
      const card = section.querySelector(
        `[data-ocid="solutions.card.${expected.id}"]`,
      ) as HTMLElement;
      expect(card).not.toBeNull();
      expect(within(card).getByText(expected.description)).toBeInTheDocument();
      for (const point of expected.points) {
        expect(within(card).getByText(point)).toBeInTheDocument();
      }
    }
  });

  it("keeps the workflow-fit section with its heading and three panels", async () => {
    await renderWithRouter(<SolutionsPage />);

    const section = document.querySelector("#workflow-fit") as HTMLElement;
    expect(section).not.toBeNull();
    expect(
      within(section).getByRole("heading", {
        level: 2,
        name: /it fits the workflow you already have/i,
      }),
    ).toBeInTheDocument();

    for (const panel of [
      "No new clinical process",
      "Judgement stays clinical",
      "One platform underneath",
    ]) {
      expect(
        within(section).getByRole("heading", { level: 3, name: panel }),
      ).toBeInTheDocument();
    }
    expect(
      within(section).getByText(
        /Robi Care runs on the TMU · TeleMeetUp Enablement Platform/i,
      ),
    ).toBeInTheDocument();
  });

  it("keeps the closing call-to-action section with both actions", async () => {
    await renderWithRouter(<SolutionsPage />);

    const section = document.querySelector("#solutions-cta") as HTMLElement;
    expect(section).not.toBeNull();
    expect(
      within(section).getByRole("heading", {
        level: 2,
        name: /see how robi care fits your clinic/i,
      }),
    ).toBeInTheDocument();

    const getStarted = document.querySelector(
      '[data-ocid="solutions.primary_button"]',
    ) as HTMLAnchorElement;
    const contact = document.querySelector(
      '[data-ocid="solutions.secondary_button"]',
    ) as HTMLAnchorElement;
    expect(getStarted).not.toBeNull();
    expect(contact).not.toBeNull();
    expect(getStarted).toHaveAttribute(
      "href",
      "https://app.telemeetup.com/register",
    );
    expect(contact).toHaveAttribute("href", "/contact");
  });

  it("keeps the closing CtaBand with both account actions", async () => {
    await renderWithRouter(<SolutionsPage />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /documentation that supports clinical care/i,
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

  it("keeps the existing sections in their current relative order", async () => {
    await renderWithRouter(<SolutionsPage />);

    // New audience sections are expected between the hero and the CTA, so this
    // pins the relative order of the existing sections rather than their
    // absolute positions.
    const hero = screen.getByRole("heading", { level: 1 });
    const useCases = document.querySelector("#use-cases") as HTMLElement;
    const workflowFit = document.querySelector("#workflow-fit") as HTMLElement;
    const solutionsCta = document.querySelector(
      "#solutions-cta",
    ) as HTMLElement;
    const ctaBand = document.querySelector(
      '[data-ocid="cta.primary_button"]',
    ) as HTMLElement;

    for (const node of [useCases, workflowFit, solutionsCta, ctaBand]) {
      expect(node).not.toBeNull();
    }

    const ordered = [hero, useCases, workflowFit, solutionsCta, ctaBand];
    for (let i = 1; i < ordered.length; i += 1) {
      expect(
        ordered[i - 1].compareDocumentPosition(ordered[i]) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    }
  });

  it("renders every Solutions page image with non-empty alt text", async () => {
    await renderWithRouter(<SolutionsPage />);

    const images = document.querySelectorAll("img");
    expect(images.length).toBeGreaterThanOrEqual(1);
    for (const image of images) {
      expect(image.getAttribute("alt")?.trim().length ?? 0).toBeGreaterThan(0);
    }
  });
});

describe("Section shared contract", () => {
  it("renders the id, heading, and description inside a section element", () => {
    renderWithProviders(
      <Section id="a-section">
        <SectionHeading
          eyebrow="An eyebrow"
          title="A section title"
          description="A section description."
        />
      </Section>,
    );

    const section = document.querySelector("#a-section") as HTMLElement;
    expect(section).not.toBeNull();
    expect(section.tagName).toBe("SECTION");
    expect(
      within(section).getByRole("heading", {
        level: 2,
        name: "A section title",
      }),
    ).toBeInTheDocument();
    expect(within(section).getByText("An eyebrow")).toBeInTheDocument();
    expect(
      within(section).getByText("A section description."),
    ).toBeInTheDocument();
  });

  it("omits the description paragraph when none is supplied", () => {
    renderWithProviders(
      <Section>
        <SectionHeading eyebrow="An eyebrow" title="A section title" />
      </Section>,
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "A section title" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("A section description."),
    ).not.toBeInTheDocument();
  });
});

describe("ImagePanel shared contract", () => {
  it("keeps the caption in a separate figcaption, never over the photo", () => {
    renderWithProviders(
      <ImagePanel
        src="/photo.jpg"
        alt="A described photograph."
        caption="A caption beside the photo."
      />,
    );

    const figure = document.querySelector("figure") as HTMLElement;
    const image = within(figure).getByRole("img", {
      name: "A described photograph.",
    });
    const caption = within(figure).getByText("A caption beside the photo.");

    expect(caption.tagName).toBe("FIGCAPTION");
    expect(image.contains(caption)).toBe(false);
    expect(caption.contains(image)).toBe(false);
  });

  it("omits the caption panel when no caption is supplied", () => {
    renderWithProviders(
      <ImagePanel src="/photo.jpg" alt="A described photograph." />,
    );

    expect(document.querySelector("figcaption")).toBeNull();
    expect(
      screen.getByRole("img", { name: "A described photograph." }),
    ).toBeInTheDocument();
  });
});
