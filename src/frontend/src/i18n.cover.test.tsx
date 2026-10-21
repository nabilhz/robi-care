import { LanguageProvider } from "@/i18n/LanguageContext";
import { LANGUAGE_STORAGE_KEY } from "@/i18n/translations";
import { renderWithProviders } from "@/test/helpers";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import App from "@/App";

/**
 * Cover for the accepted bilingual (EN / FR) change.
 *
 * The app's real entry point (`main.tsx`) mounts `LanguageProvider` around
 * `App`; `App` itself does not, so every test here renders through
 * `renderBilingual` to exercise the provider the visitor actually gets. The
 * characterization file (`i18n.characterization.test.tsx`) protects the
 * English default; this file covers the new French behavior.
 *
 * The backend is mocked: the contact form's actor call is a local stub, so
 * nothing here proves the real canister works.
 */

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({
    actor: {
      submitContactEnquiry: vi.fn(async () => ({ __kind__: "ok", ok: 1n })),
    },
    isFetching: false,
  }),
}));

vi.mock("@/backend", () => ({
  createActor: vi.fn(() => ({
    submitContactEnquiry: vi.fn(async () => ({ __kind__: "ok", ok: 1n })),
  })),
}));

/** Render `App` inside the language provider the real entry point mounts. */
function renderBilingual(ui: ReactNode = <App />) {
  return renderWithProviders(<LanguageProvider>{ui}</LanguageProvider>);
}

/** The header's EN / FR toggle, present on every page. */
function getToggle(): HTMLElement {
  const toggle = document.querySelector(
    '[data-ocid="nav.language_toggle"]',
  ) as HTMLElement | null;
  if (!toggle) throw new Error("language toggle not found in header");
  return toggle;
}

async function switchToFrench(user: ReturnType<typeof userEvent.setup>) {
  await user.click(
    within(getToggle()).getByRole("button", { name: "Français" }),
  );
}

beforeEach(() => {
  window.localStorage.clear();
  window.history.pushState({}, "", "/");
  document.documentElement.lang = "";
  document.title = "";
  vi.clearAllMocks();
});

describe("EN / FR toggle in the header", () => {
  it("is visible on every page and shows the active language", async () => {
    for (const path of [
      "/",
      "/solutions",
      "/keyboard-liberation",
      "/ai-governance",
      "/sovereign-deployment",
      "/pricing",
      "/contact",
      "/partnerships",
      "/sponsorship",
      "/signup",
      "/healthcare-disclaimer",
      "/cookie-notice",
    ]) {
      window.history.pushState({}, "", path);
      const { unmount } = renderBilingual();
      await screen.findByRole("heading", { level: 1 });

      const toggle = getToggle();
      expect(
        within(toggle).getByRole("button", { name: "English" }),
      ).toHaveAttribute("aria-pressed", "true");
      expect(
        within(toggle).getByRole("button", { name: "Français" }),
      ).toHaveAttribute("aria-pressed", "false");
      unmount();
    }
  });

  it("switches the whole page to French with one action", async () => {
    const user = userEvent.setup();
    renderBilingual();
    await screen.findByRole("heading", { level: 1 });

    await switchToFrench(user);

    // Header banner, navigation and footer all flip together.
    const header = document.querySelector("header") as HTMLElement;
    expect(
      within(header).getByText(
        "Assisté par IA · Contrôlé par le clinicien · Conçu pour un déploiement souverain",
      ),
    ).toBeInTheDocument();
    expect(
      within(header).getByRole("navigation", { name: "Principale" }),
    ).toBeInTheDocument();
    expect(
      within(header).getByRole("link", { name: "Tarifs" }),
    ).toBeInTheDocument();

    const footer = document.querySelector("footer") as HTMLElement;
    expect(
      within(footer).getByRole("navigation", { name: "Explorer" }),
    ).toBeInTheDocument();
    expect(
      within(footer).getByText(
        "Service non destiné aux urgences. En cas d'urgence, contactez le service d'urgence local compétent.",
      ),
    ).toBeInTheDocument();

    expect(
      within(getToggle()).getByRole("button", { name: "Français" }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("keeps the visitor on the same page when switching language", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/pricing");
    renderBilingual();
    await screen.findByRole("heading", { level: 1 });

    await switchToFrench(user);

    // Still on Pricing, now in French — not redirected home.
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Une tarification transparente, fondée sur l'usage réel",
      }),
    ).toBeInTheDocument();
    expect(window.location.pathname).toBe("/pricing");
  });
});

