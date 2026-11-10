import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";
import { WatchlistProvider } from "@/lib/watchlist";

const display = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], weight: ["500", "600", "700"] });
const body = Hanken_Grotesk({ variable: "--font-hanken", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "HappyCall: private hotel offers for the trips you want to take",
  description: "HappyCall is a reverse booking platform: share when you are free and hotels send private, bookable offers. Demo site.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body><LangProvider><WatchlistProvider>{children}</WatchlistProvider></LangProvider></body>
    </html>
  );
}
