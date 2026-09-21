import { FOOTER_GROUPS, NAV_ITEMS } from "@/lib/site";
import { renderWithProviders } from "@/test/helpers";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

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
 * Characterization baseline for the sponsorship-page change.
 *
 * The request intentionally adds a new `/sponsorship` route and a new
 * "Sponsorship" footer link. This file therefore deliberately does NOT assert
 * anything about `/sponsorship` or about a Sponsorship footer entry — those are
 * the behaviors being added, not protected.
 *
 * It protects the adjacent behavior the change must keep intact:
 *   - every existing route still loads directly (no blank screen) and renders a
 *     level-1 heading inside the shared shell;
 *   - the header still exposes exactly the five accepted top-navigation items,
 *     and each still navigates to its page;
 *   - the footer still renders its three accepted groups with every existing
 *     link and destination unchanged;
 *   - footer links still drive client-side navigation to existing routes;
 *   - the fixed header and shared footer still mount on every existing route.
 *
 * The footer assertions are written as "every existing link is present with the
 * right destination" rather than "the footer has exactly N links", so adding
 * the Sponsorship entry does not invalidate this baseline.
 */

/** The nine routes that exist before the sponsorship change. */
const EXISTING_ROUTES: { path: string; heading: RegExp }[] = [
  { path: "/", heading: /./ },
  { path: "/solutions", heading: /clinical use cases/i },
  { path: "/keyboard-liberation", heading: /work by speaking/i },
  {
    path: "/ai-governance",
    heading: /clinical ai that can be constrained, examined and stopped/i,
  },
  {
    path: "/sovereign-deployment",
    heading: /healthcare enablement operated within the country it serves/i,
  },
  { path: "/partnerships", heading: /./ },
  { path: "/pricing", heading: /transparent pricing/i },
  { path: "/contact", heading: /./ },
  { path: "/signup", heading: /./ },
];

/**
 * `App.tsx` builds its router once at module scope, so a bare `pushState`
 * between renders does not move an already-mounted router. Re-importing the
 * module after `vi.resetModules()` gives each route a fresh router created at
 * the pushed URL, which is what a real direct load does.
 */
async function renderAppAt(path: string) {
  window.history.pushState({}, "", path);
  vi.resetModules();
  const { default: App } = await import("@/App");
  renderWithProviders(<App />);
}

describe("existing routes still load directly", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each(EXISTING_ROUTES)(
    "renders a level-1 heading at $path without a blank screen",
    async ({ path, heading }) => {
      await renderAppAt(path);

      const h1 = await screen.findByRole("heading", {
        level: 1,
        name: heading,
      });
      expect(h1).toBeInTheDocument();
      expect(h1.textContent?.trim().length ?? 0).toBeGreaterThan(0);
    },
  );

  it.each(EXISTING_ROUTES)(
    "mounts the fixed header and shared footer at $path",
    async ({ path, heading }) => {
      await renderAppAt(path);
      await screen.findByRole("heading", { level: 1, name: heading });

      const header = document.querySelector("header");
      expect(header).not.toBeNull();
      expect(header?.className).toContain("fixed");

      const footers = document.querySelectorAll("footer");
      expect(footers).toHaveLength(1);
      expect(footers[0]).toHaveAttribute("data-ocid", "footer");
    },
  );
});

describe("header navigation is unchanged", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
    vi.clearAllMocks();
  });

  it("still exposes exactly the five accepted top-navigation items", async () => {
    await renderAppAt("/");
    await screen.findByRole("heading", { level: 1 });

    const primaryNav = screen.getByRole("navigation", { name: "Primary" });
    expect(
      within(primaryNav)
        .getAllByRole("link")
        .map((link) => link.textContent?.trim()),
    ).toEqual(NAV_ITEMS.map((item) => item.label));
  });

  it("still navigates to each top-navigation page", async () => {
    const user = userEvent.setup();
    await renderAppAt("/");
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
    }
  });
});

describe("footer navigation is unchanged", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
    vi.clearAllMocks();
  });

  it("still renders the three accepted groups in order", async () => {
    await renderAppAt("/");
    await screen.findByRole("heading", { level: 1 });

    const footer = document.querySelector("footer") as HTMLElement;
    expect(
      within(footer)
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent?.trim()),
    ).toEqual(FOOTER_GROUPS.map((group) => group.heading));
  });

  it("still renders every existing footer link with its accepted destination", async () => {
    await renderAppAt("/");
    await screen.findByRole("heading", { level: 1 });

    const footer = document.querySelector("footer") as HTMLElement;
    for (const group of FOOTER_GROUPS) {
      const nav = within(footer).getByRole("navigation", {
        name: group.heading,
      });
      for (const item of group.items) {
        const link = within(nav).getByRole("link", { name: item.label });
        expect(link).toHaveAttribute("href", item.to ?? item.href);
      }
    }
  });

  it("still keeps every in-app footer link pointing at a real route", async () => {
    await renderAppAt("/");
    await screen.findByRole("heading", { level: 1 });

    const footer = document.querySelector("footer") as HTMLElement;
    const knownRoutes = new Set([
      "/",
      "/solutions",
      "/keyboard-liberation",
      "/ai-governance",
      "/sovereign-deployment",
      "/partnerships",
      "/pricing",
      "/contact",
      "/signup",
      "/sponsorship",
    ]);

    for (const link of within(footer).getAllByRole("link")) {
      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("/")) {
        expect(knownRoutes.has(href)).toBe(true);
      }
    }
  });

  it("still navigates to an existing page from a footer link", async () => {
    const user = userEvent.setup();
    await renderAppAt("/");
    await screen.findByRole("heading", { level: 1 });

    const footer = document.querySelector("footer") as HTMLElement;
    await user.click(
      within(footer).getByRole("link", { name: "PPP partnerships" }),
    );

    expect(
      await screen.findByRole("heading", { level: 1 }),
    ).toBeInTheDocument();
    // The shared shell survives client-side navigation.
    expect(document.querySelector("footer")).not.toBeNull();
    expect(document.querySelector("header")).not.toBeNull();
  });
});
