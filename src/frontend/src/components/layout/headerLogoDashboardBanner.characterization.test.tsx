import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { DashboardStep } from "@/components/signup/DashboardStep";
import {
  BILLING_SUMMARY,
  DASHBOARD_STEP_COPY,
  USAGE_METRICS,
} from "@/lib/signup";
import {
  ACCOUNT_DEMO_URL,
  FOOTER_GROUPS,
  HEADER_BANNER_TEXT,
  NAV_ITEMS,
  SIGN_UP_ROUTE,
  SITE_NAME,
} from "@/lib/site";
import { SignUpPage } from "@/pages/SignUpPage";
import { renderWithRouter } from "@/test/helpers";
import { fireEvent, screen, within } from "@testing-library/react";
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
 * Characterization baseline for the header-logo + dashboard-banner change.
 *
 * The request intentionally changes the header brand mark: a circular logo
 * mark is added alongside the "Robi Care" wordmark, and "Care" moves from the
 * cyan brand color to its original (non-cyan) color, sized to fit the header at
 * every width. This file therefore deliberately does NOT pin the header logo's
 * tag, its color classes, the presence/absence of a circular mark, or its exact
 * size classes — those are the accepted change.
 *
 * The Personal Dashboard preview banner is already present and its accepted
 * placement (directly above the Usage Summary, above both the usage numbers and
 * the Current Billing Period Cost section) is behavior that must remain, so it
 * is protected here rather than treated as the change.
 *
 * Everything else the change must keep intact is protected:
 *   - the header stays a fixed, full-width nav-surface bar with the
 *     announcement banner above the navigation, and `SiteLayout` still offsets
 *     the page body by the header height;
 *   - the brand link still points home and is named for the site;
 *   - the mobile menu keeps its toggle wiring, Escape-to-close, and
 *     close-on-link mechanics;
 *   - the primary navigation keeps its five links and destinations, and the
 *     outlined "Account demo" / solid in-app "Sign Up" actions keep theirs;
 *   - the footer is untouched: both groups, every link, the brand logo, the
 *     account actions, and the provenance line;
 *   - the dashboard keeps its personal-info fields, account badge, usage
 *     metrics, billing/invoice/platform-note surfaces, and its actions;
 *   - the Step 1 -> Step 3 journey still reaches the dashboard.
 */
describe("header shell survives the logo change", () => {
  it("keeps the header fixed, full-width, and on the nav-surface token", async () => {
    await renderWithRouter(<SiteHeader />);

    const header = document.querySelector("header") as HTMLElement;
    expect(header).not.toBeNull();
    expect(header.className).toContain("fixed");
    expect(header.className).toContain("inset-x-0");
    expect(header.className).toContain("top-0");
    expect(header.className).toContain("nav-surface");
  });

  it("keeps the announcement banner above the navigation with its exact text", async () => {
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

  it("offsets the page body by the header height so content is not hidden", async () => {
    await renderWithRouter(
      <SiteLayout>
        <p>Page body</p>
      </SiteLayout>,
    );

    const main = document.querySelector("main") as HTMLElement;
    expect(main).not.toBeNull();
    expect(main.className).toContain("pt-[6.25rem]");
    expect(main.className).toContain("md:pt-[7.25rem]");
  });

  it("keeps the brand link pointing home with an accessible name", async () => {
    await renderWithRouter(<SiteHeader />);

    const homeLink = document.querySelector(
      '[data-ocid="nav.home_link"]',
    ) as HTMLAnchorElement;
    expect(homeLink).not.toBeNull();
    expect(homeLink).toHaveAttribute("href", "/");
    // The mark's composition is intentionally changing, so only the accessible
    // contract is pinned: the link is named for the site.
    expect(homeLink).toHaveAccessibleName(new RegExp(SITE_NAME, "i"));
  });
});

describe("mobile menu mechanics survive the logo change", () => {
  it("wires the toggle to the panel with aria-expanded and aria-controls", async () => {
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
  });

  it("closes the mobile menu on Escape", async () => {
    const user = userEvent.setup();
    await renderWithRouter(<SiteHeader />);

    await user.click(
      screen.getByRole("button", { name: /open navigation menu/i }),
    );
    expect(
      screen.getByRole("navigation", { name: "Mobile" }),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(
      screen.queryByRole("navigation", { name: "Mobile" }),
    ).not.toBeInTheDocument();
  });

  it("closes the mobile menu when a navigation link is chosen", async () => {
    const user = userEvent.setup();
    await renderWithRouter(<SiteHeader />);

    await user.click(
      screen.getByRole("button", { name: /open navigation menu/i }),
    );
    const mobileNav = screen.getByRole("navigation", { name: "Mobile" });
    const firstLink = within(mobileNav).getAllByRole("link")[0];
    expect(firstLink).toBeDefined();

    await user.click(firstLink as HTMLElement);

    expect(
      screen.queryByRole("navigation", { name: "Mobile" }),
    ).not.toBeInTheDocument();
  });
});

describe("header navigation and actions survive the logo change", () => {
  it("keeps the five primary links and their destinations", async () => {
    await renderWithRouter(<SiteHeader />);

    const primaryNav = screen.getByRole("navigation", { name: "Primary" });
    const links = within(primaryNav).getAllByRole("link");
    expect(links.map((link) => link.textContent?.trim())).toEqual(
      NAV_ITEMS.map((item) => item.label),
    );
    expect(links.map((link) => link.getAttribute("href"))).toEqual(
      NAV_ITEMS.map((item) => item.to),
    );
  });

  it("keeps the outlined Account demo and solid in-app Sign Up actions", async () => {
    await renderWithRouter(<SiteHeader />);

    const accountDemo = document.querySelector(
      '[data-ocid="nav.account_demo_button"]',
    ) as HTMLAnchorElement;
    const signUp = document.querySelector(
      '[data-ocid="nav.sign_up_button"]',
    ) as HTMLAnchorElement;

    expect(accountDemo).not.toBeNull();
    expect(signUp).not.toBeNull();
    expect(accountDemo).toHaveAttribute("href", ACCOUNT_DEMO_URL);
    expect(signUp).toHaveAttribute("href", SIGN_UP_ROUTE);
    expect(accountDemo.className).toContain("bg-transparent");
    expect(accountDemo.className).toContain("border-primary");
    expect(signUp.className).toContain("bg-primary");
  });

  it("keeps the mobile panel's five links and both account actions", async () => {
    const user = userEvent.setup();
    await renderWithRouter(<SiteHeader />);

    await user.click(
      screen.getByRole("button", { name: /open navigation menu/i }),
    );

    const mobileNav = screen.getByRole("navigation", { name: "Mobile" });
    expect(
      within(mobileNav)
        .getAllByRole("link")
        .map((link) => link.textContent?.trim()),
    ).toEqual(NAV_ITEMS.map((item) => item.label));

    expect(
      document.querySelector('[data-ocid="nav.mobile_account_demo_button"]'),
    ).toHaveAttribute("href", ACCOUNT_DEMO_URL);
    expect(
      document.querySelector('[data-ocid="nav.mobile_sign_up_button"]'),
    ).toHaveAttribute("href", SIGN_UP_ROUTE);
  });
});

describe("footer remains untouched by the logo change", () => {
  it("keeps both footer groups with their headings and every link", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
    expect(footer).not.toBeNull();

    for (const group of FOOTER_GROUPS) {
      const nav = within(footer).getByRole("navigation", {
        name: group.heading,
      });
      expect(
        within(nav).getByRole("heading", { name: group.heading }),
      ).toBeInTheDocument();
      for (const item of group.items) {
        expect(
          within(nav).getByRole("link", { name: item.label }),
        ).toHaveAttribute("href", item.to);
      }
    }
  });

  it("keeps the footer brand logo with the site name as alt text", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
    const logo = footer.querySelector(
      '[data-ocid="footer.logo"]',
    ) as HTMLImageElement;
    expect(logo).not.toBeNull();
    expect(logo.tagName).toBe("IMG");
    expect(logo).toHaveAttribute("alt", SITE_NAME);
  });

  it("keeps the footer account actions and the provision line", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
    expect(
      within(footer).getByText(
        "A service provision of Ecocarrier Inc., Ontario, Canada.",
      ),
    ).toBeInTheDocument();

    const getStarted = document.querySelector(
      '[data-ocid="footer.get_started_button"]',
    ) as HTMLAnchorElement;
    const signIn = document.querySelector(
      '[data-ocid="footer.sign_in_button"]',
    ) as HTMLAnchorElement;
    expect(getStarted).toHaveAttribute(
      "href",
      "https://app.telemeetup.com/register",
    );
    expect(signIn).toHaveAttribute("href", "https://app.telemeetup.com/login");
  });
});

