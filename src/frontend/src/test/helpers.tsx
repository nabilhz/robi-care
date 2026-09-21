import type { backendInterface } from "@/backend";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { type RenderOptions, act, render } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { vi } from "vitest";

/**
 * A typed stand-in for the generated backend actor. Every method the app calls
 * is present, so a component that reaches for a method the real canister does
 * not expose fails to compile here rather than at runtime.
 */
export type ActorMock = {
  [K in keyof backendInterface]: ReturnType<typeof vi.fn>;
};

export function createActorMock(overrides: Partial<ActorMock> = {}): ActorMock {
  const base: ActorMock = {
    _initialize_access_control: vi.fn(async () => undefined),
    _internet_identity_sign_in_finish: vi.fn(async () => ({
      __kind__: "ok" as const,
      ok: null,
    })),
    _internet_identity_sign_in_start: vi.fn(async () => new Uint8Array()),
    assignCallerUserRole: vi.fn(async () => undefined),
    execute: vi.fn(async () => ({ hasMore: false, rows: [] })),
    getApiDoc: vi.fn(async () => ""),
    getCallerUserRole: vi.fn(async () => "guest" as never),
    isCallerAdmin: vi.fn(async () => false),
    listContactEnquiries: vi.fn(async () => []),
    schema: vi.fn(async () => ""),
    submitContactEnquiry: vi.fn(async () => ({ __kind__: "ok", ok: 1n })),
  };
  return { ...base, ...overrides };
}

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
}

type WrapperProps = { children: ReactNode };

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  const queryClient = createTestQueryClient();
  function Wrapper({ children }: WrapperProps) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }
  return render(ui, { wrapper: Wrapper, ...options });
}

/**
 * Renders a page that contains TanStack Router `<Link>`s. The Home hero links
 * its CTAs with `<Link>`, so a bare render of `HomePage` throws
 * "useRouter must be used inside a <RouterProvider>". This mounts the element
 * at `/` inside a minimal in-memory router whose route tree mirrors the app's
 * eight public paths, so link targets resolve without touching the real router.
 */
export async function renderWithRouter(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  const queryClient = createTestQueryClient();
  const rootRoute = createRootRoute({
    component: () => (
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    ),
  });
  const paths = [
    "/",
    "/solutions",
    "/keyboard-liberation",
    "/ai-governance",
    "/sovereign-deployment",
    "/partnerships",
    "/pricing",
    "/contact",
    "/signup",
  ];
  const routes = paths.map((path) =>
    createRoute({ getParentRoute: () => rootRoute, path }),
  );
  const router = createRouter({
    routeTree: rootRoute.addChildren(routes),
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
  // The router resolves its first match asynchronously; awaiting the load
  // before rendering means callers can query synchronously. The render itself
  // is wrapped in `act` because the router's Transitioner/MatchesInner layers
  // schedule state updates as they mount.
  await router.load();
  let result: ReturnType<typeof render> | undefined;
  await act(async () => {
    result = render(<RouterProvider router={router} />, options);
  });
  if (result === undefined) {
    throw new Error("renderWithRouter: render did not produce a result");
  }
  return result;
}
