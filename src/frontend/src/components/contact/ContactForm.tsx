import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation } from "@tanstack/react-query";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { type FormEvent, useState } from "react";

type FieldName = "name" | "email" | "organisation" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY_DRAFT: Record<FieldName, string> = {
  name: "",
  email: "",
  organisation: "",
  message: "",
};

/** Navy form-field surface with a cyan focus ring, shared by every control. */
const FIELD_CLASS =
  "border-hairline bg-card text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/40";

function validate(draft: Record<FieldName, string>): FieldErrors {
  const errors: FieldErrors = {};
  if (!draft.name.trim()) errors.name = "Please enter your name.";
  if (!draft.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(draft.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!draft.organisation.trim()) {
    errors.organisation = "Please enter your organisation.";
  }
  if (!draft.message.trim()) {
    errors.message = "Please tell us how we can help.";
  }
  return errors;
}

/**
 * Contact enquiry form on the dark navy card surface. Validates inline,
 * submits to the backend, and shows an on-screen confirmation once the
 * enquiry is stored.
 */
export function ContactForm() {
  const { actor } = useActor(createActor);
  const [draft, setDraft] = useState<Record<FieldName, string>>(EMPTY_DRAFT);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async (values: Record<FieldName, string>) => {
      if (!actor) throw new Error("Backend is not ready");
      const result = await actor.submitContactEnquiry(
        values.name.trim(),
        values.email.trim(),
        values.organisation.trim(),
        values.message.trim(),
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
  });

  function updateField(field: FieldName, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const captured = draft;
    setDraft(EMPTY_DRAFT);
    setSubmitted(false);
    mutation.mutate(captured, {
      onSuccess: () => setSubmitted(true),
      onError: () => {
        setDraft((current) =>
          current.name === "" && current.message === "" ? captured : current,
        );
      },
    });
  }

  const fieldError = (field: FieldName) =>
    errors[field] ? (
      <p
        id={`contact-${field}-error`}
        data-ocid={`contact.${field}_error`}
        className="mt-2 flex items-center gap-1.5 text-sm text-destructive"
      >
        <AlertCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
        {errors[field]}
      </p>
    ) : null;

  const inputClass = (field: FieldName) =>
    errors[field]
      ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/40"
      : undefined;

  if (submitted) {
    return (
      <div
        data-ocid="contact.success_state"
        className="rounded-xl border-hairline bg-card p-8 shadow-subtle"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
          <CheckCircle2 aria-hidden="true" className="h-6 w-6 text-primary" />
        </span>
        <h3 className="mt-5 text-xl font-semibold text-foreground">
          Thank you — your enquiry has been sent
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Your message has reached the Robi Care team at hello@tmu.ai. We
          usually respond within one business day.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6 rounded-full border border-primary bg-transparent font-bold uppercase tracking-[0.12em] text-primary hover:bg-primary/10 hover:text-primary"
          data-ocid="contact.send_another_button"
          onClick={() => setSubmitted(false)}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      data-ocid="contact.form"
      className="rounded-xl border-hairline bg-card p-7 shadow-subtle md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-name" className="text-foreground">
            Name
          </Label>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            value={draft.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={[FIELD_CLASS, inputClass("name")]
              .filter(Boolean)
              .join(" ")}
            data-ocid="contact.name_input"
          />
          {fieldError("name")}
        </div>

        <div>
          <Label htmlFor="contact-email" className="text-foreground">
            Email
          </Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={draft.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={[FIELD_CLASS, inputClass("email")]
              .filter(Boolean)
              .join(" ")}
            data-ocid="contact.email_input"
          />
          {fieldError("email")}
        </div>
      </div>

      <div className="mt-5">
        <Label htmlFor="contact-organisation" className="text-foreground">
          Organisation
        </Label>
        <Input
          id="contact-organisation"
          name="organisation"
          autoComplete="organization"
          value={draft.organisation}
          onChange={(event) => updateField("organisation", event.target.value)}
          aria-invalid={Boolean(errors.organisation)}
          aria-describedby={
            errors.organisation ? "contact-organisation-error" : undefined
          }
          className={[FIELD_CLASS, inputClass("organisation")]
            .filter(Boolean)
            .join(" ")}
          data-ocid="contact.organisation_input"
        />
        {fieldError("organisation")}
      </div>

      <div className="mt-5">
        <Label htmlFor="contact-message" className="text-foreground">
          Message
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          rows={5}
          value={draft.message}
          onChange={(event) => updateField("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
          className={[FIELD_CLASS, inputClass("message")]
            .filter(Boolean)
            .join(" ")}
          data-ocid="contact.message_textarea"
        />
        {fieldError("message")}
      </div>

      {mutation.isError ? (
        <p
          data-ocid="contact.error_state"
          className="mt-5 flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          We could not send your enquiry just now. Please try again, or email
          hello@tmu.ai directly.
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={mutation.isPending}
        className="mt-6 w-full rounded-full bg-primary font-bold uppercase tracking-[0.12em] text-primary-foreground hover:bg-accent/90 hover:shadow-elevated sm:w-auto"
        data-ocid="contact.submit_button"
      >
        {mutation.isPending ? (
          <>
            <Loader2 aria-hidden="true" className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send enquiry
            <Send aria-hidden="true" />
          </>
        )}
      </Button>
    </form>
  );
}
