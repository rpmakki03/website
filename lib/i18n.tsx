"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

import { DEFAULT_LOCALE, type Locale } from "@/lib/locales";

import en from "@/locales/en/landing.json";
import hi from "@/locales/hi/landing.json";
import mr from "@/locales/mr/landing.json";
import te from "@/locales/te/landing.json";
import kn from "@/locales/kn/landing.json";
import ml from "@/locales/ml/landing.json";
import gu from "@/locales/gu/landing.json";
import bn from "@/locales/bn/landing.json";
import or from "@/locales/or/landing.json";
import ne from "@/locales/ne/landing.json";

export { LOCALES, DEFAULT_LOCALE } from "@/lib/locales";
export type { Locale } from "@/lib/locales";

export type Messages = typeof en;

const MESSAGES: Record<Locale, Messages> = {
  en,
  hi: hi as Messages,
  mr: mr as Messages,
  te: te as Messages,
  kn: kn as Messages,
  ml: ml as Messages,
  gu: gu as Messages,
  bn: bn as Messages,
  or: or as Messages,
  ne: ne as Messages,
};

const STORAGE_KEY = "lg-locale";
const QUERY_KEY = "lang";

function isLocale(value: string | null | undefined): value is Locale {
  return !!value && Object.prototype.hasOwnProperty.call(MESSAGES, value);
}

/* ——— locale store —————————————————————————————————————————————
 * Held outside React and read through useSyncExternalStore: the server and the
 * hydrating client both see DEFAULT_LOCALE, then React re-renders once with the
 * visitor's stored choice. A ?lang= param wins over the saved preference so a
 * shared link always opens in the language it advertises.
 * ------------------------------------------------------------------------ */

function readPreferredLocale(): Locale {
  const fromUrl = new URLSearchParams(window.location.search).get(QUERY_KEY);
  if (isLocale(fromUrl)) return fromUrl;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // private mode / blocked storage — fall through to the default
  }
  return DEFAULT_LOCALE;
}

let currentLocale: Locale = DEFAULT_LOCALE;
if (typeof window !== "undefined") currentLocale = readPreferredLocale();

const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => void listeners.delete(listener);
};
const getSnapshot = () => currentLocale;
const getServerSnapshot = () => DEFAULT_LOCALE;

function writeLocale(next: Locale) {
  if (!isLocale(next) || next === currentLocale) return;
  currentLocale = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // storage unavailable — the choice still applies for this session
  }
  // Keep the URL shareable without triggering a navigation.
  const url = new URL(window.location.href);
  if (next === DEFAULT_LOCALE) url.searchParams.delete(QUERY_KEY);
  else url.searchParams.set(QUERY_KEY, next);
  window.history.replaceState(null, "", url);

  listeners.forEach((listener) => listener());
}

/** Walks a dot-path such as "hero.stats.0.label" through a messages tree. */
function resolve(tree: unknown, path: string): unknown {
  return path
    .split(".")
    .reduce<unknown>(
      (node, key) =>
        node && typeof node === "object"
          ? (node as Record<string, unknown>)[key]
          : undefined,
      tree
    );
}

type I18nValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  /** Translated string for a dot-path, with {vars} interpolated. */
  t: (path: string, vars?: Record<string, string | number>) => string;
  /** Translated array/object for a dot-path, for repeated content. */
  raw: <T>(path: string) => T;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => writeLocale(next), []);

  const value = useMemo<I18nValue>(() => {
    const messages = MESSAGES[locale] ?? MESSAGES[DEFAULT_LOCALE];

    const t = (path: string, vars?: Record<string, string | number>) => {
      const hit = resolve(messages, path) ?? resolve(MESSAGES[DEFAULT_LOCALE], path);
      if (typeof hit !== "string") {
        if (process.env.NODE_ENV !== "production") {
          console.warn(`[i18n] missing string for "${path}" (${locale})`);
        }
        return "";
      }
      return vars
        ? hit.replace(/\{(\w+)\}/g, (match, key) =>
            key in vars ? String(vars[key]) : match
          )
        : hit;
    };

    const raw = <T,>(path: string) =>
      (resolve(messages, path) ?? resolve(MESSAGES[DEFAULT_LOCALE], path)) as T;

    return { locale, setLocale, t, raw };
  }, [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useTranslation must be used inside <I18nProvider>");
  return ctx;
}
