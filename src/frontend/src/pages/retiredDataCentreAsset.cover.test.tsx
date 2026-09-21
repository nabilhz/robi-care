import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Cover for the accepted data-centre asset deletion.
 *
 * The request removes exactly one orphan file,
 * `public/assets/generated/sovereign-deployment-data-centre.dim_1536x1024.jpg`,
 * and changes no source file. The observable acceptance criteria are:
 *
 *   1. the retired asset file no longer exists in the project;
 *   2. no page renders an image whose src references a data-center,
 *      server-room, or infrastructure asset;
 *   3. every photograph displayed on every page remains a clinical/human
 *      scene, unchanged from before this build.
 *
 * Criterion 2 and 3 are asserted at the rendering layer by
 * `sitePhotoHygiene.characterization.test.tsx` and
 * `sovereignClinicalPhotos.cover.test.tsx`. This file pins the filesystem
 * half of the change — the deletion itself — which no rendering test can see,
 * and guards against the deletion having orphaned a still-referenced asset.
 *
 * The frontend `test` script runs with `app/src/frontend` as the working
 * directory, so public assets resolve from there.
 */
const GENERATED_DIR = resolve(process.cwd(), "public/assets/generated");

/** The exact orphan file the request deletes. */
const RETIRED_ASSET = resolve(
  GENERATED_DIR,
  "sovereign-deployment-data-centre.dim_1536x1024.jpg",
);

/** Filename wording that would name technology-infrastructure imagery. */
const INFRASTRUCTURE_FILENAME = /data-?cent(er|re)|server|rack|datacentre/i;

describe("the retired data-centre asset is gone from the project", () => {
  it("does not exist on disk", () => {
    expect(existsSync(RETIRED_ASSET)).toBe(false);
  });

  it("leaves no generated asset whose filename names infrastructure imagery", () => {
    const files = readdirSync(GENERATED_DIR);
    expect(files.length).toBeGreaterThan(0);

    for (const file of files) {
      expect(file).not.toMatch(INFRASTRUCTURE_FILENAME);
    }
  });
});

describe("the deletion did not orphan a referenced photograph", () => {
  it("keeps every generated asset referenced by the site present on disk", () => {
    // The generated photographs the pages reference, mirrored from the page
    // sources. If the deletion had removed a still-referenced file, the
    // corresponding entry here would fail to resolve.
    const referenced = [
      "ai-governance-admin-dashboard.dim_1536x1024.jpg",
      "ai-governance-clinician-review.dim_1536x1024.jpg",
      "ai-governance-human-in-the-loop.dim_1536x1024.jpg",
      "audience-ems-field-handover.dim_1536x1024.jpg",
      "audience-nurse-handover.dim_1536x1024.jpg",
      "clinician-review-notes.dim_1536x1024.jpg",
      "contact-clinic-reception.dim_1536x1024.jpg",
      "hero-clinical-room.dim_1536x1024.jpg",
      "hero-eye-contact-consultation.dim_1920x1080.jpg",
      "keyboard-liberation-consultation.dim_1536x1024.jpg",
      "keyboard-liberation-hero.dim_1536x1024.jpg",
      "keyboard-liberation-proof-points.dim_1536x1024.jpg",
      "partnerships-clinic-boardroom.dim_1536x1024.jpg",
      "partnerships-ppp-collaboration.dim_1536x1024.jpg",
      "pricing-clinic-desk.dim_1536x1024.jpg",
      "solution-conversation-capture.dim_1536x1024.jpg",
      "solution-follow-up-coordination.dim_1536x1024.jpg",
      "solution-structured-documentation.dim_1536x1024.jpg",
      "solutions-hero-clinic-team.dim_1536x1024.jpg",
      "sovereign-deployment-in-country-hosting.dim_1536x1024.jpg",
      "sovereign-deployment-next-step.dim_1536x1024.jpg",
      "sponsorship-community-clinic.dim_1536x1024.jpg",
    ];

    for (const file of referenced) {
      expect(existsSync(resolve(GENERATED_DIR, file))).toBe(true);
    }
  });
});
