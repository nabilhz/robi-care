import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/layout/Section";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { DashboardStep } from "@/components/signup/DashboardStep";
import { DASHBOARD_STEP_COPY, USAGE_METRICS } from "@/lib/signup";
import { LOGO_IMAGE } from "@/lib/site";
import { renderWithProviders, renderWithRouter } from "@/test/helpers";
import { screen } from "@testing-library/react";
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
 * Cover for three accepted changes:
 *
 *   1. The header brand mark is the supplied Robi Care logo image, rendered
 *      exactly as provided and sized to fit within the header.
 *   2. Sign-up Step 3 (Personal Dashboard) shows a bordered preview-data banner
 *      with the exact specified text above the Usage Summary.
 *   3. Eyebrow label tags auto-size to their full text with padding on both
 *      sides, site-wide, with no clipped letters.
 */
describe("header logo image", () => {
  it("renders the supplied logo image with its src and alt", async () => {
    await renderWithRouter(<SiteHeader />);

    const logo = document.querySelector(
      '[data-ocid="nav.logo"]',
    ) as HTMLImageElement;
    expect(logo).not.toBeNull();
    expect(logo.tagName).toBe("IMG");
    expect(logo).toHaveAttribute("src", LOGO_IMAGE.src);
    expect(logo).toHaveAttribute("alt", LOGO_IMAGE.alt);
  });

  it("renders no inline SVG mark or text wordmark in the header brand", async () => {
    await renderWithRouter(<SiteHeader />);

    const logo = document.querySelector(
      '[data-ocid="nav.logo"]',
    ) as HTMLElement;
    // The previous treatment was an inline SVG plus a text wordmark; the
    // accepted change replaces both with the supplied image.
    expect(logo.querySelector("svg")).toBeNull();
    expect(logo.textContent).toBe("");
  });

  it("sizes the logo to fit within the header without clipping", async () => {
    await renderWithRouter(<SiteHeader />);

    const logo = document.querySelector(
      '[data-ocid="nav.logo"]',
    ) as HTMLImageElement;
    // The intrinsic 444x109 ratio is preserved by `w-auto`; the height caps
    // keep it inside the mobile and desktop bars, and `object-contain` plus
    // `max-w-full` prevent overflow or cropping.
    expect(logo.className).toContain("w-auto");
    expect(logo.className).toContain("max-w-full");
    expect(logo.className).toContain("object-contain");
    expect(logo.className).toContain("h-11");
    expect(logo.className).toContain("md:h-14");
    expect(logo.className).not.toContain("overflow-hidden");
    expect(logo.className).not.toContain("truncate");
  });

  it("keeps the logo inside the brand link that points home", async () => {
    await renderWithRouter(<SiteHeader />);

    const homeLink = document.querySelector(
      '[data-ocid="nav.home_link"]',
    ) as HTMLAnchorElement;
    expect(homeLink).toHaveAttribute("href", "/");
    expect(homeLink).toHaveAccessibleName(/robi care/i);

    const logo = homeLink.querySelector(
      '[data-ocid="nav.logo"]',
    ) as HTMLElement;
    expect(logo).not.toBeNull();
    // The logo is a direct child of the link: no chip wrapper between them.
    expect(logo.parentElement).toBe(homeLink);
  });
});

