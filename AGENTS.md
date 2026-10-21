# Project Guidance

## User Preferences

- Marketing site for Robi Care; keep the existing dark-navy clinical theme and layout conventions.
- Image swaps should preserve existing file paths, aspect ratios, and alt-text style.
- Site is bilingual: English is the default language, with a French (France) version selectable via an EN / FR toggle in the header on every page; the visitor's choice persists across pages and return visits.
- French must be standard France French (the form used across francophone Africa), professional healthcare tone, no slang or regional idioms.
- Keep these terms in English exactly as written in both languages: Robi Care, Keyboard Liberation, TMU-KL, SSOT-AI-GOV, SAAAS, TMU Enablement Platform, PWA, KYC, AML, EMR.
- Clinical safety wording must keep identical meaning and force in French, with no softening and no added claims.
- Prices, tier names and numbers stay identical across languages; only surrounding labels are translated.

## Verified Commands

- **typecheck**: `pnpm typecheck`
- **fix**: `pnpm fix`
- **build**: `pnpm build`

## Learnings

- All site image src constants live in src/frontend/src/lib/site.ts and page-level arrays (e.g. SOLUTIONS in SolutionsPage.tsx); image swaps can reuse the same file path so no reference changes.
- The site has an extensive vitest characterization/cover suite that pins image srcs and alt text; test files are tester-owned and must not be edited by production workers.
- sharp is available at the workspace root node_modules (not in src/frontend); image processing scripts run from the app root.
- The site is bilingual via src/frontend/src/i18n/ (translations.ts, LanguageContext.tsx, useTranslation.ts): the FR dictionary is keyed by the exact English source string and t() is an identity render for English, so English output stays byte-identical.
- Any visible string absent from the FR dictionary silently falls back to English; eyebrow/title/description props passed to PageHero/SectionHeading and caption props passed to ImagePanel are the easiest translation gaps to miss.
- The FR dictionary is appended to concurrently by parallel page workers; duplicate keys surface as TS1117 and must be de-duplicated before typecheck passes.
- The site has an extensive vitest characterization/cover suite that pins English copy, image srcs and alt text; test files are tester-owned and must not be edited by production workers.
