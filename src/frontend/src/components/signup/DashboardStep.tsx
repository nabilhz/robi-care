import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BILLING_SUMMARY,
  DASHBOARD_STEP_COPY,
  INVOICE_ROWS,
  ROLE_OPTIONS,
  USAGE_METRICS,
} from "@/lib/signup";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  Info,
  Receipt,
  RotateCcw,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

/** Navy form-field surface with a cyan focus ring, shared by every control. */
const FIELD_CLASS =
  "border-hairline bg-card text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/40";

type DashboardStepProps = {
  fullName: string;
  onStartOver: () => void;
};

/**
 * Step 3 — personal dashboard. Editable professional details persist while the
 * user stays on the page, followed by sample usage, billing, and invoice
 * surfaces. The platform note explains the figures are not yet live.
 */
export function DashboardStep({ fullName, onStartOver }: DashboardStepProps) {
  const [role, setRole] = useState("");
  const [organisation, setOrganisation] = useState("");

  return (
    <div data-ocid="signup.dashboard_panel" className="space-y-8">
      <div
        data-ocid="signup.preview_banner"
        className="flex items-start gap-3 rounded-xl border border-primary/40 border-l-4 bg-primary/10 px-5 py-4 text-sm leading-relaxed text-foreground shadow-subtle"
      >
        <Info
          aria-hidden="true"
          className="mt-0.5 h-4 w-4 shrink-0 text-primary"
        />
        <p className="font-medium">{DASHBOARD_STEP_COPY.previewBanner}</p>
      </div>

      <div className="rounded-xl border-hairline bg-card p-7 shadow-subtle md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow">{DASHBOARD_STEP_COPY.eyebrow}</p>
            <h2 className="mt-3 text-2xl font-semibold text-foreground md:text-3xl">
              {DASHBOARD_STEP_COPY.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {DASHBOARD_STEP_COPY.description}
            </p>
          </div>
          {fullName ? (
            <span
              data-ocid="signup.account_badge"
              className="inline-flex items-center gap-2 rounded-full border-hairline bg-muted px-4 py-2 text-sm font-medium text-foreground"
            >
              <BadgeCheck aria-hidden="true" className="h-4 w-4 text-primary" />
              {fullName}
            </span>
          ) : null}
        </div>

        <div className="mt-8 border-t border-hairline pt-8">
          <h3 className="text-lg font-semibold text-foreground">
            {DASHBOARD_STEP_COPY.personalInfoTitle}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {DASHBOARD_STEP_COPY.personalInfoDescription}
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="signup-role" className="text-foreground">
                Professional role / specialty
              </Label>
              <Input
                id="signup-role"
                name="role"
                list="signup-role-options"
                value={role}
                onChange={(event) => setRole(event.target.value)}
                placeholder="e.g. Emergency Physician"
                className={FIELD_CLASS}
                data-ocid="signup.role_input"
              />
              <datalist id="signup-role-options">
                {ROLE_OPTIONS.map((option) => (
                  <option key={option} value={option} />
                ))}
              </datalist>
            </div>

            <div>
              <Label htmlFor="signup-organisation" className="text-foreground">
                Organization / practice name
              </Label>
              <Input
                id="signup-organisation"
                name="organisation"
                autoComplete="organization"
                value={organisation}
                onChange={(event) => setOrganisation(event.target.value)}
                placeholder="e.g. Northshore Family Practice"
                className={FIELD_CLASS}
                data-ocid="signup.organisation_input"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border-hairline bg-card p-7 shadow-subtle md:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15">
            <TrendingUp aria-hidden="true" className="h-5 w-5 text-primary" />
          </span>
          <h3 className="text-lg font-semibold text-foreground">
            {DASHBOARD_STEP_COPY.usageTitle}
          </h3>
        </div>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {USAGE_METRICS.map((metric) => (
            <div
              key={metric.id}
              data-ocid={`signup.usage.${metric.id}`}
              className="rounded-lg border-hairline bg-muted p-5"
            >
              <dt className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                {metric.label}
              </dt>
              <dd className="mt-3 font-display text-2xl font-bold text-foreground">
                {metric.value}
              </dd>
              <dd className="mt-1 text-xs text-muted-foreground">
                {metric.detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="rounded-xl border-hairline bg-card p-7 shadow-subtle md:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15">
            <Receipt aria-hidden="true" className="h-5 w-5 text-primary" />
          </span>
          <h3 className="text-lg font-semibold text-foreground">
            {DASHBOARD_STEP_COPY.billingTitle}
          </h3>
        </div>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-display text-4xl font-bold text-foreground">
              {BILLING_SUMMARY.amount}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {BILLING_SUMMARY.currency} · {BILLING_SUMMARY.period}
            </p>
          </div>
          <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-primary">
            {BILLING_SUMMARY.status}
          </span>
        </div>

        <dl className="mt-6 space-y-3 border-t border-hairline pt-6">
          {BILLING_SUMMARY.lines.map((line) => (
            <div
              key={line.id}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <dt className="text-muted-foreground">{line.label}</dt>
              <dd className="font-mono text-foreground">{line.value}</dd>
            </div>
          ))}
          <div className="flex items-center justify-between gap-4 border-t border-hairline pt-3 text-sm font-semibold">
            <dt className="text-foreground">{BILLING_SUMMARY.totalLabel}</dt>
            <dd className="font-mono text-primary">{BILLING_SUMMARY.amount}</dd>
          </div>
        </dl>
      </div>

      <div className="rounded-xl border-hairline bg-card p-7 shadow-subtle md:p-8">
        <h3 className="text-lg font-semibold text-foreground">
          {DASHBOARD_STEP_COPY.invoicesTitle}
        </h3>

        <div className="mt-6">
          <Table data-ocid="signup.invoice_table">
            <TableHeader>
              <TableRow className="border-hairline">
                <TableHead className="text-muted-foreground">Invoice</TableHead>
                <TableHead className="text-muted-foreground">Period</TableHead>
                <TableHead className="text-muted-foreground">Issued</TableHead>
                <TableHead className="text-right text-muted-foreground">
                  Amount
                </TableHead>
                <TableHead className="text-right text-muted-foreground">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICE_ROWS.map((row) => (
                <TableRow
                  key={row.id}
                  data-ocid={`signup.invoice_row.${row.id}`}
                  className="border-hairline"
                >
                  <TableCell className="font-mono text-foreground">
                    {row.invoice}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {row.period}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {row.issued}
                  </TableCell>
                  <TableCell className="text-right font-mono text-foreground">
                    {row.amount}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]",
                        row.status === "Paid"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {row.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <p
        data-ocid="signup.platform_note"
        className="flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/5 px-5 py-4 text-sm leading-relaxed text-foreground"
      >
        <Info
          aria-hidden="true"
          className="mt-0.5 h-4 w-4 shrink-0 text-primary"
        />
        {DASHBOARD_STEP_COPY.platformNote}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onStartOver}
          className="w-full rounded-full border border-primary bg-transparent font-bold uppercase tracking-[0.12em] text-primary hover:bg-primary/10 hover:text-primary sm:w-auto"
          data-ocid="signup.start_over_button"
        >
          <RotateCcw aria-hidden="true" />
          Start over
        </Button>
        <Button
          asChild
          size="lg"
          className="w-full rounded-full bg-primary font-bold uppercase tracking-[0.12em] text-primary-foreground hover:bg-accent/90 hover:shadow-elevated sm:w-auto"
        >
          <Link to="/" data-ocid="signup.return_home_button">
            <ArrowLeft aria-hidden="true" />
            Return home
          </Link>
        </Button>
      </div>
    </div>
  );
}
