import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { VERIFICATION_STEP_COPY, isValidVerificationCode } from "@/lib/signup";
import { ArrowLeft, ArrowRight, MailCheck, ShieldCheck } from "lucide-react";
import { type FormEvent, useState } from "react";

type VerificationStepProps = {
  email: string;
  onVerify: () => void;
  onBack: () => void;
};

/**
 * Step 2 — email verification. Shows the address entered in Step 1, accepts
 * any 4–6 digit code, and offers a route back to correct the details.
 */
export function VerificationStep({
  email,
  onVerify,
  onBack,
}: VerificationStepProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValidVerificationCode(code)) {
      setError("Enter the 4–6 digit code from your email.");
      return;
    }
    setError(null);
    onVerify();
  }

  return (
    <div
      data-ocid="signup.verification_panel"
      className="rounded-xl border-hairline bg-card p-7 shadow-subtle md:p-8"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
        <MailCheck aria-hidden="true" className="h-6 w-6 text-primary" />
      </span>

      <p className="eyebrow mt-5">{VERIFICATION_STEP_COPY.eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold text-foreground md:text-3xl">
        {VERIFICATION_STEP_COPY.title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {VERIFICATION_STEP_COPY.description}
      </p>

      <p
        data-ocid="signup.sent_to_email"
        className="mt-4 inline-flex max-w-full items-center gap-2 rounded-lg border-hairline bg-muted px-4 py-2 text-sm font-medium text-foreground"
      >
        <span className="text-muted-foreground">Sent to</span>
        <span className="truncate font-mono text-primary">{email}</span>
      </p>

      <form noValidate onSubmit={handleSubmit} className="mt-7">
        <label
          htmlFor="signup-verification-code"
          className="text-sm font-medium text-foreground"
        >
          Verification code
        </label>
        <div className="mt-3">
          <InputOTP
            id="signup-verification-code"
            maxLength={6}
            value={code}
            onChange={(value) => {
              setCode(value);
              if (error) setError(null);
            }}
            inputMode="numeric"
            pattern="^[0-9]*$"
            containerClassName="justify-start"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "signup-code-error" : undefined}
            data-ocid="signup.code_input"
          >
            <InputOTPGroup className="gap-2">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="h-12 w-11 rounded-md border-hairline bg-card text-base text-foreground first:rounded-md last:rounded-md"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        {error ? (
          <p
            id="signup-code-error"
            data-ocid="signup.code_error"
            className="mt-3 text-sm text-destructive"
          >
            {error}
          </p>
        ) : null}

        <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
          <ShieldCheck
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-primary"
          />
          {VERIFICATION_STEP_COPY.kycNote}
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-full bg-primary font-bold uppercase tracking-[0.12em] text-primary-foreground hover:bg-accent/90 hover:shadow-elevated sm:w-auto"
            data-ocid="signup.verify_button"
          >
            Verify
            <ArrowRight aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onBack}
            className="w-full rounded-full border border-primary bg-transparent font-bold uppercase tracking-[0.12em] text-primary hover:bg-primary/10 hover:text-primary sm:w-auto"
            data-ocid="signup.back_button"
          >
            <ArrowLeft aria-hidden="true" />
            Back to details
          </Button>
        </div>
      </form>
    </div>
  );
}
