"use client";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/utils";
const LocaleContext = createContext<Locale>("ar");
export function LocaleProvider({ value, children }: { value: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
export function useLocale() {
  return useContext(LocaleContext);
}