describe("Personal Dashboard content survives the banner change", () => {
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
    // The amount appears in the billing total, the summary line, and the
    // invoice table, so assert presence rather than uniqueness.
    expect(screen.getAllByText(BILLING_SUMMARY.amount).length).toBeGreaterThan(
      0,
    );
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
});

describe("preview banner keeps its accepted placement", () => {
  it("renders the exact preview text in a bordered, distinct-background banner", async () => {
    await renderWithRouter(<DashboardStep fullName="" onStartOver={vi.fn()} />);

    const banner = document.querySelector(
      '[data-ocid="signup.preview_banner"]',
    ) as HTMLElement | null;
    expect(banner).not.toBeNull();
    expect(banner).toHaveTextContent(DASHBOARD_STEP_COPY.previewBanner);
    // A bordered banner with its own background, not a bare paragraph.
    expect(banner?.className).toContain("border");
    expect(banner?.className).toContain("bg-primary/10");
  });

  it("sits above both the Usage Summary numbers and the billing section", async () => {
    await renderWithRouter(<DashboardStep fullName="" onStartOver={vi.fn()} />);

    const banner = document.querySelector(
      '[data-ocid="signup.preview_banner"]',
    ) as HTMLElement;
    expect(banner).not.toBeNull();

    const usageHeading = screen.getByRole("heading", {
      level: 3,
      name: DASHBOARD_STEP_COPY.usageTitle,
    });
    const billingHeading = screen.getByRole("heading", {
      level: 3,
      name: DASHBOARD_STEP_COPY.billingTitle,
    });

    // The banner precedes the Usage Summary heading in document order.
    expect(
      banner.compareDocumentPosition(usageHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    // ...and it precedes the Current Billing Period Cost section too.
    expect(
      banner.compareDocumentPosition(billingHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();

    // Every usage metric card follows the banner.
    for (const metric of USAGE_METRICS) {
      const card = document.querySelector(
        `[data-ocid="signup.usage.${metric.id}"]`,
      ) as HTMLElement;
      expect(
        banner.compareDocumentPosition(card) & Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    }
  });

  it("shows the banner immediately when Step 3 loads through the real flow", async () => {
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

    // Step 3: the dashboard panel renders with the banner already visible.
    expect(
      document.querySelector('[data-ocid="signup.dashboard_panel"]'),
    ).not.toBeNull();
    const banner = document.querySelector(
      '[data-ocid="signup.preview_banner"]',
    ) as HTMLElement | null;
    expect(banner).not.toBeNull();
    expect(banner).toHaveTextContent(DASHBOARD_STEP_COPY.previewBanner);
  });
});
