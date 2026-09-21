import { SolutionsPage } from "@/pages/SolutionsPage";
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

/**
 * Accepted behavior for the seven audience sections added to the Solutions
 * page main content area. Each section must name its audience and cover the
 * problem, how Robi Care helps, and where human review occurs. Two supporting
 * documentary photos alternate sides, carry descriptive alt text, and never
 * have body text overlaid on them.
 */
const AUDIENCES: {
  id: string;
  name: string;
  challenge: RegExp;
  help: RegExp;
  review: RegExp;
}[] = [
  {
    id: "physicians",
    name: "Physicians and Medical Personnel",
    challenge: /Manual charting eats into the time available for patients/i,
    help: /captures the consultation with consent and prepares a structured draft note/i,
    review: /physician reviews, corrects and signs every note/i,
  },
  {
    id: "nursing-allied-health",
    name: "Nursing and Allied Health",
    challenge: /Handovers and observations are time-consuming to document/i,
    help: /captures structured observations and shift handovers/i,
    review: /nurse or allied health professional reviews and approves/i,
  },
  {
    id: "walk-in-family-medicine",
    name: "Walk-In and Family-Medicine Clinics",
    challenge: /High patient volume leaves little time for documentation/i,
    help: /streamlines intake and consultation notes/i,
    review:
      /clinician approves every note before it enters the patient record/i,
  },
  {
    id: "emergency-departments",
    name: "Hospital Emergency Departments",
    challenge:
      /Fast-moving, high-acuity cases require rapid, accurate documentation/i,
    help: /supports rapid, multilingual documentation and intake/i,
    review: /attending clinician reviews and authorizes records/i,
  },
  {
    id: "ems-providers",
    name: "EMS Providers",
    challenge:
      /Field documentation is difficult to capture accurately in real time/i,
    help: /captures field information and prepares structured handover records/i,
    review:
      /EMS personnel and receiving clinicians review before handover records/i,
  },
  {
    id: "hospital-administrators",
    name: "Hospital Administrators",
    challenge:
      /Limited visibility into documentation workload, cost and governance/i,
    help: /provides workflow consistency, visibility and cost accountability/i,
    review: /Administrative and clinical governance oversight is retained/i,
  },
  {
    id: "government-public-health",
    name: "Government and Public-Health Programs",
    challenge:
      /Extending consistent clinical documentation support across public health systems/i,
    help: /available through Public-Private Partnerships for national or regional programs/i,
    review: /Clinical governance remains with local healthcare institutions/i,
  },
];

function getAudienceSection(id: string): HTMLElement {
  const section = document.querySelector(
    `[data-ocid="solutions.audience.${id}"]`,
  ) as HTMLElement | null;
  expect(section).not.toBeNull();
  return section as HTMLElement;
}

