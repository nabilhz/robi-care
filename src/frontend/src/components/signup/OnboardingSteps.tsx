import { SIGNUP_STEPS, type SignupStepId } from "@/lib/signup";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type OnboardingStepsProps = {
  current: SignupStepId;
};

/**
 * Three-step progress indicator. Completed steps show a cyan check, the active
 * step is filled cyan, and upcoming steps stay muted. The connector rule
 * between markers fills cyan once the earlier step is complete.
 */
export function OnboardingSteps({ current }: OnboardingStepsProps) {
  return (
    <ol
      data-ocid="signup.steps"
      aria-label="Sign up progress"
      className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-0"
    >
      {SIGNUP_STEPS.map((step, index) => {
        const isComplete = step.id < current;
        const isActive = step.id === current;
        const isLast = index === SIGNUP_STEPS.length - 1;

        return (
          <li
            key={step.id}
            data-ocid={`signup.step.${step.id}`}
            aria-current={isActive ? "step" : undefined}
            className="flex flex-1 items-center gap-3"
          >
            <span
              aria-hidden="true"
              className={cn(
                "grid size-9 shrink-0 place-items-center rounded-full border text-sm font-bold transition-smooth",
                isComplete &&
                  "border-primary bg-primary text-primary-foreground",
                isActive && "border-primary bg-primary/15 text-primary",
                !isComplete &&
                  !isActive &&
                  "border-hairline text-muted-foreground",
              )}
            >
              {isComplete ? <Check className="size-4" /> : step.id}
            </span>

            <span className="min-w-0">
              <span
                className={cn(
                  "block text-xs font-bold uppercase tracking-[0.16em]",
                  isActive || isComplete
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                {step.label}
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                {step.description}
              </span>
            </span>

            {!isLast ? (
              <span
                aria-hidden="true"
                className={cn(
                  "mx-4 hidden h-px flex-1 sm:block",
                  isComplete ? "bg-primary" : "bg-border",
                )}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
