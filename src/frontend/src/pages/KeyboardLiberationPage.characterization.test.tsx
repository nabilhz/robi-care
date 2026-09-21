import { BeforeAfter } from "@/components/keyboard/BeforeAfter";
import { ImagePanel } from "@/components/layout/ImagePanel";
import { PageHero } from "@/components/layout/PageHero";
import { KeyboardLiberationPage } from "@/pages/KeyboardLiberationPage";
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
 * Characterization baseline for the Keyboard Liberation page *around* the
 * intended change. The page's main content area — headline, narrative copy,
 * hero photo placement, the workflow diagram, and the Topol note — is about to
 * be rewritten intentionally, so this file deliberately does not assert that
 * copy. It protects the parts the request does not change: the PageHero, the
 * "The problem" BeforeAfter comparison, the proof points, the closing CtaBand,
 * the image alt-text contract, and the relative order of those existing
 * sections. The shared PageHero/ImagePanel/BeforeAfter contracts the rewrite
 * must keep intact are pinned here too.
 */
describe("KeyboardLiberationPage existing sections", () => {
  it("keeps the hero with its eyebrow, title, description, and caption", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    const hero = screen
      .getByRole("heading", {
        level: 1,
        name: /clinicians should work by speaking, not typing/i,
      })
      .closest("section") as HTMLElement;
    expect(hero).not.toBeNull();
    // The accepted intro section reuses the "Keyboard liberation" eyebrow, so
    // scope this to the hero rather than matching the whole page.
    expect(within(hero).getByText("Keyboard liberation")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Robi Care captures the consultation as speech and prepares a structured note from it/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /The consultation stays a conversation\. Capture happens in the background/i,
      ),
    ).toBeInTheDocument();
  });

  it("keeps the hero's Get Started action pointing at the account system", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    const getStarted = document.querySelector(
      '[data-ocid="keyboard.primary_button"]',
    ) as HTMLAnchorElement;
    expect(getStarted).not.toBeNull();
    expect(getStarted).toHaveAttribute(
      "href",
      "https://app.telemeetup.com/register",
    );
  });

  it("keeps the problem section with its heading and BeforeAfter comparison", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /documentation has quietly become the second job/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("The problem")).toBeInTheDocument();

    const before = document.querySelector(
      '[data-ocid="keyboard.comparison.before"]',
    ) as HTMLElement;
    const after = document.querySelector(
      '[data-ocid="keyboard.comparison.after"]',
    ) as HTMLElement;
    expect(before).not.toBeNull();
    expect(after).not.toBeNull();

    expect(
      within(before).getByRole("heading", {
        level: 3,
        name: /keyboard-bound documentation/i,
      }),
    ).toBeInTheDocument();
    expect(
      within(after).getByRole("heading", {
        level: 3,
        name: /speech-driven documentation/i,
      }),
    ).toBeInTheDocument();
  });

  it("keeps the four before/after comparison items on each side", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    const before = document.querySelector(
      '[data-ocid="keyboard.comparison.before"]',
    ) as HTMLElement;
    const after = document.querySelector(
      '[data-ocid="keyboard.comparison.after"]',
    ) as HTMLElement;

    for (const label of [
      "Eyes on the screen",
      "Notes written after the fact",
      "Repetitive strain",
      "Inconsistent structure",
    ]) {
      expect(within(before).getByText(label)).toBeInTheDocument();
    }
    for (const label of [
      "Eyes on the patient",
      "Notes drafted in the moment",
      "Voice instead of keystrokes",
      "One consistent structure",
    ]) {
      expect(within(after).getByText(label)).toBeInTheDocument();
    }
  });

  it("keeps the proof-points section with its heading and three points", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /what changes when the keyboard steps aside/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Proof points")).toBeInTheDocument();

    for (const point of [
      "Documentation without a keyboard",
      "Every note approved before use",
      "Consistent structure across the clinic",
    ]) {
      expect(screen.getByText(point)).toBeInTheDocument();
    }
  });

  it("keeps the supporting photograph with its caption beside the proof points", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    expect(
      screen.getByRole("img", {
        name: /A clinician in a white coat walking mid-stride down a bright hospital corridor/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Speech-driven capture is a workflow change, not a new way of practising medicine/i,
      ),
    ).toBeInTheDocument();
  });

  it("keeps the closing CtaBand with both account actions", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /give your clinicians their attention back/i,
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

  it("renders every Keyboard Liberation image with non-empty alt text", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    const images = document.querySelectorAll("img");
    expect(images.length).toBeGreaterThanOrEqual(1);
    for (const image of images) {
      expect(image.getAttribute("alt")?.trim().length ?? 0).toBeGreaterThan(0);
    }
  });

  it("keeps the existing sections in their current relative order", async () => {
    await renderWithRouter(<KeyboardLiberationPage />);

    // The main content area between the hero and the closing CTA is expected
    // to change, so this pins the relative order of the existing sections
    // rather than their absolute positions.
    const hero = screen.getByRole("heading", { level: 1 });
    const problem = screen.getByRole("heading", {
      level: 2,
      name: /documentation has quietly become the second job/i,
    });
    const proofPoints = screen.getByRole("heading", {
      level: 2,
      name: /what changes when the keyboard steps aside/i,
    });
    const ctaBand = document.querySelector(
      '[data-ocid="cta.primary_button"]',
    ) as HTMLElement;

    for (const node of [hero, problem, proofPoints, ctaBand]) {
      expect(node).not.toBeNull();
    }

    const ordered = [hero, problem, proofPoints, ctaBand];
    for (let i = 1; i < ordered.length; i += 1) {
      expect(
        ordered[i - 1].compareDocumentPosition(ordered[i]) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    }
  });
});

describe("BeforeAfter shared contract", () => {
  it("renders both comparison cards with their items", () => {
    renderWithProviders(
      <BeforeAfter
        before={[{ label: "Before label", detail: "Before detail." }]}
        after={[{ label: "After label", detail: "After detail." }]}
      />,
    );

    const before = document.querySelector(
      '[data-ocid="keyboard.comparison.before"]',
    ) as HTMLElement;
    const after = document.querySelector(
      '[data-ocid="keyboard.comparison.after"]',
    ) as HTMLElement;
    expect(before).not.toBeNull();
    expect(after).not.toBeNull();
    expect(within(before).getByText("Before label")).toBeInTheDocument();
    expect(within(before).getByText("Before detail.")).toBeInTheDocument();
    expect(within(after).getByText("After label")).toBeInTheDocument();
    expect(within(after).getByText("After detail.")).toBeInTheDocument();
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
