import { renderWithProviders } from "@/test/helpers";
import { screen, within } from "@testing-library/react";
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

import App from "@/App";

/**
 * Characterization baseline for the "footer on every page" invariant.
 *
 * The accepted requirement fixes the footer's exact four-column structure and
 * requires it on *every* page. The existing footer cover pins the structure on
 * the Home and Pricing routes; this file protects the same invariant across the
 * full public route table, so a future change that drops a column, reorders the
 * groups, or stops mounting the footer on one route fails here.
 *
 * It deliberately does not re-pin the exact link labels (the footer cover owns
 * those) — it asserts the structural contract that must hold everywhere: one
 * shared footer, four top-level columns in the accepted order, the three
 * labelled navigation groups, and both bottom-bar parts.
 */
const ROUTES: { path: string; heading: RegExp }[] = [
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
];

const GROUP_HEADINGS = ["Explore", "Deploy", "Contact & policies"];

describe("footer four-column structure on every page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each(ROUTES)(
    "renders the exact four-column footer on $path",
    async ({ path, heading }) => {
      window.history.pushState({}, "", path);
      renderWithProviders(<App />);
      await screen.findByRole("heading", { level: 1, name: heading });

      const footers = document.querySelectorAll("footer");
      expect(footers).toHaveLength(1);
      const footer = footers[0] as HTMLElement;
      expect(footer).toHaveAttribute("data-ocid", "footer");

      // Exactly four top-level columns: the brand block plus three nav groups.
      const grid = footer.querySelector(".grid") as HTMLElement;
      expect(grid).not.toBeNull();
      const columns = Array.from(grid.children) as HTMLElement[];
      expect(columns).toHaveLength(4);
      expect(
        columns[0].querySelector('[data-ocid="footer.logo"]'),
      ).not.toBeNull();

      // The three nav groups appear in the accepted order.
      expect(
        columns.slice(1).map((column) => column.getAttribute("aria-label")),
      ).toEqual(GROUP_HEADINGS);

      // Each group is a labelled navigation landmark with at least one link.
      for (const groupHeading of GROUP_HEADINGS) {
        const nav = within(footer).getByRole("navigation", {
          name: groupHeading,
        });
        expect(within(nav).getAllByRole("link").length).toBeGreaterThanOrEqual(
          1,
        );
      }

      // Both bottom-bar parts are present on every page.
      expect(
        footer.querySelector('[data-ocid="footer.copyright"]'),
      ).not.toBeNull();
      expect(
        footer.querySelector('[data-ocid="footer.emergency_notice"]'),
      ).not.toBeNull();
    },
  );
});
