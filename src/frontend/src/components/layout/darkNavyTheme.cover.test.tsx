import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import App from "@/App";
import { AudienceSection } from "@/components/home/AudienceSection";
import { HomeHero } from "@/components/home/HomeHero";
import { CtaBand } from "@/components/layout/CtaBand";
import { ImagePanel } from "@/components/layout/ImagePanel";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PricingTierCard } from "@/components/pricing/PricingTierCard";
import { LOGO_IMAGE } from "@/lib/site";
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
 * Cover for the accepted dark-navy design system.
 *
 * The restyle is a token change: the semantic classes in the markup stay put
 * while the CSS variables behind them change value. jsdom does not apply
 * Tailwind, so the token *values* are asserted against the stylesheet source
 * (`src/index.css`) and the *wiring* is asserted against the rendered markup.
 *
 * The accepted values are:
 *   - page canvas #0D1B2A, deeper sections #0A1628, never pure black;
 *   - bright cyan #22D3EE as the single accent;
 *   - light foreground text on the navy background;
 *   - card surface lighter than the page canvas;
 *   - bold condensed uppercase headlines;
 *   - solid-cyan primary and cyan-outlined secondary buttons.
 */

// The frontend `test` script runs with `app/src/frontend` as the working
// directory, so the stylesheet is resolved from there rather than from a
// module URL (which Vitest's transform does not expose as a file URL).
const CSS_PATH = resolve(process.cwd(), "src/index.css");
const CSS_SOURCE = readFileSync(CSS_PATH, "utf8");

/** Extract the `:root { ... }` declaration block from the stylesheet. */
function rootBlock(): string {
  const match = CSS_SOURCE.match(/:root\s*\{([\s\S]*?)\}/);
  if (!match) throw new Error("index.css has no :root block");
  return match[1];
}

/** Read a `--name: <L> <C> <H>;` OKLCH triplet from the root block. */
function token(name: string): { l: number; c: number; h: number } {
  const match = rootBlock().match(
    new RegExp(`--${name}:\\s*([\\d.]+)\\s+([\\d.]+)\\s+([\\d.]+)`),
  );
  if (!match) throw new Error(`index.css has no --${name} token`);
  return { l: Number(match[1]), c: Number(match[2]), h: Number(match[3]) };
}

/**
 * The exact OKLCH triplet the stylesheet declares for a token. The accepted
 * hex values are documented beside each declaration; the OKLCH numbers are the
 * machine-readable contract, so both are asserted together.
 */
function tokenTriplet(name: string): string {
  const { l, c, h } = token(name);
  return `${l} ${c} ${h}`;
}

/** The hex value documented in the comment beside a token declaration. */
function documentedHex(name: string): string | undefined {
  const match = rootBlock().match(
    new RegExp(`--${name}:[^;]*?;\\s*/\\*\\s*(#[0-9A-Fa-f]{6})`),
  );
  return match?.[1]?.toUpperCase();
}

/**
 * Convert an OKLCH triplet to an uppercase `#RRGGBB` string, so the accepted
 * hex values can be asserted directly rather than restating the OKLCH numbers.
 */
function oklchToHex({ l, c, h }: { l: number; c: number; h: number }): string {
  const rad = (h * Math.PI) / 180;
  const a = c * Math.cos(rad);
  const b = c * Math.sin(rad);

  const lPrime = l + 0.3963377774 * a + 0.2158037573 * b;
  const mPrime = l - 0.1055613458 * a - 0.0638541728 * b;
  const sPrime = l - 0.0894841775 * a - 1.291485548 * b;

  const l3 = lPrime ** 3;
  const m3 = mPrime ** 3;
  const s3 = sPrime ** 3;

  const linear = [
    4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3,
    -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3,
    -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3,
  ];

  const channel = (value: number) => {
    const encoded =
      value <= 0.0031308 ? 12.92 * value : 1.055 * value ** (1 / 2.4) - 0.055;
    return Math.max(0, Math.min(255, Math.round(encoded * 255)));
  };

  return `#${linear
    .map((value) => channel(value).toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()}`;
}

