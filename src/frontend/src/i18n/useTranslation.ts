import { useContext } from "react";
import { LanguageContext, type LanguageContextValue } from "./LanguageContext";

/**
 * Access the active language, the setter, and the `t` translator. Falls back to
 * the English default when no provider is mounted, so components stay renderable
 * in isolation.
 */
export function useTranslation(): LanguageContextValue {
  return useContext(LanguageContext);
}
