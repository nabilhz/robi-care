import { TmuKlServiceSection } from "@/components/keyboard/TmuKlServiceSection";
import { KeyboardLiberationPage } from "@/pages/KeyboardLiberationPage";
import { renderWithProviders, renderWithRouter } from "@/test/helpers";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

const VIDEO_ID = "awLL16O-bXM";
const POSTER_SRC = `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`;

/**
 * Cover for the accepted TMU-KL Keyboard Liberation Service section: its
 * placement between the intro and workflow sections, the heading style, the
 * inline click-to-play video, the four clinician benefit cards, the governance
 * copy, and the absence of a call-to-action. jsdom has no layout engine, so the
 * 16:9 box and the responsive stacking are asserted through the classes that
 * carry them rather than through measured geometry.
 */
describe("TMU-KL section placement", () => {
  it("renders between the intro section and the workflow section", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    const intro = document.querySelector(
      "#keyboard-liberation-intro",
    ) as HTMLElement;
    const tmuKl = document.querySelector("#tmu-kl-service") as HTMLElement;
    const workflow = document.querySelector(
      "#keyboard-liberation-workflow",
    ) as HTMLElement;

    for (const node of [intro, tmuKl, workflow]) {
      expect(node).not.toBeNull();
    }

    const ordered = [intro, tmuKl, workflow];
    for (let i = 1; i < ordered.length; i += 1) {
      expect(
        ordered[i - 1].compareDocumentPosition(ordered[i]) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    }
  });

  it("shows the accepted heading in the page's existing section heading style", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    const tmuKl = document.querySelector("#tmu-kl-service") as HTMLElement;
    const heading = within(tmuKl).getByRole("heading", {
      level: 2,
      name: "TMU-KL Keyboard Liberation Service",
    });
    // SectionHeading renders the same h2 classes used by every other section.
    expect(heading.className).toContain("text-3xl");
    expect(heading.className).toContain("font-semibold");
    expect(heading.className).toContain("text-foreground");
  });
});

describe("TMU-KL inline video", () => {
  it("shows a 16:9 video box with the YouTube thumbnail as its poster", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    const tmuKl = document.querySelector("#tmu-kl-service") as HTMLElement;
    const poster = within(tmuKl).getByRole("img", {
      name: /video thumbnail/i,
    });
    expect(poster).toHaveAttribute("src", POSTER_SRC);

    // The poster sits inside an aspect-video (16:9) frame.
    const frame = poster.closest(".aspect-video") as HTMLElement;
    expect(frame).not.toBeNull();
  });

  it("shows a visible play control before activation", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    const tmuKl = document.querySelector("#tmu-kl-service") as HTMLElement;
    const playButton = within(tmuKl).getByRole("button", {
      name: /play video/i,
    });
    expect(playButton).toBeInTheDocument();
    // No iframe is requested from YouTube until the visitor presses play.
    expect(tmuKl.querySelector("iframe")).toBeNull();
  });

  it("starts inline playback on the page when the poster is clicked", async () => {
    const user = userEvent.setup();
    await renderWithRouter(<KeyboardLiberationPage />);

    const tmuKl = document.querySelector("#tmu-kl-service") as HTMLElement;
    await user.click(
      within(tmuKl).getByRole("button", { name: /play video/i }),
    );

    const iframe = tmuKl.querySelector("iframe") as HTMLIFrameElement;
    expect(iframe).not.toBeNull();
    expect(iframe.getAttribute("src")).toContain(
      `youtube-nocookie.com/embed/${VIDEO_ID}`,
    );
    expect(iframe.getAttribute("src")).toContain("autoplay=1");
    // Playback replaces the poster in place; the play control is gone.
    expect(
      within(tmuKl).queryByRole("button", { name: /play video/i }),
    ).toBeNull();
  });
});

describe("TMU-KL benefit cards", () => {
  it("renders four benefit cards in the existing icon-card style", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    const tmuKl = document.querySelector("#tmu-kl-service") as HTMLElement;
    const cards = [1, 2, 3, 4].map(
      (index) =>
        tmuKl.querySelector(
          `[data-ocid="keyboard.benefit.${index}"]`,
        ) as HTMLElement,
    );
    for (const card of cards) {
      expect(card).not.toBeNull();
      // Same card treatment as the existing "4 STEPS" icon cards.
      expect(card.className).toContain("rounded-xl");
      expect(card.className).toContain("bg-card");
      expect(card.querySelector("svg")).not.toBeNull();
      expect(
        within(card).getByRole("heading", { level: 4 }),
      ).toBeInTheDocument();
    }
  });

  it("covers speech capture, structuring, drafting, and reduced burden", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    const tmuKl = document.querySelector("#tmu-kl-service") as HTMLElement;
    const text = tmuKl.textContent ?? "";
    expect(text).toMatch(/captured naturally through speech/i);
    expect(text).toMatch(/automatically structured/i);
    expect(text).toMatch(/draft notes, orders, and follow-up scheduling/i);
    expect(text).toMatch(/administrative burden drops/i);
  });
});

describe("TMU-KL governance copy", () => {
  it("states the assist-only scope and clinician sign-off", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    const tmuKl = document.querySelector("#tmu-kl-service") as HTMLElement;
    const text = tmuKl.textContent ?? "";
    expect(text).toMatch(/assists with documentation and drafting only/i);
    expect(text).toMatch(
      /qualified clinician reviews and approves all clinical content/i,
    );
    expect(text).toContain("AI may assist. The clinician decides.");
  });
});

describe("TMU-KL section has no call to action", () => {
  it("renders no button or link inside the new section", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    const tmuKl = document.querySelector("#tmu-kl-service") as HTMLElement;
    // The only button is the video play control; there is no CTA link.
    expect(within(tmuKl).queryAllByRole("link")).toHaveLength(0);
    const buttons = within(tmuKl).queryAllByRole("button");
    expect(buttons).toHaveLength(1);
    expect(buttons[0]).toHaveAccessibleName(/play video/i);
  });
});

describe("TmuKlServiceSection shared contract", () => {
  it("renders standalone with its heading, poster, and four cards", () => {
    renderWithProviders(<TmuKlServiceSection />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "TMU-KL Keyboard Liberation Service",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /video thumbnail/i }),
    ).toHaveAttribute("src", POSTER_SRC);
    for (const index of [1, 2, 3, 4]) {
      expect(
        document.querySelector(`[data-ocid="keyboard.benefit.${index}"]`),
      ).not.toBeNull();
    }
  });
});
