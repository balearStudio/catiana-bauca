// Catalan is primary: the clinic's own signage and window lettering are in
// Catalan. Spanish is second because every retrievable patient review is in
// Spanish. See .studio/brief.md §4.
export const languages = ["ca", "es"] as const;

export type Language = (typeof languages)[number];

export const defaultLanguage: Language = "ca";

export function isLanguage(value: string): value is Language {
  return (languages as readonly string[]).includes(value);
}
