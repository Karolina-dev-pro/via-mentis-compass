import type { Lang } from "@/contexts/LanguageContext";

/**
 * Pick the best available translation for a field.
 * Falls back: requested lang → pl (base) → empty string.
 */
export function localized(
  row: Record<string, unknown>,
  field: string,
  lang: Lang
): string {
  if (lang === "pl") return (row[field] as string) ?? "";
  const translated = row[`${field}_${lang}`] as string | null | undefined;
  if (translated) return translated;
  return (row[field] as string) ?? "";
}
