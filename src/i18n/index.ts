import { getRelativeLocaleUrl } from 'astro:i18n';
import type { Dictionary, Locale, Text } from './types';
import { en } from './en';
import { fr } from './fr';

export type { Dictionary, Locale, Localized, Text } from './types';

const dictionaries: Record<Locale, Dictionary> = { en, fr };

/** Return the UI dictionary for a locale. */
export function useTranslations(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Resolve CV text for a locale — plain strings are language-neutral. */
export function tr(text: Text, locale: Locale): string {
  return typeof text === 'string' ? text : text[locale];
}

/**
 * Build a locale-aware URL for a given path (e.g. '' for the homepage).
 * Wraps Astro's getRelativeLocaleUrl so callers don't import it everywhere.
 */
export function localeUrl(locale: Locale, path = ''): string {
  return getRelativeLocaleUrl(locale, path);
}

/** Format a 'YYYY' or 'YYYY-MM' value, e.g. '2022-07' → "Jul 2022" / "juil. 2022". */
export function formatYearMonth(value: string, dateLocale: string): string {
  const [year, month] = value.split('-').map(Number);
  if (!month) return String(year);
  return new Intl.DateTimeFormat(dateLocale, {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}
