import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { LOGO_IMAGE, SITE_NAME } from "@/lib/site";
import { renderWithRouter } from "@/test/helpers";
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
 * Cover for the accepted Robi Care logo change.
 *
 * The request replaces the header's inline SVG + text wordmark and the footer's
 * previous logo with a single supplied image, used exactly as provided:
 *   - the header renders the supplied logo image and no longer renders the
 *     previous inline SVG mark or text wordmark;
 *   - the footer renders the supplied logo image;
 *   - the asset shipped in the build output is the provided image file;
 *   - the header logo is sized to stay inside the header bar at mobile and
 *     desktop widths without overflow or cropping.
 *
 * The frontend `test` script runs with `app/src/frontend` as the working
 * directory, so the public asset is resolved from there.
 */
const ASSET_PATH = resolve(
  process.cwd(),
  "public/assets/logo/robi-care-logo-final.png",
);

/** Read the PNG IHDR width/height from the file's own bytes. */
function pngDimensions(bytes: Buffer): { width: number; height: number } {
  // 8-byte signature, then a 4-byte length, "IHDR", then width and height.
  const signature = bytes.subarray(0, 8).toString("hex");
  if (signature !== "89504e470d0a1a0a") {
    throw new Error("asset is not a PNG");
  }
  return {
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
  };
}

describe("supplied logo asset", () => {
  it("ships the provided image as a real PNG with its intrinsic dimensions", () => {
    const bytes = readFileSync(ASSET_PATH);
    const { width, height } = pngDimensions(bytes);
    // The declared intrinsic size must match the file's own pixels, so the
    // rendered aspect ratio is the provided artwork's, unmodified.
    expect(width).toBe(LOGO_IMAGE.width);
    expect(height).toBe(LOGO_IMAGE.height);
    expect(width).toBe(444);
    expect(height).toBe(109);
  });

  it("points the logo constant at the supplied asset path", () => {
    expect(LOGO_IMAGE.src).toBe("/assets/logo/robi-care-logo-final.png");
    expect(LOGO_IMAGE.alt).toBe(SITE_NAME);
  });
});

describe("header renders the supplied logo image", () => {
  it("renders the image and no inline SVG mark or text wordmark", async () => {
    await renderWithRouter(<SiteHeader />);

    const logo = document.querySelector(
      '[data-ocid="nav.logo"]',
    ) as HTMLImageElement;
    expect(logo).not.toBeNull();
    expect(logo.tagName).toBe("IMG");
    expect(logo).toHaveAttribute("src", LOGO_IMAGE.src);
    expect(logo).toHaveAttribute("alt", LOGO_IMAGE.alt);
    // The previous treatment was an inline SVG plus a text wordmark.
    expect(logo.querySelector("svg")).toBeNull();
    expect(logo.textContent).toBe("");
  });

  it("keeps the logo inside the home link with an accessible name", async () => {
    await renderWithRouter(<SiteHeader />);

    const homeLink = document.querySelector(
      '[data-ocid="nav.home_link"]',
    ) as HTMLAnchorElement;
    expect(homeLink).toHaveAttribute("href", "/");
    expect(homeLink).toHaveAccessibleName(new RegExp(SITE_NAME, "i"));

    const logo = homeLink.querySelector(
      '[data-ocid="nav.logo"]',
    ) as HTMLElement;
    expect(logo).not.toBeNull();
    expect(logo.parentElement).toBe(homeLink);
  });

  it("sizes the logo to stay inside the header bar without overflow or cropping", async () => {
    await renderWithRouter(<SiteHeader />);

    const logo = document.querySelector(
      '[data-ocid="nav.logo"]',
    ) as HTMLImageElement;
    // `w-auto` preserves the provided aspect ratio; the height caps keep it
    // inside the h-20 mobile and md:h-24 desktop bars; `max-w-full` and
    // `object-contain` prevent overflow and cropping.
    expect(logo.className).toContain("w-auto");
    expect(logo.className).toContain("max-w-full");
    expect(logo.className).toContain("object-contain");
    expect(logo.className).toContain("h-11");
    expect(logo.className).toContain("sm:h-12");
    expect(logo.className).toContain("md:h-14");
    expect(logo.className).not.toContain("overflow-hidden");
    expect(logo.className).not.toContain("truncate");
  });
});

describe("footer renders the supplied logo image", () => {
  it("renders the image with the site name as alt text", async () => {
    await renderWithRouter(<SiteFooter />);

    const footer = document.querySelector("footer") as HTMLElement;
    const logo = footer.querySelector(
      '[data-ocid="footer.logo"]',
    ) as HTMLImageElement;
    expect(logo).not.toBeNull();
    expect(logo.tagName).toBe("IMG");
    expect(logo).toHaveAttribute("src", LOGO_IMAGE.src);
    expect(logo).toHaveAttribute("alt", SITE_NAME);
    expect(logo).toHaveAttribute("width", String(LOGO_IMAGE.width));
    expect(logo).toHaveAttribute("height", String(LOGO_IMAGE.height));
  });
});
