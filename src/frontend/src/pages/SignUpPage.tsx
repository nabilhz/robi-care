import { AccountStep } from "@/components/signup/AccountStep";
import { DashboardStep } from "@/components/signup/DashboardStep";
import { OnboardingSteps } from "@/components/signup/OnboardingSteps";
import { VerificationStep } from "@/components/signup/VerificationStep";
import {
  ACCOUNT_STEP_COPY,
  type AccountDraft,
  type AccountErrors,
  type AccountField,
  EMPTY_ACCOUNT_DRAFT,
  SIGNUP_HEADER,
  type SignupStepId,
  validateAccount,
} from "@/lib/signup";
import { useState } from "react";

/**
 * Three-step Sign Up flow rendered inside the shared site shell (the root
 * route applies `SiteLayout`). This is a visual placeholder: no backend calls,
 * no real verification, and no billing logic.
 */
export function SignUpPage() {
  const [step, setStep] = useState<SignupStepId>(1);
  const [draft, setDraft] = useState<AccountDraft>(EMPTY_ACCOUNT_DRAFT);
  const [errors, setErrors] = useState<AccountErrors>({});

  function updateField(field: AccountField, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function handleContinue() {
    const nextErrors = validateAccount(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setStep(2);
  }

  function handleStartOver() {
    setDraft(EMPTY_ACCOUNT_DRAFT);
    setErrors({});
    setStep(1);
  }

  return (
    <section
      data-ocid="signup.page"
      className="bg-canvas pb-20 pt-32 md:pb-28 md:pt-40"
    >
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow rule-accent inline-block pb-2">
            {SIGNUP_HEADER.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {SIGNUP_HEADER.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {SIGNUP_HEADER.description}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <OnboardingSteps current={step} />

          <div className="mt-10">
            {step === 1 ? (
              <AccountStep
                draft={draft}
                errors={errors}
                onChange={updateField}
                onContinue={handleContinue}
              />
            ) : null}

            {step === 2 ? (
              <VerificationStep
                email={draft.email.trim()}
                onVerify={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            ) : null}

            {step === 3 ? (
              <DashboardStep
                fullName={draft.fullName.trim()}
                onStartOver={handleStartOver}
              />
            ) : null}
          </div>

          {step === 1 ? (
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              {ACCOUNT_STEP_COPY.description}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
