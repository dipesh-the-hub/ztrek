import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.trekvibenepal.com"),
  title: {
    default: "TrekVibe Nepal | Trekking & Expedition Agency in Kathmandu",
    template: "%s | TrekVibe Nepal",
  },
  description:
    "TrekVibe Nepal is a Kathmandu-based trekking agency offering Everest Base Camp, Annapurna Circuit, Langtang, Manaslu, Upper Dolpo and Mustang treks with certified local guides. Feel the mountain vibe.",
  keywords: [
    "trekking agency in Kathmandu",
    "Nepal trekking company",
    "Everest Base Camp Trek",
    "Annapurna Circuit Trek",
    "Langtang Trek",
    "Manaslu Circuit Trek",
    "Upper Dolpo Trek",
    "Mustang Trek",
    "trekking guides Nepal",
  ],
  openGraph: {
    title: "TrekVibe Nepal | Trekking & Expedition Agency in Kathmandu",
    description:
      "Feel the mountain vibe. Certified local guides, tailor-made itineraries, and 25+ treks, peak climbs, safaris and city tours across Nepal.",
    url: "https://www.trekvibenepal.com",
    siteName: "TrekVibe Nepal",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-stone-900">
        {children}
      </body>
    </html>
  );
}
