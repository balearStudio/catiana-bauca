export const languages = ["es", "en"] as const;

export type Language = (typeof languages)[number];

export const defaultLanguage: Language = "es";

export function isLanguage(value: string): value is Language {
  return (languages as readonly string[]).includes(value);
}
