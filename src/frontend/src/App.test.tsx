import { renderWithProviders } from "@/test/helpers";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const actorMock = {
  assignCallerUserRole: vi.fn(async () => undefined),
  execute: vi.fn(async () => ({ hasMore: false, rows: [] })),
  getApiDoc: vi.fn(async () => ""),
  getCallerUserRole: vi.fn(async () => "guest"),
  isCallerAdmin: vi.fn(async () => false),
  listContactEnquiries: vi.fn(async () => []),
  schema: vi.fn(async () => ""),
  submitContactEnquiry: vi.fn(async () => ({ __kind__: "ok", ok: 1n })),
};

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({ actor: actorMock, isFetching: false }),
  InternetIdentityProvider: ({ children }: { children: React.ReactNode }) =>
    children,
}));

vi.mock("@/backend", () => ({
  createActor: vi.fn(() => actorMock),
}));

import App from "@/App";

beforeEach(() => {
  window.history.pushState({}, "", "/");
  vi.clearAllMocks();
});

describe("App routing and shell", () => {
  it("renders the home page on the default route without a blank screen", async () => {
    renderWithProviders(<App />);
    // The hero copy is intentionally changing, so assert a stable home-page
    // marker (the workflow section) rather than the current headline.
    expect(
      await screen.findByRole("heading", {
        level: 2,
        name: /from consultation to clear documentation in three steps/i,
      }),
    ).toBeInTheDocument();
  });

  it("shows the fixed header and the shared footer on the home page", async () => {
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

    const header = document.querySelector("header");
    expect(header).not.toBeNull();
    expect(header?.className).toContain("fixed");

    const footer = document.querySelector("footer");
    expect(footer).not.toBeNull();
    expect(
      within(footer as HTMLElement).getByText(
        "© 2026 Ecocarrier Inc. All rights reserved.",
      ),
    ).toBeInTheDocument();
  });

  it("renders the supplied Robi Care logo image in the navigation", async () => {
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

    const homeLink = document.querySelector(
      '[data-ocid="nav.home_link"]',
    ) as HTMLAnchorElement;
    expect(homeLink).not.toBeNull();
    expect(homeLink).toHaveAttribute("href", "/");

    // The brand mark is the supplied logo image, rendered directly inside the
    // home link with the site name as its alt text.
    const logo = homeLink.querySelector(
      '[data-ocid="nav.logo"]',
    ) as HTMLImageElement;
    expect(logo).not.toBeNull();
    expect(logo.tagName).toBe("IMG");
    expect(logo).toHaveAttribute(
      "src",
      "/assets/logo/robi-care-logo-final.png",
    );
    expect(logo).toHaveAttribute("alt", "Robi Care");
  });

  it("shows the Account demo and in-app Sign Up actions instead of Sign In and Get Started", async () => {
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

    const header = document.querySelector("header") as HTMLElement;
    const accountDemo = within(header).getByRole("link", {
      name: "Account demo",
    });
    // The solid header action is now the in-app Sign Up route.
    const signUp = within(header).getByRole("link", { name: "Sign Up" });
    expect(accountDemo).toHaveAttribute(
      "href",
      "https://app.telemeetup.com/login",
    );
    expect(signUp).toHaveAttribute("href", "/signup");

    expect(
      within(header).queryByRole("link", { name: "Sign In" }),
    ).not.toBeInTheDocument();
    expect(
      within(header).queryByRole("link", { name: "Get Started" }),
    ).not.toBeInTheDocument();
  });

  it("navigates to each of the five top-navigation pages", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

    const primaryNav = screen.getByRole("navigation", { name: "Primary" });

    const destinations: { link: string; heading: RegExp }[] = [
      { link: "Solutions", heading: /clinical use cases/i },
      { link: "Keyboard Liberation", heading: /work by speaking/i },
      {
        link: "AI Governance",
        heading: /clinical ai that can be constrained, examined and stopped/i,
      },
      {
        link: "Sovereign AI",
        heading: /healthcare enablement operated within the country it serves/i,
      },
      { link: "Pricing", heading: /transparent pricing/i },
    ];

    for (const destination of destinations) {
      await user.click(
        within(primaryNav).getByRole("link", { name: destination.link }),
      );
      expect(
        await screen.findByRole("heading", {
          level: 1,
          name: destination.heading,
        }),
      ).toBeInTheDocument();
      // The footer is part of the shared shell, so it must survive navigation.
      const footer = document.querySelector("footer") as HTMLElement;
      expect(
        within(footer).getByText("© 2026 Ecocarrier Inc. All rights reserved."),
      ).toBeInTheDocument();
    }
  });

  it("serves as home when the logo is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

    // Navigate away first, then return via the logo.
    await user.click(
      within(screen.getByRole("navigation", { name: "Primary" })).getByRole(
        "link",
        { name: "Pricing" },
      ),
    );
    await screen.findByRole("heading", {
      level: 1,
      name: /transparent pricing/i,
    });

    await user.click(
      document.querySelector('[data-ocid="nav.home_link"]') as HTMLElement,
    );
    expect(
      await screen.findByRole("heading", {
        level: 2,
        name: /from consultation to clear documentation in three steps/i,
      }),
    ).toBeInTheDocument();
  });

  it("opens and closes the mobile navigation menu", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

    const toggle = screen.getByRole("button", {
      name: /open navigation menu/i,
    });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);

    const mobileNav = screen.getByRole("navigation", { name: "Mobile" });
    expect(
      within(mobileNav).getByRole("link", { name: "Pricing" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /close navigation menu/i }),
    ).toHaveAttribute("aria-expanded", "true");

    await user.keyboard("{Escape}");
    expect(
      screen.queryByRole("navigation", { name: "Mobile" }),
    ).not.toBeInTheDocument();
  });
});
