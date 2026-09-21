/**
 * Copy, validation, and placeholder data for the three-step Sign Up flow.
 *
 * This flow is a visual placeholder: nothing here talks to the backend, sends
 * a real verification code, or computes real billing. The sample figures below
 * exist so the dashboard reads as a finished product surface.
 */

export const SIGNUP_STEPS = [
  {
    id: 1,
    label: "Account",
    description: "Your details",
  },
  {
    id: 2,
    label: "Verification",
    description: "Confirm your email",
  },
  {
    id: 3,
    label: "Dashboard",
    description: "Your workspace",
  },
] as const;

export type SignupStepId = (typeof SIGNUP_STEPS)[number]["id"];

export const SIGNUP_HEADER = {
  eyebrow: "Create your account",
  title: "Set up Robi Care",
  description:
    "Three short steps: tell us who you are, confirm your email address, then review your personal dashboard.",
};

export const ACCOUNT_STEP_COPY = {
  eyebrow: "Step 1 of 3",
  title: "Account details",
  description:
    "We use these details to create your Robi Care account and to reach you about your deployment.",
};

export const VERIFICATION_STEP_COPY = {
  eyebrow: "Step 2 of 3",
  title: "Verify your email",
  description:
    "Enter the verification code we sent to your email address to confirm it belongs to you.",
  kycNote:
    "As part of standard account security procedures, identity information may be verified before your account is activated (KYC/AML).",
};

export const DASHBOARD_STEP_COPY = {
  eyebrow: "Step 3 of 3",
  title: "Your personal dashboard",
  description:
    "Tell us how you work, then review a preview of your usage and billing.",
  personalInfoTitle: "Personal information",
  personalInfoDescription:
    "This helps us tailor Robi Care to your clinical setting. Values are kept while you remain on this page.",
  usageTitle: "Usage Summary",
  previewBanner:
    "This is a preview with example data. Your real usage and billing figures will appear here once your account is linked to the TMU Enablement Platform.",
  billingTitle: "Current Billing Period Cost",
  invoicesTitle: "Account & Invoice History",
  platformNote:
    "Your usage and billing details will update automatically once your account is linked to the TMU Enablement Platform.",
};

export const ROLE_OPTIONS = [
  "Physician",
  "Nurse",
  "Nurse Practitioner",
  "Emergency Physician",
  "Paramedic / EMS",
  "Clinic Administrator",
  "Hospital Administrator",
  "Clinical Informaticist",
  "Other",
] as const;

export type UsageMetric = {
  id: string;
  label: string;
  value: string;
  detail: string;
};

/** Sample usage figures shown until the account is linked to the platform. */
export const USAGE_METRICS: UsageMetric[] = [
  {
    id: "encounters",
    label: "Clinical encounters captured",
    value: "128",
    detail: "Across the current billing period",
  },
  {
    id: "notes",
    label: "Structured notes generated",
    value: "342",
    detail: "Prepared for clinician review",
  },
  {
    id: "minutes",
    label: "Documentation time saved",
    value: "9h 40m",
    detail: "Estimated against manual entry",
  },
  {
    id: "seats",
    label: "Active clinician seats",
    value: "6",
    detail: "Of 10 provisioned seats",
  },
];

export const BILLING_SUMMARY = {
  amount: "$486.00",
  currency: "CAD",
  period: "1–30 September 2026",
  status: "Estimated",
  lines: [
    { id: "seats", label: "Clinician seats (6 × $65.00)", value: "$390.00" },
    { id: "usage", label: "Usage overage", value: "$72.00" },
    { id: "platform", label: "Platform enablement fee", value: "$24.00" },
  ],
  totalLabel: "Estimated total",
};

export type InvoiceRow = {
  id: string;
  invoice: string;
  period: string;
  issued: string;
  amount: string;
  status: "Paid" | "Pending";
};

/** Sample invoice history rows. */
export const INVOICE_ROWS: InvoiceRow[] = [
  {
    id: "INV-2026-09",
    invoice: "INV-2026-09",
    period: "September 2026",
    issued: "1 Sep 2026",
    amount: "$486.00",
    status: "Pending",
  },
  {
    id: "INV-2026-08",
    invoice: "INV-2026-08",
    period: "August 2026",
    issued: "1 Aug 2026",
    amount: "$452.00",
    status: "Paid",
  },
  {
    id: "INV-2026-07",
    invoice: "INV-2026-07",
    period: "July 2026",
    issued: "1 Jul 2026",
    amount: "$418.00",
    status: "Paid",
  },
  {
    id: "INV-2026-06",
    invoice: "INV-2026-06",
    period: "June 2026",
    issued: "1 Jun 2026",
    amount: "$390.00",
    status: "Paid",
  },
];

export type AccountDraft = {
  fullName: string;
  email: string;
  phone: string;
};

export type AccountField = keyof AccountDraft;
export type AccountErrors = Partial<Record<AccountField, string>>;

export const EMPTY_ACCOUNT_DRAFT: AccountDraft = {
  fullName: "",
  email: "",
  phone: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Digits, spaces, and the usual separators; 7–15 digits once stripped. */
const PHONE_ALLOWED_PATTERN = /^[+()\-.\s\d]+$/;

export function validateAccount(draft: AccountDraft): AccountErrors {
  const errors: AccountErrors = {};

  if (!draft.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  }

  const email = draft.email.trim();
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  const phone = draft.phone.trim();
  if (!phone) {
    errors.phone = "Please enter your mobile phone number.";
  } else if (!PHONE_ALLOWED_PATTERN.test(phone)) {
    errors.phone = "Use digits, spaces, and + ( ) - . only.";
  } else {
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15) {
      errors.phone = "Please enter a plausible phone number.";
    }
  }

  return errors;
}

/** A verification code is any 4–6 digit sequence. */
export function isValidVerificationCode(code: string): boolean {
  return /^\d{4,6}$/.test(code);
}
