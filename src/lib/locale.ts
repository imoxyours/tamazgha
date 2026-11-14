import { headers } from "next/headers";
import type { Locale } from "./utils";
export async function getLocale(): Promise<Locale> {
  const v = (await headers()).get("x-locale");
  return v === "fr" || v === "en" ? v : "ar";
}
export async function getPath() { return (await headers()).get("x-path") || "/"; }
