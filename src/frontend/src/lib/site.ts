export const SITE_NAME = "Robi Care";

export const SIGN_IN_URL = "https://app.telemeetup.com/login";
export const GET_STARTED_URL = "https://app.telemeetup.com/register";

export const PROVENANCE_LINE =
  "Powered by TMU · TeleMeetUp Enablement Platform.";

/**
 * Supplied Robi Care logo, used exactly as provided and unmodified.
 * The artwork ships on its own solid dark background, so it is rendered
 * directly on the dark navigation bar and footer with no chip or container.
 */
export const LOGO_IMAGE = {
  src: "/assets/logo/robi-care-logo-final.png",
  alt: "Robi Care",
  width: 444,
  height: 109,
};

export type NavItem = {
  label: string;
  to: string;
};

/**
 * Top navigation only. Home is intentionally absent — the logo links home.
 * Partnerships and Contact stay reachable through the footer and their routes.
 */
export const NAV_ITEMS: NavItem[] = [
  { label: "Solutions", to: "/solutions" },
  { label: "Keyboard Liberation", to: "/keyboard-liberation" },
  { label: "AI Governance", to: "/ai-governance" },
  { label: "Sovereign AI", to: "/sovereign-deployment" },
  { label: "Pricing", to: "/pricing" },
];

/** Thin announcement bar above the main navigation. */
export const HEADER_BANNER_TEXT =
  "AI-assisted · Clinician-controlled · Designed for sovereign deployment";

/** Header action destinations, replacing the former Sign In / Get Started pair. */
export const ACCOUNT_DEMO_URL = "https://app.telemeetup.com/login";
export const REQUEST_DEMO_URL = "https://app.telemeetup.com/register";

/** In-app Sign Up route, used by the header and hero primary actions. */
export const SIGN_UP_ROUTE = "/signup";
export const SIGN_UP_LABEL = "Sign Up";

/** Footer brand column copy. */
export const FOOTER_TAGLINE =
  "Governed clinical enablement for more human care.";
export const FOOTER_PROVISION =
  "A service provision of Ecocarrier Inc., Ontario, Canada.";

/** Footer bottom bar copy. */
export const FOOTER_COPYRIGHT = "© 2026 Ecocarrier Inc. All rights reserved.";
export const FOOTER_EMERGENCY_NOTICE =
  "Not an emergency service. In an emergency, contact the applicable local emergency service.";

export const CONTACT_EMAIL = "hello@tmu.ai";

/**
 * A footer entry is either an in-app route (`to`) or an external/mailto
 * destination (`href`). Exactly one of the two is set.
 */
export type FooterLink = {
  label: string;
  to?: string;
  href?: string;
};

export type FooterGroup = {
  heading: string;
  items: FooterLink[];
};

/**
 * Footer navigation columns, rendered in order after the brand column:
 * Explore, Deploy, Contact & policies.
 */
export const FOOTER_GROUPS: FooterGroup[] = [
  {
    heading: "Explore",
    items: [
      { label: "Clinical solutions", to: "/solutions" },
      { label: "Keyboard Liberation", to: "/keyboard-liberation" },
      { label: "AI governance", to: "/ai-governance" },
      { label: "Pricing", to: "/pricing" },
      { label: "Sponsorship", to: "/sponsorship" },
    ],
  },
  {
    heading: "Deploy",
    items: [
      { label: "Sovereign AI", to: "/sovereign-deployment" },
      { label: "PPP partnerships", to: "/partnerships" },
      { label: "Onboarding", to: "/contact" },
      { label: "Account demonstration", href: ACCOUNT_DEMO_URL },
    ],
  },
  {
    heading: "Contact & policies",
    items: [
      { label: "Contact", to: "/contact" },
      { label: "hello@tmu.ai", href: `mailto:${CONTACT_EMAIL}` },
      { label: "Privacy", to: "/contact" },
      { label: "Terms of Use", to: "/contact" },
      { label: "Clinical disclaimer", to: "/contact" },
    ],
  },
];

export const HERO_IMAGE = {
  src: "/assets/generated/hero-clinical-room.dim_1536x1024.jpg",
  alt: "A clinician in a white coat reviewing patient notes on a tablet at a light oak desk in a bright, uncluttered consultation room.",
};

/** Full-width Home hero photograph: physician and patient in genuine eye contact. */
export const HOME_HERO_IMAGE = {
  src: "/assets/generated/hero-eye-contact-consultation.dim_1920x1080.jpg",
  alt: "A physician in a white coat sitting face to face with a seated patient in a bright consultation room, holding warm eye contact during their conversation.",
};

export const HOME_HERO_COPY = {
  eyebrow: "GOVERNED CLINICAL AI",
  headline: "More presence. Less paperwork.",
  supporting:
    "Robi Care helps healthcare professionals capture, structure and review clinical information—while keeping qualified clinicians in control of patient-care decisions.",
};

export type HeroCta = {
  label: string;
  to: string;
  variant: "primary" | "outline" | "ghost";
};

export const HOME_HERO_CTAS: HeroCta[] = [
  {
    label: SIGN_UP_LABEL,
    to: SIGN_UP_ROUTE,
    variant: "primary",
  },
  { label: "Explore clinical solutions", to: "/solutions", variant: "outline" },
];

export type AudienceIconName =
  | "stethoscope"
  | "heart-pulse"
  | "siren"
  | "ambulance"
  | "building";

export type AudienceCard = {
  id: string;
  label: string;
  value: string;
  icon: AudienceIconName;
};

/** Five audiences Robi Care supports, rendered directly below the Home hero. */
export const HOME_AUDIENCES: AudienceCard[] = [
  {
    id: "physicians",
    label: "Physicians and Medical Personnel",
    value: "Spend less time on documentation, more time with patients.",
    icon: "stethoscope",
  },
  {
    id: "nursing",
    label: "Nursing Teams",
    value:
      "Capture structured observations, handovers and workflow information.",
    icon: "heart-pulse",
  },
  {
    id: "emergency",
    label: "Emergency Departments",
    value:
      "Support rapid documentation, multilingual intake and accountable escalation.",
    icon: "siren",
  },
  {
    id: "ems",
    label: "EMS Organizations",
    value: "Capture field information and prepare structured handover records.",
    icon: "ambulance",
  },
  {
    id: "administrators",
    label: "Clinics and Hospital Administrators",
    value:
      "Improve workflow consistency, visibility, governance and cost accountability.",
    icon: "building",
  },
];

export const HOME_SAFETY_BANNER =
  "AI-assisted, clinician-controlled. Robi Care prepares information for professional review; it does not replace clinical judgment.";
