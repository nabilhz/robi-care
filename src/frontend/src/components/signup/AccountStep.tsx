import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ACCOUNT_STEP_COPY,
  type AccountDraft,
  type AccountErrors,
  type AccountField,
} from "@/lib/signup";
import { AlertCircle, ArrowRight } from "lucide-react";
import { type FormEvent, useState } from "react";

/** Navy form-field surface with a cyan focus ring, shared by every control. */
const FIELD_CLASS =
  "border-hairline bg-card text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/40";

type AccountStepProps = {
  draft: AccountDraft;
  errors: AccountErrors;
  onChange: (field: AccountField, value: string) => void;
  onContinue: () => void;
};

/**
 * Step 1 — account creation. Collects full name, email, and mobile number,
 * validates inline, and advances only when every field is valid.
 */
export function AccountStep({
  draft,
  errors,
  onChange,
  onContinue,
}: AccountStepProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    onContinue();
  }

  const showError = (field: AccountField) =>
    submitted && errors[field] ? (
      <p
        id={`signup-${field}-error`}
        data-ocid={`signup.${field}_error`}
        className="mt-2 flex items-center gap-1.5 text-sm text-destructive"
      >
        <AlertCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
        {errors[field]}
      </p>
    ) : null;

  const inputClass = (field: AccountField) =>
    submitted && errors[field]
      ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/40"
      : undefined;

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      data-ocid="signup.account_form"
      className="rounded-xl border-hairline bg-card p-7 shadow-subtle md:p-8"
    >
      <p className="eyebrow">{ACCOUNT_STEP_COPY.eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold text-foreground md:text-3xl">
        {ACCOUNT_STEP_COPY.title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {ACCOUNT_STEP_COPY.description}
      </p>

      <div className="mt-7 space-y-5">
        <div>
          <Label htmlFor="signup-full-name" className="text-foreground">
            Full Name
          </Label>
          <Input
            id="signup-full-name"
            name="fullName"
            autoComplete="name"
            value={draft.fullName}
            onChange={(event) => onChange("fullName", event.target.value)}
            aria-invalid={submitted && Boolean(errors.fullName)}
            aria-describedby={
              submitted && errors.fullName ? "signup-fullName-error" : undefined
            }
            className={[FIELD_CLASS, inputClass("fullName")]
              .filter(Boolean)
              .join(" ")}
            data-ocid="signup.full_name_input"
          />
          {showError("fullName")}
        </div>

        <div>
          <Label htmlFor="signup-email" className="text-foreground">
            Email Address
          </Label>
          <Input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            value={draft.email}
            onChange={(event) => onChange("email", event.target.value)}
            aria-invalid={submitted && Boolean(errors.email)}
            aria-describedby={
              submitted && errors.email ? "signup-email-error" : undefined
            }
            className={[FIELD_CLASS, inputClass("email")]
              .filter(Boolean)
              .join(" ")}
            data-ocid="signup.email_input"
          />
          {showError("email")}
        </div>

        <div>
          <Label htmlFor="signup-phone" className="text-foreground">
            Mobile Phone Number
          </Label>
          <Input
            id="signup-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={draft.phone}
            onChange={(event) => onChange("phone", event.target.value)}
            aria-invalid={submitted && Boolean(errors.phone)}
            aria-describedby={
              submitted && errors.phone ? "signup-phone-error" : undefined
            }
            className={[FIELD_CLASS, inputClass("phone")]
              .filter(Boolean)
              .join(" ")}
            data-ocid="signup.phone_input"
          />
          {showError("phone")}
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="mt-7 w-full rounded-full bg-primary font-bold uppercase tracking-[0.12em] text-primary-foreground hover:bg-accent/90 hover:shadow-elevated sm:w-auto"
        data-ocid="signup.continue_button"
      >
        Continue
        <ArrowRight aria-hidden="true" />
      </Button>
    </form>
  );
}
