import { cn } from "@/lib/utils";

type UsageCell = {
  /** Unit count exactly as it should read, e.g. "7,200 min". */
  units: string;
  /** US$ figure exactly as it should read, e.g. "$532.80". */
  price: string;
};

type UsageRow = {
  id: string;
  label: string;
  /** One cell per tier, in the same order as TIER_COLUMNS. */
  cells: [UsageCell, UsageCell, UsageCell];
};

const TIER_COLUMNS = [
  { id: "premium-pro", name: "Premium Pro", allowance: "4 hours/day" },
  {
    id: "premium-business",
    name: "Premium Business",
    allowance: "20 hours/day",
  },
  { id: "enterprise", name: "Enterprise", allowance: "200 hours/day" },
] as const;

const USAGE_ROWS: UsageRow[] = [
  {
    id: "transcription",
    label: "Speech-to-Text Transcription (minutes)",
    cells: [
      { units: "7,200 min", price: "$532.80" },
      { units: "36,000 min", price: "$2,664.00" },
      { units: "360,000 min", price: "$26,640.00" },
    ],
  },
  {
    id: "chatgpt",
    label: "Access to ChatGPT (1,000 tokens)",
    cells: [
      { units: "2,880", price: "$57.60" },
      { units: "14,400", price: "$288.00" },
      { units: "144,000", price: "$2,880.00" },
    ],
  },
  {
    id: "audio",
    label: "Audio Recording (GB per month)",
    cells: [
      { units: "3.6 GB", price: "$18.90" },
      { units: "18 GB", price: "$94.50" },
      { units: "180 GB", price: "$945.00" },
    ],
  },
];

/**
 * Three-tier monthly usage comparison table on the dark navy canvas. Every cell
 * renders light foreground text on the navy surface, spec values stay in the
 * monospace face, and hairline rules separate the rows. The wrapper scrolls
 * horizontally on narrow screens rather than clipping its columns.
 */
export function PricingUsageTable() {
  return (
    <div
      data-ocid="pricing.usage_table"
      className="mt-14 overflow-x-auto rounded-xl border-hairline bg-canvas shadow-subtle"
    >
      <table className="w-full min-w-[46rem] border-collapse text-left text-sm text-foreground">
        <caption className="sr-only">
          Monthly usage breakdown by tier, with unit counts and US$ amounts
        </caption>
        <thead>
          <tr className="border-b border-border">
            <th
              scope="col"
              className="w-[28%] px-5 py-5 align-bottom text-xs font-bold uppercase tracking-[0.14em] text-foreground"
            >
              Units
            </th>
            {TIER_COLUMNS.map((tier) => (
              <th
                key={tier.id}
                scope="col"
                data-ocid={`pricing.usage_table.tier.${tier.id}`}
                className="px-5 py-5 align-bottom text-foreground"
              >
                <span className="block font-display text-base font-semibold">
                  {tier.name}
                </span>
                <span className="mt-1 block font-mono text-xs font-medium uppercase tracking-[0.12em] text-foreground">
                  {tier.allowance}
                </span>
              </th>
            ))}
          </tr>
          <tr className="border-b border-border">
            <th
              scope="col"
              className="px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-foreground"
            >
              Number of Units
            </th>
            {TIER_COLUMNS.map((tier) => (
              <th
                key={tier.id}
                scope="col"
                className="px-5 py-3 text-right text-xs font-bold uppercase tracking-[0.14em] text-foreground"
              >
                US$
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {USAGE_ROWS.map((row) => (
            <tr
              key={row.id}
              data-ocid={`pricing.usage_table.row.${row.id}`}
              className="border-b border-border transition-smooth last:border-b-0 hover:bg-muted/60"
            >
              <th
                scope="row"
                className="px-5 py-5 text-left align-top font-medium text-foreground"
              >
                {row.label}
              </th>
              {row.cells.map((cell, index) => (
                <td
                  key={TIER_COLUMNS[index].id}
                  className="px-5 py-5 align-top text-foreground"
                >
                  <span className="block font-mono tabular-nums">
                    {cell.units}
                  </span>
                  <span className="mt-1 block text-right font-mono font-medium tabular-nums">
                    {cell.price}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type { UsageCell, UsageRow };
export { TIER_COLUMNS, USAGE_ROWS };
