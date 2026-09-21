import { AudienceSection } from "@/components/home/AudienceSection";
import { ClinicianControl } from "@/components/home/ClinicianControl";
import { HomeHero } from "@/components/home/HomeHero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PlatformProvenance } from "@/components/home/PlatformProvenance";
import { CtaBand } from "@/components/layout/CtaBand";

/**
 * Home page: hero, audience grid with safety banner, three-step workflow,
 * clinician-control statement, platform provenance, and the closing
 * call-to-action band. Every band sits on the dark navy canvas, alternating
 * with the raised navy section surface.
 */
export function HomePage() {
  return (
    <>
      <HomeHero />

      <AudienceSection />

      <HowItWorks />
      <ClinicianControl />
      <PlatformProvenance />

      <CtaBand
        title="Bring calm documentation to your clinic"
        description="Start with Robi Care on the TMU · TeleMeetUp Enablement Platform, or talk to us about how it fits your clinical workflow."
      />
    </>
  );
}
