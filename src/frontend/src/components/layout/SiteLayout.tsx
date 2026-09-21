import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import type { ReactNode } from "react";

/**
 * Global shell: fixed top navigation, page content, and the shared footer.
 * The header is fixed, so content is offset by the header height plus the
 * thin announcement banner that sits above the main navigation bar.
 */
export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <SiteHeader />
      <main className="flex-1 pt-[6.25rem] md:pt-[7.25rem]">{children}</main>
      <SiteFooter />
    </div>
  );
}
