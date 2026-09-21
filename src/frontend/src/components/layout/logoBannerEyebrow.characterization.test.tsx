import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/layout/Section";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { DashboardStep } from "@/components/signup/DashboardStep";
import { DASHBOARD_STEP_COPY, USAGE_METRICS } from "@/lib/signup";
import { HEADER_BANNER_TEXT, SITE_NAME } from "@/lib/site";
import { SignUpPage } from "@/pages/SignUpPage";
import { renderWithProviders, renderWithRouter } from "@/test/helpers";
import { fireEvent, screen } from "@testing-library/react";
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

/**
 * Characterization baseline for three intentional changes:
 *
 *   1. The header brand mark changes from the supplied logo <img> to text
 *      ("Robi" in gold + "Care"). This file therefore does NOT pin the header
 *      logo's tag, src, alt, or size. It protects the brand link's home
 *      destination and accessible name, the header shell mechanics, and the
 *      footer logo, which the request does not touch.
 *
 *   2. Sign-up Step 3 (Personal Dashboard) gains a preview-data banner directly
 *      above the Usage Summary. This file therefore does NOT pin the absence of
 *      a banner or the exact spacing above Usage Summary. It protects the
 *      existing dashboard content and the Step 1 -> Step 3 journey.
 *
 *   3. Eyebrow label tags resize to fit their full text with padding on both
 *      sides. This file therefore does NOT pin the eyebrow's exact width or
 *      class list. It protects that eyebrow text renders in full (never
 *      truncated) and keeps the shared accent recipe.
 */
