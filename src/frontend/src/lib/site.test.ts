import {
  ACCOUNT_DEMO_URL,
  FOOTER_GROUPS,
  GET_STARTED_URL,
  HEADER_BANNER_TEXT,
  LOGO_IMAGE,
  NAV_ITEMS,
  PROVENANCE_LINE,
  REQUEST_DEMO_URL,
  SIGN_IN_URL,
} from "@/lib/site";
import { describe, expect, it } from "vitest";

describe("site navigation contract", () => {
  it("links to exactly the five accepted pages from the top navigation", () => {
    expect(NAV_ITEMS.map((item) => item.label)).toEqual([
      "Solutions",
      "Keyboard Liberation",
      "AI Governance",
      "Sovereign AI",
      "Pricing",
    ]);
    expect(NAV_ITEMS.map((item) => item.to)).toEqual([
      "/solutions",
      "/keyboard-liberation",
      "/ai-governance",
      "/sovereign-deployment",
      "/pricing",
    ]);
  });

  it("keeps Home, Partnerships and Contact out of the top navigation", () => {
    const labels = NAV_ITEMS.map((item) => item.label);
    const targets = NAV_ITEMS.map((item) => item.to);
    expect(labels).not.toContain("Home");
    expect(labels).not.toContain("Partnerships");
    expect(labels).not.toContain("Contact");
    expect(targets).not.toContain("/");
    expect(targets).not.toContain("/partnerships");
    expect(targets).not.toContain("/contact");
  });

  it("keeps the Sovereign AI label on the existing Sovereign Deployment route", () => {
    const sovereign = NAV_ITEMS.find((item) => item.label === "Sovereign AI");
    expect(sovereign).toBeDefined();
    expect(sovereign?.to).toBe("/sovereign-deployment");
  });

  it("points the account actions at the TeleMeetUp account system", () => {
    expect(SIGN_IN_URL).toBe("https://app.telemeetup.com/login");
    expect(GET_STARTED_URL).toBe("https://app.telemeetup.com/register");
    expect(ACCOUNT_DEMO_URL).toBe("https://app.telemeetup.com/login");
    expect(REQUEST_DEMO_URL).toBe("https://app.telemeetup.com/register");
  });

  it("uses the accepted banner text verbatim", () => {
    expect(HEADER_BANNER_TEXT).toBe(
      "AI-assisted · Clinician-controlled · Designed for sovereign deployment",
    );
  });

  it("points the logo constant at the supplied final logo asset", () => {
    expect(LOGO_IMAGE.src).toBe("/assets/logo/robi-care-logo-final.png");
    expect(LOGO_IMAGE.alt).toBe("Robi Care");
    expect(LOGO_IMAGE.width).toBe(444);
    expect(LOGO_IMAGE.height).toBe(109);
  });

  it("uses the required provenance line verbatim", () => {
    expect(PROVENANCE_LINE).toBe(
      "Powered by TMU · TeleMeetUp Enablement Platform.",
    );
  });

  it("covers every page from the footer groups", () => {
    const footerTargets = FOOTER_GROUPS.flatMap((group) =>
      group.items.map((item) => item.to),
    );
    for (const item of NAV_ITEMS) {
      expect(footerTargets).toContain(item.to);
    }
  });
});
