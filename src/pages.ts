// Single source of truth for which routes exist, in each language.
// `path` is relative to the language basename ("" => the language root).
// The `build` skill (Task 4.1) extends this list for multi-page clients;
// the template ships with one page.
export interface PageDef {
  key: string;
  path: string;
}

export const pages: PageDef[] = [{ key: "home", path: "" }];
