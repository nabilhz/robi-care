import { SignUpPage } from "@/pages/SignUpPage";
import { renderWithProviders } from "@/test/helpers";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import App from "@/App";

/**
 * Cover for the accepted `/signup` addition: a new in-app route renders a
 * three-step onboarding flow, and Step 1 shows Full Name, Email Address, and
 * Mobile Phone Number fields with a Continue button.
 *
 * The route is exercised through the real `App` router so the assertion proves
 * `/signup` is actually registered, not merely that the page component renders.
 * The page component is also rendered directly for the field-level checks.
 *
 * Out of scope by request: real email verification delivery/validation and live
 * usage/billing data. Those seams are mocked or left unasserted.
 */
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

beforeEach(() => {
  window.history.pushState({}, "", "/");
  vi.clearAllMocks();
});

describe("/signup route renders the three-step onboarding flow", () => {
  it("renders the signup page when navigating to /signup", async () => {
    window.history.pushState({}, "", "/signup");
    renderWithProviders(<App />);

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: /set up robi care/i,
      }),
    ).toBeInTheDocument();

    expect(document.querySelector('[data-ocid="signup.page"]')).not.toBeNull();
  });

  it("shows the three-step progress indicator with Account active on Step 1", async () => {
    window.history.pushState({}, "", "/signup");
    renderWithProviders(<App />);
    await screen.findByRole("heading", { level: 1 });

    const steps = document.querySelector(
      '[data-ocid="signup.steps"]',
    ) as HTMLElement | null;
    expect(steps).not.toBeNull();

    const items = within(steps as HTMLElement).getAllByRole("listitem");
    expect(items).toHaveLength(3);

    const active = within(steps as HTMLElement).getByRole("listitem", {
      current: "step",
    });
    expect(active).toHaveTextContent("Account");
  });
});

describe("Step 1 account fields and Continue button", () => {
  it("renders Full Name, Email Address, and Mobile Phone Number fields", () => {
    renderWithProviders(<SignUpPage />);

    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Mobile Phone Number")).toBeInTheDocument();
  });

  it("renders a Continue button inside the account form", () => {
    renderWithProviders(<SignUpPage />);

    const form = document.querySelector(
      '[data-ocid="signup.account_form"]',
    ) as HTMLElement | null;
    expect(form).not.toBeNull();

    expect(
      within(form as HTMLElement).getByRole("button", { name: /continue/i }),
    ).toBeInTheDocument();
  });

  it("keeps the user on Step 1 and shows inline errors when Continue is pressed with empty fields", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SignUpPage />);

    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(
      screen.getByText("Please enter your full name."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Please enter your email address."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Please enter your mobile phone number."),
    ).toBeInTheDocument();

    // Step 2 must not appear while Step 1 is invalid.
    expect(
      document.querySelector('[data-ocid="signup.verification_panel"]'),
    ).toBeNull();
  });

  it("advances to Step 2 once all three fields are valid", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SignUpPage />);

    await user.type(screen.getByLabelText("Full Name"), "Ada Lovelace");
    await user.type(screen.getByLabelText("Email Address"), "ada@example.com");
    await user.type(
      screen.getByLabelText("Mobile Phone Number"),
      "+1 555 010 2030",
    );
    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(
      document.querySelector('[data-ocid="signup.verification_panel"]'),
    ).not.toBeNull();
    expect(
      document.querySelector('[data-ocid="signup.account_form"]'),
    ).toBeNull();
  });
});