describe("language persistence and document metadata", () => {
  it("persists the choice across navigation and a fresh mount", async () => {
    const user = userEvent.setup();
    const { unmount } = renderBilingual();
    await screen.findByRole("heading", { level: 1 });

    await switchToFrench(user);
    expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe("fr");

    // Navigate to another page: the site stays French.
    await user.click(
      within(screen.getByRole("navigation", { name: "Principale" })).getByRole(
        "link",
        { name: "Tarifs" },
      ),
    );
    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: "Une tarification transparente, fondée sur l'usage réel",
      }),
    ).toBeInTheDocument();

    // A return visit (fresh mount, same storage) still opens in French.
    unmount();
    renderBilingual();
    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: "Une tarification transparente, fondée sur l'usage réel",
      }),
    ).toBeInTheDocument();
  });

  it("reflects the active language in the document lang attribute and title", async () => {
    const user = userEvent.setup();
    renderBilingual();
    await screen.findByRole("heading", { level: 1 });

    expect(document.documentElement.lang).toBe("en");
    expect(document.title).toBe(
      "Robi Care — Clinical Documentation & Communication Platform",
    );

    await switchToFrench(user);

    expect(document.documentElement.lang).toBe("fr");
    expect(document.title).toBe(
      "Robi Care — Plateforme de documentation et de communication cliniques",
    );
  });
});

describe("French page content", () => {
  const FRENCH_ROUTES: { path: string; heading: string }[] = [
    { path: "/", heading: "Plus de présence. Moins de paperasse." },
    {
      path: "/solutions",
      heading: "Des cas d'usage cliniques, traités avec soin",
    },
    {
      path: "/keyboard-liberation",
      heading: "Les cliniciens devraient travailler en parlant, non en tapant",
    },
    {
      path: "/ai-governance",
      heading: "Une IA clinique que l'on peut encadrer, examiner et arrêter.",
    },
    {
      path: "/sovereign-deployment",
      heading: "Une assistance à la santé exploitée dans le pays qu'elle sert.",
    },
    {
      path: "/pricing",
      heading: "Une tarification transparente, fondée sur l'usage réel",
    },
    { path: "/contact", heading: "Parlez à l'équipe Robi Care" },
    {
      path: "/partnerships",
      heading: "Un modèle de partenariat pour un accès national durable.",
    },
    {
      path: "/sponsorship",
      heading:
        "Le parrainage est un investissement stratégique dans l'accès aux soins de santé communautaires, et non une œuvre de bienfaisance.",
    },
    { path: "/signup", heading: "Configurer Robi Care" },
    {
      path: "/healthcare-disclaimer",
      heading: "Les limites de sécurité clinique, énoncées clairement",
    },
    {
      path: "/cookie-notice",
      heading: "Comment ce site utilise les cookies",
    },
  ];

  it.each(FRENCH_ROUTES)(
    "renders the French h1 on $path",
    async ({ path, heading }) => {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, "fr");
      window.history.pushState({}, "", path);
      renderBilingual();

      expect(
        await screen.findByRole("heading", { level: 1, name: heading }),
      ).toBeInTheDocument();
    },
  );

  it("translates the Home hero, audience cards, how-it-works and CTA copy", async () => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, "fr");
    renderBilingual();
    await screen.findByRole("heading", { level: 1 });

    const text = document.body.textContent ?? "";
    for (const marker of [
      "Plus de présence. Moins de paperasse.",
      "Qui nous accompagnons",
      "Médecins et personnel médical",
      "De la consultation à une documentation claire en trois étapes",
      "Le clinicien aux commandes",
      "Provenance de la plateforme",
      "Apportez une documentation sereine à votre clinique",
    ]) {
      expect(text).toContain(marker);
    }
  });

  it("translates the contact form labels and validation messages", async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, "fr");
    window.history.pushState({}, "", "/contact");
    renderBilingual();
    await screen.findByRole("heading", { level: 1 });

    expect(screen.getByLabelText("Nom")).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByLabelText("Organisation")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /envoyer la demande/i }),
    );

    expect(
      await screen.findByText("Veuillez saisir votre nom."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Veuillez saisir votre organisation."),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Veuillez nous indiquer comment nous pouvons vous aider.",
      ),
    ).toBeInTheDocument();
  });
});

