import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins } from "next/font/google";
import { I18nProvider } from "@/lib/i18n";
import { LOCALES } from "@/lib/locales";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "devanagari"],
  weight: ["300", "400", "500", "600", "700"],
});

// The landing page is served from one URL for every language, so the default
// (English) copy is what crawlers index; `?lang=` alternates declare the rest.
// The landing page renders its own <title>/description so they can follow the
// selected language; everything below is language-independent.
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: Object.fromEntries(
      LOCALES.map(({ code }) => [code, code === "en" ? "/" : `/?lang=${code}`])
    ),
  },
  openGraph: {
    title: "LearnGeeta · Swarnim Varg — The 50th Golden Batch",
    description:
      "Celebrate the 50th Golden Batch of LearnGeeta through five divine competitions, open to every age.",
    locale: "en",
    alternateLocale: LOCALES.filter((l) => l.code !== "en").map((l) => l.code),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LearnGeeta · Swarnim Varg — The 50th Golden Batch",
    description:
      "Celebrate the 50th Golden Batch of LearnGeeta through five divine competitions, open to every age.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
