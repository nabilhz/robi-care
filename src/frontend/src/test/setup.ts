import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// jsdom does not implement ResizeObserver, which the `input-otp` control used
// by the signup verification step observes on mount. A no-op stand-in keeps the
// DOM environment faithful enough to render that component.
if (typeof globalThis.ResizeObserver === "undefined") {
  class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  globalThis.ResizeObserver =
    ResizeObserverStub as unknown as typeof ResizeObserver;
}

// jsdom does not implement `document.elementFromPoint`, which the `input-otp`
// control used by the signup verification step calls from a deferred timer.
// Without a stand-in that timer throws an unhandled exception after the test
// that mounted the control has finished, failing the whole run.
if (typeof document.elementFromPoint !== "function") {
  document.elementFromPoint = () => null;
}

afterEach(() => {
  cleanup();
});