describe("French sign-up flow and personal dashboard", () => {
  it("renders the three French steps and translated account fields", async () => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, "fr");
    window.history.pushState({}, "", "/signup");
    renderBilingual();
    await screen.findByRole("heading", { level: 1 });

    const steps = document.querySelector(
      '[data-ocid="signup.steps"]',
    ) as HTMLElement;
    expect(
      within(steps)
        .getAllByRole("listitem")
        .map((item) => item.textContent ?? ""),
    ).toEqual([
      expect.stringContaining("Compte"),
      expect.stringContaining("Vérification"),
      expect.stringContaining("Tableau de bord"),
    ]);

    expect(screen.getByLabelText("Nom complet")).toBeInTheDocument();
    expect(screen.getByLabelText("Adresse e-mail")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Numéro de téléphone mobile"),
    ).toBeInTheDocument();
  });

  it("shows French validation messages on an empty Step 1", async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, "fr");
    window.history.pushState({}, "", "/signup");
    renderBilingual();
    await screen.findByRole("heading", { level: 1 });

    await user.click(screen.getByRole("button", { name: /continuer/i }));

    expect(
      screen.getByText("Veuillez saisir votre nom complet."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Veuillez saisir votre adresse e-mail."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Veuillez saisir votre numéro de téléphone mobile."),
    ).toBeInTheDocument();
  });

  it("renders the Personal Dashboard in French including the example-data banner", async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, "fr");
    window.history.pushState({}, "", "/signup");
    renderBilingual();
    await screen.findByRole("heading", { level: 1 });

    await user.type(screen.getByLabelText("Nom complet"), "Ada Lovelace");
    await user.type(screen.getByLabelText("Adresse e-mail"), "ada@example.com");
    await user.type(
      screen.getByLabelText("Numéro de téléphone mobile"),
      "+1 555 010 2030",
    );
    await user.click(screen.getByRole("button", { name: /continuer/i }));

    // Step 2 — verification, in French.
    expect(
      await screen.findByText("Vérifiez votre e-mail"),
    ).toBeInTheDocument();
    expect(screen.getByText("Envoyé à")).toBeInTheDocument();

    await user.type(
      document.querySelector('[data-ocid="signup.code_input"]') as HTMLElement,
      "123456",
    );
    await user.click(screen.getByRole("button", { name: /vérifier/i }));

    // Step 3 — Personal Dashboard, in French.
    expect(
      await screen.findByText("Votre tableau de bord personnel"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Ceci est un aperçu avec des données d'exemple. Vos chiffres réels d'utilisation et de facturation apparaîtront ici une fois votre compte lié à la TMU Enablement Platform.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Récapitulatif de l'utilisation"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Rencontres cliniques saisies"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Historique du compte et des factures"),
    ).toBeInTheDocument();
  });
});

describe("protected terms, prices and clinical safety wording in French", () => {
  it("keeps protected terms in English exactly as written", async () => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, "fr");
    renderBilingual();
    await screen.findByRole("heading", { level: 1 });

    const text = document.body.textContent ?? "";
    for (const term of [
      "Robi Care",
      "Keyboard Liberation",
      "TMU Enablement Platform",
    ]) {
      expect(text).toContain(term);
    }
  });

  it("keeps prices, tier names and numbers identical in French", async () => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, "fr");
    window.history.pushState({}, "", "/pricing");
    renderBilingual();
    await screen.findByRole("heading", { level: 1 });

    for (const [tier, allowance] of [
      ["Premium Pro", "4 transcription hours / day"],
      ["Premium Business", "20 transcription hours / day"],
      ["Enterprise", "200 transcription hours / day"],
    ] as const) {
      const card = screen
        .getByRole("heading", { level: 3, name: tier })
        .closest("article") as HTMLElement;
      expect(card).not.toBeNull();
      expect(within(card).getByText(allowance)).toBeInTheDocument();
    }
  });

  it("keeps the clinician-decides and not-an-emergency statements explicit in French", async () => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, "fr");
    window.history.pushState({}, "", "/healthcare-disclaimer");
    renderBilingual();
    await screen.findByRole("heading", { level: 1 });

    expect(screen.getByText("Le clinicien décide")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Robi Care prépare l'information pour un examen professionnel. Il ne pose pas de diagnostic, ne prescrit pas et n'agit pas, et il ne remplace pas le jugement clinique. Un clinicien qualifié vérifie et approuve tout contenu clinique avant son utilisation.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText("Service non destiné aux urgences").length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByText(
        "Robi Care n'est pas un service d'urgence. En cas d'urgence, contactez immédiatement le service d'urgence local compétent.",
      ),
    ).toBeInTheDocument();
  });
});
