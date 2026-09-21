import { ImagePanel } from "@/components/layout/ImagePanel";
import { PageHero } from "@/components/layout/PageHero";
import { HomePage } from "@/pages/HomePage";
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
    submitContactEnquiry: vi.fn(async () => ({ __kind__: "ok", ok: 1n })),
  })),
}));

/**
 * Characterization baseline for the Home page *around* the hero. The hero
 * headline, description, CTA buttons, and hero image treatment are about to
 * change intentionally, so this file deliberately does not assert them.
 * It protects the sections below the hero and the shared PageHero/ImagePanel
 * contracts the hero change must keep intact.
 */
describe("HomePage non-hero sections", () => {
  it("keeps the three-step workflow section with its steps", async () => {
    await renderWithRouter(<HomePage />);

    const section = document.querySelector("#how-it-works") as HTMLElement;
    expect(section).not.toBeNull();
    expect(
      within(section).getByRole("heading", {
        level: 2,
        name: /from consultation to clear documentation in three steps/i,
      }),
    ).toBeInTheDocument();

    for (const step of [
      "Capture the conversation",
      "Prepare structured documentation",
      "Coordinate follow-up",
    ]) {
      expect(
        within(section).getByRole("heading", { level: 3, name: step }),
      ).toBeInTheDocument();
    }
  });

  it("keeps the clinician-control section and its review guarantees", async () => {
    await renderWithRouter(<HomePage />);

    const section = document.querySelector("#clinician-control") as HTMLElement;
    expect(section).not.toBeNull();
    expect(
      within(section).getByRole("heading", {
        level: 2,
        name: /the clinician reviews and approves every output/i,
      }),
    ).toBeInTheDocument();
    expect(
      within(section).getByText(
        /every generated note is a draft until a clinician reviews and approves it/i,
      ),
    ).toBeInTheDocument();
    expect(
      within(section).getByText(
        /nothing is written to the patient record without an explicit human action/i,
      ),
    ).toBeInTheDocument();
  });

  it("keeps the platform-provenance section naming the TMU platform", async () => {
    await renderWithRouter(<HomePage />);

    const section = document.querySelector("#platform") as HTMLElement;
    expect(section).not.toBeNull();
    expect(
      within(section).getByRole("heading", {
        level: 2,
        name: /built on the tmu enablement platform/i,
      }),
    ).toBeInTheDocument();
    expect(
      within(section).getByText(
        "Powered by TMU · TeleMeetUp Enablement Platform.",
      ),
    ).toBeInTheDocument();
  });

  it("keeps the closing call-to-action band with both account actions", async () => {
    await renderWithRouter(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /bring calm documentation to your clinic/i,
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

  it("renders every Home page image with non-empty alt text", async () => {
    await renderWithRouter(<HomePage />);

    const images = document.querySelectorAll("img");
    expect(images.length).toBeGreaterThanOrEqual(1);
    for (const image of images) {
      expect(image.getAttribute("alt")?.trim().length ?? 0).toBeGreaterThan(0);
    }
  });

  it("keeps the existing sections in their current top-to-bottom order", async () => {
    await renderWithRouter(<HomePage />);

    // The hero is the first section on the page; the three content sections
    // and the closing CTA band follow in this order. A new audience section is
    // expected between the hero and "How it works", so this pins the relative
    // order of the existing sections rather than their absolute positions.
    const hero = document.querySelector(
      '[data-ocid="home.hero"]',
    ) as HTMLElement;
    const howItWorks = document.querySelector("#how-it-works") as HTMLElement;
    const clinicianControl = document.querySelector(
      "#clinician-control",
    ) as HTMLElement;
    const platform = document.querySelector("#platform") as HTMLElement;
    const ctaBand = document.querySelector(
      '[data-ocid="cta.primary_button"]',
    ) as HTMLElement;

    for (const node of [
      hero,
      howItWorks,
      clinicianControl,
      platform,
      ctaBand,
    ]) {
      expect(node).not.toBeNull();
    }

    const ordered = [hero, howItWorks, clinicianControl, platform, ctaBand];
    for (let i = 1; i < ordered.length; i += 1) {
      const previous = ordered[i - 1];
      const current = ordered[i];
      // Node.DOCUMENT_POSITION_FOLLOWING === 4: `current` comes after
      // `previous` in document order.
      expect(
        previous.compareDocumentPosition(current) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    }
  });
});

describe("PageHero shared contract", () => {
  it("renders the title as the page h1 with eyebrow and description", () => {
    renderWithProviders(
      <PageHero
        eyebrow="Eyebrow label"
        title="A page title"
        description="A supporting description."
        image={{ src: "/photo.jpg", alt: "A described photograph." }}
      />,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "A page title" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Eyebrow label")).toBeInTheDocument();
    expect(screen.getByText("A supporting description.")).toBeInTheDocument();
  });

  it("renders the supplied image with its alt text and any children", () => {
    renderWithProviders(
      <PageHero
        eyebrow="Eyebrow"
        title="Title"
        description="Description"
        image={{ src: "/photo.jpg", alt: "A described photograph." }}
      >
        <a href="/somewhere">A child action</a>
      </PageHero>,
    );

    expect(
      screen.getByRole("img", { name: "A described photograph." }),
    ).toHaveAttribute("src", "/photo.jpg");
    expect(
      screen.getByRole("link", { name: "A child action" }),
    ).toBeInTheDocument();
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
    // The caption is a sibling of the image, not a descendant of it.
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
