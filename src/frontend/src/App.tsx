import { SiteLayout } from "@/components/layout/SiteLayout";
import { AiGovernancePage } from "@/pages/AiGovernancePage";
import { ContactPage } from "@/pages/ContactPage";
import { HomePage } from "@/pages/HomePage";
import { KeyboardLiberationPage } from "@/pages/KeyboardLiberationPage";
import { PartnershipsPage } from "@/pages/PartnershipsPage";
import { PricingPage } from "@/pages/PricingPage";
import { SignUpPage } from "@/pages/SignUpPage";
import { SolutionsPage } from "@/pages/SolutionsPage";
import { SovereignDeploymentPage } from "@/pages/SovereignDeploymentPage";
import { SponsorshipPage } from "@/pages/SponsorshipPage";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: () => (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const solutionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/solutions",
  component: SolutionsPage,
});

const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pricing",
  component: PricingPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const keyboardLiberationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/keyboard-liberation",
  component: KeyboardLiberationPage,
});

const aiGovernanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai-governance",
  component: AiGovernancePage,
});

const sovereignDeploymentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sovereign-deployment",
  component: SovereignDeploymentPage,
});

const partnershipsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/partnerships",
  component: PartnershipsPage,
});

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: SignUpPage,
});

const sponsorshipRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sponsorship",
  component: SponsorshipPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  signUpRoute,
  solutionsRoute,
  pricingRoute,
  contactRoute,
  keyboardLiberationRoute,
  aiGovernanceRoute,
  sovereignDeploymentRoute,
  partnershipsRoute,
  sponsorshipRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
