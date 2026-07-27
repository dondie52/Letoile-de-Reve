import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { withBase } from "@/lib/paths";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://letoiledereve.com";
const ogImage = withBase("/assets/images/living-room.webp");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "L’étoile de Rêve | Luxury Apartment in Phakalane, Gaborone",
  description:
    "A refined fully furnished luxury apartment in Phakalane, Gaborone, offering comfort, privacy, high-speed Wi-Fi, security and parking.",
  applicationName: "L’étoile de Rêve",
  keywords: [
    "L’étoile de Rêve",
    "luxury apartment",
    "Phakalane",
    "Gaborone",
    "Botswana",
    "furnished apartment",
  ],
  openGraph: {
    type: "website",
    locale: "en_BW",
    url: siteUrl,
    siteName: "L’étoile de Rêve",
    title: "L’étoile de Rêve | Luxury Apartment in Phakalane, Gaborone",
    description:
      "A refined fully furnished luxury apartment in Phakalane, Gaborone, offering comfort, privacy, high-speed Wi-Fi, security and parking.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 800,
        alt: "Living room at L’étoile de Rêve luxury apartment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "L’étoile de Rêve | Luxury Apartment in Phakalane, Gaborone",
    description:
      "A refined fully furnished luxury apartment in Phakalane, Gaborone, offering comfort, privacy, high-speed Wi-Fi, security and parking.",
    images: [ogImage],
  },
  icons: {
    icon: [{ url: withBase("/icon-32.png"), sizes: "32x32", type: "image/png" }],
    apple: [{ url: withBase("/apple-touch-icon.png"), sizes: "180x180" }],
    shortcut: withBase("/favicon.ico"),
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: "#06150E",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "L’étoile de Rêve",
  description:
    "A refined fully furnished luxury apartment in Phakalane, Gaborone, offering comfort, privacy, high-speed Wi-Fi, security and parking.",
  url: siteUrl,
  email: "stay@letoiledereve.com",
  telephone: "+26771813137",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Phakalane",
    addressRegion: "Gaborone",
    addressCountry: "BW",
  },
  image: [`${siteUrl}${withBase("/assets/images/living-room.webp")}`],
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Fully furnished" },
    { "@type": "LocationFeatureSpecification", name: "High-speed Wi-Fi" },
    { "@type": "LocationFeatureSpecification", name: "24/7 security" },
    { "@type": "LocationFeatureSpecification", name: "Parking" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
        <div className="film-grain" aria-hidden="true" />
      </body>
    </html>
  );
}