describe("header brand link survives the logo change", () => {
  it("keeps the brand link pointing home with an accessible name", async () => {
    await renderWithRouter(<SiteHeader />);

    const homeLink = document.querySelector(
      '[data-ocid="nav.home_link"]',
    ) as HTMLAnchorElement;
    expect(homeLink).not.toBeNull();
    expect(homeLink).toHaveAttribute("href", "/");

    // The brand mark is intentionally changing from an image to text, so only
    // the accessible contract is pinned: the link is named for the site.
    expect(homeLink).toHaveAccessibleName(new RegExp(SITE_NAME, "i"));
  });

  it("keeps the header shell fixed, full-width, and on the nav-surface token", async () => {
    await renderWithRouter(<SiteHeader />);

    const header = document.querySelector("header") as HTMLElement;
    expect(header).not.toBeNull();
    expect(header.className).toContain("fixed");
    expect(header.className).toContain("inset-x-0");
    expect(header.className).toContain("top-0");
    expect(header.className).toContain("nav-surface");
  });

  it("keeps the announcement banner above the navigation", async () => {
    await renderWithRouter(<SiteHeader />);

    const banner = document.querySelector(
      '[data-ocid="nav.banner"]',
    ) as HTMLElement;
    expect(banner).not.toBeNull();
    expect(banner).toHaveTextContent(HEADER_BANNER_TEXT);

    const primaryNav = screen.getByRole("navigation", { name: "Primary" });
    expect(
      banner.compareDocumentPosition(primaryNav) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("keeps the mobile menu toggle wiring and Escape-to-close", async () => {
    const user = userEvent.setup();
    await renderWithRouter(<SiteHeader />);

    const toggle = screen.getByRole("button", {
      name: /open navigation menu/i,
    });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls", "mobile-nav");

    await user.click(toggle);
    expect(
      screen.getByRole("button", { name: /close navigation menu/i }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(document.querySelector("#mobile-nav")).not.toBeNull();

    await user.keyboard("{Escape}");
    expect(
      screen.queryByRole("navigation", { name: "Mobile" }),
    ).not.toBeInTheDocument();
  });

  it("keeps the footer brand logo untouched", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
    const logo = footer.querySelector(
      '[data-ocid="footer.logo"]',
    ) as HTMLImageElement;
    expect(logo).not.toBeNull();
    expect(logo.tagName).toBe("IMG");
    expect(logo).toHaveAttribute("alt", SITE_NAME);
  });
});

describe("Personal Dashboard content survives the banner insertion", () => {
  it("keeps the personal-information fields and the account badge", async () => {
    await renderWithRouter(
      <DashboardStep fullName="Ada Lovelace" onStartOver={vi.fn()} />,
    );

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: DASHBOARD_STEP_COPY.personalInfoTitle,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Professional role / specialty"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Organization / practice name"),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-ocid="signup.account_badge"]'),
    ).toHaveTextContent("Ada Lovelace");
  });

  it("keeps the Usage Summary heading and every usage metric", async () => {
    await renderWithRouter(<DashboardStep fullName="" onStartOver={vi.fn()} />);

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: DASHBOARD_STEP_COPY.usageTitle,
      }),
    ).toBeInTheDocument();

    for (const metric of USAGE_METRICS) {
      const card = document.querySelector(
        `[data-ocid="signup.usage.${metric.id}"]`,
      ) as HTMLElement | null;
      expect(card).not.toBeNull();
      expect(card).toHaveTextContent(metric.label);
      expect(card).toHaveTextContent(metric.value);
    }
  });

  it("keeps the billing, invoice, and platform-note surfaces", async () => {
    await renderWithRouter(<DashboardStep fullName="" onStartOver={vi.fn()} />);

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: DASHBOARD_STEP_COPY.billingTitle,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: DASHBOARD_STEP_COPY.invoicesTitle,
      }),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-ocid="signup.invoice_table"]'),
    ).not.toBeNull();
    expect(
      document.querySelector('[data-ocid="signup.platform_note"]'),
    ).toHaveTextContent(DASHBOARD_STEP_COPY.platformNote);
  });

  it("keeps the Start over and Return home actions", async () => {
    const user = userEvent.setup();
    const onStartOver = vi.fn();
    await renderWithRouter(
      <DashboardStep fullName="" onStartOver={onStartOver} />,
    );

    await user.click(
      document.querySelector(
        '[data-ocid="signup.start_over_button"]',
      ) as HTMLElement,
    );
    expect(onStartOver).toHaveBeenCalledTimes(1);

    expect(
      document.querySelector('[data-ocid="signup.return_home_button"]'),
    ).toHaveAttribute("href", "/");
  });

  it("reaches Step 3 through the real flow and shows the dashboard", async () => {
    const user = userEvent.setup();
    await renderWithRouter(<SignUpPage />);

    await user.type(screen.getByLabelText("Full Name"), "Ada Lovelace");
    await user.type(screen.getByLabelText("Email Address"), "ada@example.com");
    await user.type(
      screen.getByLabelText("Mobile Phone Number"),
      "+1 555 010 2030",
    );
    await user.click(screen.getByRole("button", { name: /continue/i }));

    // Step 2: enter a valid code and verify. The OTP is driven with a change
    // event rather than per-key typing; input-otp's PWM badge schedules a
    // jsdom-incompatible timer on keystrokes.
    const codeInput = document.querySelector(
      "input[data-input-otp]",
    ) as HTMLInputElement | null;
    expect(codeInput).not.toBeNull();
    if (!codeInput) throw new Error("verification code input not found");
    fireEvent.change(codeInput, { target: { value: "123456" } });
    await user.click(screen.getByRole("button", { name: /verify/i }));

    // Step 3: the dashboard panel renders with its Usage Summary.
    expect(
      document.querySelector('[data-ocid="signup.dashboard_panel"]'),
    ).not.toBeNull();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: DASHBOARD_STEP_COPY.usageTitle,
      }),
    ).toBeInTheDocument();
  });
});

describe("eyebrow labels render their full text with the accent recipe", () => {
  it("renders a long SectionHeading eyebrow in full without truncation", () => {
    const longEyebrow = "IT CHANGES ACROSS THE WHOLE SERVICE";
    renderWithProviders(
      <SectionHeading eyebrow={longEyebrow} title="A section title" />,
    );

    const eyebrow = screen.getByText(longEyebrow);
    expect(eyebrow).toBeInTheDocument();
    expect(eyebrow.textContent).toBe(longEyebrow);
    // The shared accent recipe stays; the exact sizing classes are changing.
    expect(eyebrow.className).toContain("eyebrow");
    expect(eyebrow.className).toContain("rule-accent");
    // A fixed-width or clipping utility would defeat the auto-sizing change.
    expect(eyebrow.className).not.toContain("truncate");
    expect(eyebrow.className).not.toContain("overflow-hidden");
  });

  it("renders the PageHero eyebrow in full", () => {
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

  it("renders the CtaBand eyebrow in full", () => {
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

  it("renders the signup page eyebrow in full", async () => {
    await renderWithRouter(<SignUpPage />);

    const label = screen.getByText("Create your account");
    expect(label.textContent).toBe("Create your account");
    expect(label.className).toContain("eyebrow");
    expect(label.className).not.toContain("truncate");
  });
});