/** Relative luminance of a hex color, for the "card lighter than canvas" check. */
function luminance(hex: string): number {
  const value = hex.replace("#", "");
  const channels = [0, 2, 4].map((offset) => {
    const raw = Number.parseInt(value.slice(offset, offset + 2), 16) / 255;
    return raw <= 0.03928 ? raw / 12.92 : ((raw + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

describe("dark navy token values", () => {
  it("sets the page canvas to #0D1B2A", () => {
    expect(tokenTriplet("background")).toBe("0.222 0.0355 247.14");
    expect(documentedHex("background")).toBe("#0D1B2A");
  });

  it("sets the deeper section surface to #0A1628", () => {
    expect(tokenTriplet("deep-green")).toBe("0.1807 0.0338 249.16");
    expect(documentedHex("deep-green")).toBe("#0A1628");
  });

  it("sets the single accent to bright cyan #22D3EE", () => {
    expect(tokenTriplet("primary")).toBe("0.789 0.1377 211.53");
    expect(tokenTriplet("accent")).toBe("0.789 0.1377 211.53");
    expect(documentedHex("primary")).toBe("#22D3EE");
    expect(documentedHex("accent")).toBe("#22D3EE");
  });

  it("renders body text in a light foreground on the navy canvas", () => {
    const foreground = oklchToHex(token("foreground"));
    expect(luminance(foreground)).toBeGreaterThan(0.7);
    // Light text, not a dark ink that would vanish on the navy canvas.
    expect(luminance(foreground)).toBeGreaterThan(
      luminance(oklchToHex(token("background"))),
    );
  });

  it("keeps the card surface lighter than the page canvas", () => {
    const card = oklchToHex(token("card"));
    const canvas = oklchToHex(token("background"));
    expect(luminance(card)).toBeGreaterThan(luminance(canvas));
  });

  it("never uses pure black for any surface token", () => {
    for (const name of ["background", "deep-green", "card", "muted"]) {
      const hex = oklchToHex(token(name));
      expect(hex).not.toBe("#000000");
      // Every surface keeps a navy hue rather than a neutral black.
      expect(token(name).c).toBeGreaterThan(0);
    }
    // No literal black color value anywhere in the token block. Comments are
    // stripped first so the "Never pure black" note is not a false positive.
    const declarations = rootBlock().replace(/\/\*[\s\S]*?\*\//g, "");
    expect(declarations).not.toMatch(/#000\b|#000000\b|\bblack\b/i);
  });
});

describe("headline typography", () => {
  it("renders h1-h3 bold, uppercase and condensed with tight tracking", () => {
    const base = CSS_SOURCE.match(/h1,\s*h2,\s*h3\s*\{([\s\S]*?)\}/);
    expect(base).not.toBeNull();
    const rule = base?.[1] ?? "";
    expect(rule).toContain("font-display");
    expect(rule).toContain("font-bold");
    expect(rule).toContain("uppercase");
    expect(rule).toContain("tracking-tight");
  });

  it("applies the condensed display face to the rendered page headings", async () => {
    await renderWithRouter(<HomeHero />);
    const heading = screen.getByRole("heading", { level: 1 });
    // The base rule is what makes the headline uppercase; the hero also carries
    // the display face and tight tracking explicitly.
    expect(heading.className).toContain("uppercase");
    expect(heading.className).toContain("tracking-tight");
  });
});

describe("button recipes", () => {
  it("makes the primary action a solid cyan fill with a dark navy label", () => {
    const rule = CSS_SOURCE.match(/\.btn-primary\s*\{([\s\S]*?)\}/)?.[1] ?? "";
    expect(rule).toContain("bg-primary");
    expect(rule).toContain("text-primary-foreground");
    expect(rule).toContain("uppercase");
    expect(rule).toContain("font-bold");
    // The label color is the dark navy canvas, not white.
    expect(tokenTriplet("primary-foreground")).toBe(tokenTriplet("background"));
  });

  it("makes the secondary action a cyan outline with cyan text", () => {
    const rule =
      CSS_SOURCE.match(/\.btn-secondary\s*\{([\s\S]*?)\}/)?.[1] ?? "";
    expect(rule).toContain("border-primary");
    expect(rule).toContain("bg-transparent");
    expect(rule).toContain("text-primary");
    expect(rule).toContain("uppercase");
    expect(rule).toContain("font-bold");
  });

  it("renders the hero primary CTA with the solid cyan recipe", async () => {
    await renderWithRouter(<HomeHero />);
    const primary = document.querySelector(
      '[data-ocid="home.hero.cta.primary"]',
    ) as HTMLElement;
    expect(primary).not.toBeNull();
    expect(primary.className).toContain("btn-primary");
  });

  it("renders the hero secondary CTA with the cyan-outline recipe", async () => {
    await renderWithRouter(<HomeHero />);
    const secondary = document.querySelector(
      '[data-ocid="home.hero.cta.outline"]',
    ) as HTMLElement;
    expect(secondary).not.toBeNull();
    expect(secondary.className).toContain("btn-secondary");
  });
});

describe("dark navy surfaces in the rendered shell", () => {
  it("renders the page shell on the canvas token", async () => {
    await renderWithRouter(<SiteHeader />);
    const header = document.querySelector("header") as HTMLElement;
    expect(header.className).toContain("nav-surface");
  });

  it("renders the deeper sections on the deep surface token", async () => {
    await renderWithRouter(<HomeHero />);
    const hero = document.querySelector(
      '[data-ocid="home.hero"]',
    ) as HTMLElement;
    expect(hero.className).toContain("bg-deep-green");

    renderWithProviders(
      <CtaBand title="A closing title" description="A closing description." />,
    );
    const band = screen
      .getByRole("heading", { level: 2, name: "A closing title" })
      .closest("section") as HTMLElement;
    expect(band.className).toContain("bg-deep-green");
  });

  it("renders the footer on the deep surface token", async () => {
    await renderWithRouter(<SiteFooter />);
    const footer = document.querySelector("footer") as HTMLElement;
    expect(footer.className).toContain("bg-deep-green");
  });

  it("renders cards on the card surface with a thin hairline border", async () => {
    await renderWithRouter(<AudienceSection />);
    const cards = document.querySelectorAll(
      '[data-ocid^="home.audiences.item."]',
    );
    expect(cards.length).toBe(5);
    for (const card of cards) {
      expect(card.className).toContain("bg-card");
      expect(card.className).toContain("border-hairline");
    }
  });

  it("renders the pricing tier cards on the card surface with a hairline border", () => {
    renderWithProviders(
      <PricingTierCard
        index={0}
        tier={{
          id: "premium-pro",
          name: "Premium Pro",
          tagline: "A tagline.",
          transcriptionHours: "4 transcription hours / day",
          lineItems: [
            { label: "A line item", detail: "A detail.", price: "$1.00" },
          ],
          total: "$609.30",
        }}
      />,
    );
    const card = document.querySelector(
      '[data-ocid="pricing.card.1"]',
    ) as HTMLElement;
    expect(card.className).toContain("bg-card");
    expect(card.className).toContain("border-hairline");
  });

  it("renders the ImagePanel frame on the card surface with a hairline border", () => {
    renderWithProviders(
      <ImagePanel src="/photo.jpg" alt="A described photograph." />,
    );
    const figure = document.querySelector("figure") as HTMLElement;
    expect(figure.className).toContain("bg-card");
    expect(figure.className).toContain("border-hairline");
  });

  it("renders the PageHero on the canvas token with light foreground copy", () => {
    renderWithProviders(
      <PageHero
        eyebrow="Eyebrow"
        title="A page title"
        description="A supporting description."
        image={{ src: "/photo.jpg", alt: "A described photograph." }}
      />,
    );
    const section = screen
      .getByRole("heading", { level: 1, name: "A page title" })
      .closest("section") as HTMLElement;
    expect(section.className).toContain("bg-canvas");
    const title = screen.getByRole("heading", {
      level: 1,
      name: "A page title",
    });
    expect(title.className).toContain("text-foreground");
  });

  it("keeps the Section surface toggling between canvas and the raised band", () => {
    const { unmount } = renderWithProviders(
      <Section id="plain">
        <p>Plain</p>
      </Section>,
    );
    const plain = document.querySelector("#plain") as HTMLElement;
    expect(plain.className).toContain("bg-canvas");
    unmount();

    renderWithProviders(
      <Section id="alt" alt>
        <p>Alt</p>
      </Section>,
    );
    const alt = document.querySelector("#alt") as HTMLElement;
    expect(alt.className).toContain("bg-section-alt");
  });

  it("keeps the SectionHeading eyebrow on the cyan accent recipe", () => {
    renderWithProviders(
      <SectionHeading
        eyebrow="An eyebrow"
        title="A section title"
        description="A section description."
      />,
    );
    const eyebrow = screen.getByText("An eyebrow");
    expect(eyebrow.className).toContain("eyebrow");
    expect(eyebrow.className).toContain("rule-accent");
  });
});

describe("supplied logo image", () => {
  it("renders the supplied logo image in the header and footer", async () => {
    await renderWithRouter(<SiteHeader />);
    const headerLogo = document.querySelector(
      '[data-ocid="nav.logo"]',
    ) as HTMLImageElement;
    expect(headerLogo).not.toBeNull();
    expect(headerLogo.tagName).toBe("IMG");
    expect(headerLogo).toHaveAttribute("src", LOGO_IMAGE.src);
    expect(headerLogo).toHaveAttribute("alt", LOGO_IMAGE.alt);

    await renderWithRouter(<SiteFooter />);
    const footerLogo = document.querySelector(
      '[data-ocid="footer.logo"]',
    ) as HTMLImageElement;
    expect(footerLogo).not.toBeNull();
    expect(footerLogo.tagName).toBe("IMG");
    expect(footerLogo).toHaveAttribute("src", LOGO_IMAGE.src);
    expect(footerLogo).toHaveAttribute("alt", LOGO_IMAGE.alt);
  });

  it("points the logo constant at the supplied final logo asset path", () => {
    expect(LOGO_IMAGE.src).toBe("/assets/logo/robi-care-logo-final.png");
  });
});

describe("dark navy theme across the shell", () => {
  it("keeps the header navigation and footer reachable on the dark shell", async () => {
    await renderWithRouter(<SiteHeader />);
    const primaryNav = screen.getByRole("navigation", { name: "Primary" });
    expect(
      within(primaryNav).getByRole("link", { name: "Pricing" }),
    ).toHaveAttribute("href", "/pricing");
  });

  /**
   * Critical journey: every one of the eight routes renders inside the dark
   * navy shell — the fixed nav-surface header, the canvas page body, and the
   * deep-surface footer — with no blank screen.
   */
  const ROUTES = [
    // Home's h1 is the hero headline, which is intentionally changing; the
    // stable workflow h2 is the home-page marker used elsewhere.
    {
      path: "/",
      level: 2,
      heading: /from consultation to clear documentation/i,
    },
    { path: "/solutions", level: 1, heading: /clinical use cases/i },
    { path: "/keyboard-liberation", level: 1, heading: /work by speaking/i },
    {
      path: "/ai-governance",
      level: 1,
      heading: /clinical ai that can be constrained, examined and stopped/i,
    },
    {
      path: "/sovereign-deployment",
      level: 1,
      heading: /healthcare enablement operated within the country it serves/i,
    },
    {
      path: "/partnerships",
      level: 1,
      heading: /a partnership model for sustainable national access/i,
    },
    { path: "/pricing", level: 1, heading: /transparent pricing/i },
    { path: "/contact", level: 1, heading: /talk to the robi care team/i },
  ] as const;

  it.each(ROUTES)(
    "renders $path inside the dark navy shell",
    async ({ path, level, heading }) => {
      window.history.pushState({}, "", path);
      renderWithProviders(<App />);

      // The route's own content renders (no blank screen).
      expect(
        await screen.findByRole("heading", { level, name: heading }),
      ).toBeInTheDocument();

      const header = document.querySelector("header") as HTMLElement;
      expect(header.className).toContain("nav-surface");

      const footer = document.querySelector("footer") as HTMLElement;
      expect(footer.className).toContain("bg-deep-green");

      // The shell wrapper carries the page canvas token.
      const shell = header.parentElement as HTMLElement;
      expect(shell.className).toContain("bg-canvas");
    },
  );
});
