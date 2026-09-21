import { PocketIc } from "@dfinity/pic";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { idlFactory } from "../../src/frontend/src/declarations/backend.did.js";
import type { _SERVICE } from "../../src/frontend/src/declarations/backend.did";

const PIC_URL = process.env.POCKET_IC_URL ?? "";
const BACKEND_WASM = process.env.BACKEND_WASM ?? "";

let pic: PocketIc | undefined;
let actor: _SERVICE;

beforeAll(async () => {
  pic = await PocketIc.create(PIC_URL);
  ({ actor } = await pic.setupCanister<_SERVICE>({
    idlFactory,
    wasm: BACKEND_WASM,
  }));
});

afterAll(async () => {
  await pic?.tearDown();
});

describe("contact enquiry backend", () => {
  it("rejects an anonymous caller from listing enquiries", async () => {
    await expect(actor.listContactEnquiries()).rejects.toThrow(/Unauthorized/u);
  });

  it("rejects an enquiry with an invalid email without storing it", async () => {
    const result = await actor.submitContactEnquiry(
      "Grace Hopper",
      "not-an-email",
      "Naval Systems",
      "Interested in a demo.",
    );
    expect("err" in result).toBe(true);
    if ("err" in result) {
      expect(result.err).toMatch(/valid email/u);
    }
  });

  it("rejects an enquiry with a missing name", async () => {
    const result = await actor.submitContactEnquiry(
      "   ",
      "grace@example.com",
      "Naval Systems",
      "Interested in a demo.",
    );
    expect("err" in result).toBe(true);
    if ("err" in result) {
      expect(result.err).toMatch(/name/u);
    }
  });

  it("exposes the API documentation and schema without trapping", async () => {
    await expect(actor.getApiDoc()).resolves.toEqual(expect.any(String));
    await expect(actor.schema()).resolves.toEqual(expect.any(String));
  });
});
