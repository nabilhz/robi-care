import type { SubmitResult } from "@/backend";
import { ContactForm } from "@/components/contact/ContactForm";
import { renderWithProviders } from "@/test/helpers";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const submitContactEnquiry = vi.fn(
  async (): Promise<SubmitResult> => ({ __kind__: "ok", ok: 1n }),
);

const actorMock = {
  assignCallerUserRole: vi.fn(async () => undefined),
  execute: vi.fn(async () => ({ hasMore: false, rows: [] })),
  getApiDoc: vi.fn(async () => ""),
  getCallerUserRole: vi.fn(async () => "guest"),
  isCallerAdmin: vi.fn(async () => false),
  listContactEnquiries: vi.fn(async () => []),
  schema: vi.fn(async () => ""),
  submitContactEnquiry,
};

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({ actor: actorMock, isFetching: false }),
}));

vi.mock("@/backend", () => ({
  createActor: vi.fn(() => actorMock),
}));

beforeEach(() => {
  vi.clearAllMocks();
  submitContactEnquiry.mockResolvedValue({ __kind__: "ok", ok: 1n });
});

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Name"), "Ada Lovelace");
  await user.type(screen.getByLabelText("Email"), "ada@example.com");
  await user.type(screen.getByLabelText("Organisation"), "Analytical Clinic");
  await user.type(
    screen.getByLabelText("Message"),
    "Please tell me more about Robi Care.",
  );
}

describe("ContactForm", () => {
  it("shows inline validation errors and does not submit an empty form", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    expect(
      await screen.findByText("Please enter your name."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Please enter your email address."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Please enter your organisation."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Please tell us how we can help."),
    ).toBeInTheDocument();
    expect(submitContactEnquiry).not.toHaveBeenCalled();
  });

  it("rejects a malformed email address", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await user.type(screen.getByLabelText("Name"), "Ada Lovelace");
    await user.type(screen.getByLabelText("Email"), "not-an-email");
    await user.type(screen.getByLabelText("Organisation"), "Analytical Clinic");
    await user.type(screen.getByLabelText("Message"), "Hello there.");
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    expect(
      await screen.findByText("Please enter a valid email address."),
    ).toBeInTheDocument();
    expect(submitContactEnquiry).not.toHaveBeenCalled();
  });

  it("submits a valid enquiry and shows an on-screen confirmation", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    await waitFor(() => {
      expect(submitContactEnquiry).toHaveBeenCalledWith(
        "Ada Lovelace",
        "ada@example.com",
        "Analytical Clinic",
        "Please tell me more about Robi Care.",
      );
    });

    expect(
      await screen.findByText(/your enquiry has been sent/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/hello@tmu\.ai/)).toBeInTheDocument();
  });

  it("shows an error state when the backend rejects the enquiry", async () => {
    submitContactEnquiry.mockResolvedValueOnce({
      __kind__: "err",
      err: "Email could not be sent",
    });
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    expect(
      await screen.findByText(/could not send your enquiry/i),
    ).toBeInTheDocument();
  });
});
