import { createContext, useContext, type ReactNode } from "react";
import type { Language } from "../languages";

export interface SiteConfig {
  lang: Language;
  siteOrigin: string;
  preview: boolean;
  ogImage: string;
}

const SiteConfigContext = createContext<SiteConfig | null>(null);

export function SiteConfigProvider({
  value,
  children,
}: {
  value: SiteConfig;
  children: ReactNode;
}) {
  return <SiteConfigContext.Provider value={value}>{children}</SiteConfigContext.Provider>;
}

export function useSiteConfig(): SiteConfig {
  const config = useContext(SiteConfigContext);
  if (!config) throw new Error("useSiteConfig() must be used inside SiteConfigProvider");
  return config;
}
