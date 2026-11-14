"use client";
import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useLocale } from "./LocaleProvider";
export default function Link({ href, ...r }: ComponentProps<typeof NextLink>) {
  const l = useLocale();
  const h = typeof href === "string" && href.startsWith("/") && l !== "ar" ? `/${l}${href === "/" ? "" : href}` : href;
  return <NextLink href={h} {...r} />;
}