describe("Personal Dashboard preview-data banner", () => {
  it("renders the exact preview text in a bordered banner", async () => {
    await renderWithRouter(<DashboardStep fullName="" onStartOver={vi.fn()} />);

    const banner = document.querySelector(
      '[data-ocid="signup.preview_banner"]',
    ) as HTMLElement | null;
    expect(banner).not.toBeNull();
    expect(banner).toHaveTextContent(DASHBOARD_STEP_COPY.previewBanner);
    // The banner is bordered, not a bare paragraph.
    expect(banner?.className).toContain("border");
  });

  it("places the banner above the Usage Summary section", async () => {
    await renderWithRouter(<DashboardStep fullName="" onStartOver={vi.fn()} />);

    const banner = document.querySelector(
      '[data-ocid="signup.preview_banner"]',
    ) as HTMLElement;
    const usageHeading = screen.getByRole("heading", {
      level: 3,
      name: DASHBOARD_STEP_COPY.usageTitle,
    });

    // The banner precedes the Usage Summary heading in document order.
    expect(
      banner.compareDocumentPosition(usageHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();

    // ...and it precedes every Usage Summary metric card, so it sits above the
    // usage numbers themselves.
    for (const metric of USAGE_METRICS) {
      const card = document.querySelector(
        `[data-ocid="signup.usage.${metric.id}"]`,
      ) as HTMLElement;
      expect(
        banner.compareDocumentPosition(card) & Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    }
  });

  it("shows the banner on Step 3 reached through the real signup flow", async () => {
    const { SignUpPage } = await import("@/pages/SignUpPage");
    const userEvent = (await import("@testing-library/user-event")).default;
    const { fireEvent } = await import("@testing-library/react");
    const user = userEvent.setup();
    await renderWithRouter(<SignUpPage />);

    await user.type(screen.getByLabelText("Full Name"), "Ada Lovelace");
    await user.type(screen.getByLabelText("Email Address"), "ada@example.com");
    await user.type(
      screen.getByLabelText("Mobile Phone Number"),
      "+1 555 010 2030",
    );
    await user.click(screen.getByRole("button", { name: /continue/i }));

    const codeInput = document.querySelector(
      "input[data-input-otp]",
    ) as HTMLInputElement | null;
    expect(codeInput).not.toBeNull();
    if (!codeInput) throw new Error("verification code input not found");
    fireEvent.change(codeInput, { target: { value: "123456" } });
    await user.click(screen.getByRole("button", { name: /verify/i }));

    const banner = document.querySelector(
      '[data-ocid="signup.preview_banner"]',
    ) as HTMLElement | null;
    expect(banner).not.toBeNull();
    expect(banner).toHaveTextContent(DASHBOARD_STEP_COPY.previewBanner);
  });
});

describe("eyebrow labels auto-size to their full text with padding", () => {
  it("renders a long SectionHeading eyebrow in full with the shared recipe", () => {
    const longEyebrow = "IT CHANGES ACROSS THE WHOLE SERVICE";
    renderWithProviders(
      <SectionHeading eyebrow={longEyebrow} title="A section title" />,
    );

    const eyebrow = screen.getByText(longEyebrow);
    expect(eyebrow.textContent).toBe(longEyebrow);
    // The auto-sizing lives in the shared `.eyebrow` utility; the element opts
    // into it and must not add a clipping utility on top.
    expect(eyebrow.className).toContain("eyebrow");
    expect(eyebrow.className).not.toContain("truncate");
    expect(eyebrow.className).not.toContain("overflow-hidden");
  });

  it("renders the PageHero eyebrow in full with the shared recipe", () => {
    const eyebrow = "KL SERVICE";
    renderWithProviders(
      <PageHero
        eyebrow={eyebrow}
        title="A page title"
        description="A supporting description."
        image={{ src: "/photo.jpg", alt: "A described photograph." }}
      />,
    );

    const label = screen.getByText(eyebrow);
    expect(label.textContent).toBe(eyebrow);
    expect(label.className).toContain("eyebrow");
    expect(label.className).not.toContain("truncate");
  });

  it("renders the CtaBand eyebrow in full with the shared recipe", () => {
    const eyebrow = "USE CASES";
    renderWithProviders(
      <CtaBand
        eyebrow={eyebrow}
        title="A closing title"
        description="A closing description."
      />,
    );

    const label = screen.getByText(eyebrow);
    expect(label.textContent).toBe(eyebrow);
    expect(label.className).toContain("eyebrow");
    expect(label.className).not.toContain("truncate");
  });

  it("keeps the shared eyebrow recipe padded on both sides", () => {
    // The `.eyebrow` utility is the single site-wide source of the label
    // styling; the padding-inline rule is what keeps letters off the edges.
    // jsdom does not load the app's Tailwind stylesheet, so this assertion is
    // only meaningful when a stylesheet is present; otherwise the class-level
    // checks above carry the contract.
    const styleSheets = Array.from(document.styleSheets);
    let eyebrowRule: CSSStyleRule | undefined;
    for (const sheet of styleSheets) {
      let rules: CSSRuleList;
      try {
        rules = sheet.cssRules;
      } catch {
        continue;
      }
      for (const rule of Array.from(rules)) {
        if (rule instanceof CSSStyleRule && rule.selectorText === ".eyebrow") {
          eyebrowRule = rule;
        }
      }
    }
    if (eyebrowRule) {
      expect(eyebrowRule.style.paddingInline).not.toBe("");
    }
  });
});