describe("SolutionsPage audience sections", () => {
  it("renders the audiences section heading and exactly seven audience sections", async () => {
    await renderWithRouter(<SolutionsPage />);

    const section = document.querySelector("#audiences") as HTMLElement;
    expect(section).not.toBeNull();
    expect(
      within(section).getByRole("heading", {
        level: 2,
        name: /built for the teams who document care/i,
      }),
    ).toBeInTheDocument();

    const articles = section.querySelectorAll(
      '[data-ocid^="solutions.audience."]',
    );
    expect(articles).toHaveLength(7);
  });

  it.each(AUDIENCES)(
    "renders the $name section with problem, help, and human-review content",
    async ({ id, name, challenge, help, review }) => {
      await renderWithRouter(<SolutionsPage />);

      const article = getAudienceSection(id);
      expect(
        within(article).getByRole("heading", { level: 3, name }),
      ).toBeInTheDocument();

      expect(within(article).getByText("The challenge")).toBeInTheDocument();
      expect(within(article).getByText(challenge)).toBeInTheDocument();

      expect(
        within(article).getByText("How Robi Care helps"),
      ).toBeInTheDocument();
      expect(within(article).getByText(help)).toBeInTheDocument();

      expect(
        within(article).getByText("Where human review occurs"),
      ).toBeInTheDocument();
      expect(within(article).getByText(review)).toBeInTheDocument();
    },
  );

  it("renders the two documentary photos with non-empty descriptive alt text", async () => {
    await renderWithRouter(<SolutionsPage />);

    const expected = [
      {
        id: "physicians",
        src: "/assets/generated/audience-nurse-handover.dim_1536x1024.jpg",
        alt: /Healthcare staff in scrubs reviewing notes together during a handover briefing/i,
      },
      {
        id: "ems-providers",
        src: "/assets/generated/audience-ems-field-handover.dim_1536x1024.jpg",
        alt: /Paramedics in high-visibility jackets handing over a patient report/i,
      },
    ];

    for (const photo of expected) {
      const article = getAudienceSection(photo.id);
      const image = within(article).getByRole("img", { name: photo.alt });
      expect(image).toHaveAttribute("src", photo.src);
      expect(image.getAttribute("alt")?.trim().length ?? 0).toBeGreaterThan(0);
    }
  });

  it("places the two photos on opposite sides of their sections", async () => {
    await renderWithRouter(<SolutionsPage />);

    const physicians = getAudienceSection("physicians");
    const ems = getAudienceSection("ems-providers");

    // The article's two direct children are the copy card (<div>) and the
    // photo frame (<figure>). The side is expressed by the order utilities:
    // the copy card carries `lg:order-2` when reversed, and the photo frame
    // carries `lg:order-1` to move to the opposite side.
    const copyCard = (article: HTMLElement): HTMLElement => {
      const card = Array.from(article.children).find(
        (child) => child.tagName === "DIV",
      ) as HTMLElement | undefined;
      expect(card).toBeDefined();
      return card as HTMLElement;
    };
    const photoFrame = (article: HTMLElement): HTMLElement => {
      const figure = article.querySelector("figure") as HTMLElement | null;
      expect(figure).not.toBeNull();
      return figure as HTMLElement;
    };

    // The two photos must not sit on the same side: one section is reversed
    // relative to the other. The first image-bearing audience (physicians) is
    // not reversed; the second (ems-providers) is.
    const physiciansReversed =
      copyCard(physicians).className.includes("lg:order-2");
    const emsReversed = copyCard(ems).className.includes("lg:order-2");
    expect({ physiciansReversed, emsReversed }).toEqual({
      physiciansReversed: false,
      emsReversed: true,
    });

    // The photo frame itself must move to the opposite side in the reversed
    // section, so the two photographs genuinely alternate rather than both
    // rendering on the same side.
    expect(photoFrame(physicians).className).not.toContain("lg:order-1");
    expect(photoFrame(ems).className).toContain("lg:order-1");
  });

  it("keeps body text out of the photo frames", async () => {
    await renderWithRouter(<SolutionsPage />);

    for (const id of ["physicians", "ems-providers"]) {
      const article = getAudienceSection(id);
      const figure = article.querySelector("figure") as HTMLElement;
      expect(figure).not.toBeNull();

      // The audience name and the three body-copy labels must not live inside
      // the photo frame; only the caption may sit beside the image.
      const audience = AUDIENCES.find((entry) => entry.id === id);
      expect(audience).toBeDefined();
      expect(
        within(figure).queryByRole("heading", {
          level: 3,
          name: audience?.name,
        }),
      ).toBeNull();
      expect(within(figure).queryByText("The challenge")).toBeNull();
      expect(within(figure).queryByText("How Robi Care helps")).toBeNull();
      expect(
        within(figure).queryByText("Where human review occurs"),
      ).toBeNull();
    }
  });

  it("keeps the audience sections between the workflow-fit and closing CTA sections", async () => {
    await renderWithRouter(<SolutionsPage />);

    const workflowFit = document.querySelector("#workflow-fit") as HTMLElement;
    const audiences = document.querySelector("#audiences") as HTMLElement;
    const solutionsCta = document.querySelector(
      "#solutions-cta",
    ) as HTMLElement;

    for (const node of [workflowFit, audiences, solutionsCta]) {
      expect(node).not.toBeNull();
    }

    expect(
      workflowFit.compareDocumentPosition(audiences) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      audiences.compareDocumentPosition(solutionsCta) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
});
