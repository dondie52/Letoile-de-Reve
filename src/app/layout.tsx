import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { OFFER, RATE } from "@/lib/constants";
import { withBase } from "@/lib/paths";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: true,
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
});

const siteUrl = "https://letoiledereve.com";
const ogImage = withBase("/assets/images/living-room.webp");
/* One description for meta, OG, Twitter and JSON-LD — they must not drift apart. */
const siteDescription =
  "A refined fully furnished luxury apartment in Phakalane, Gaborone, offering comfort, privacy, Wi-Fi, security and parking. From P950 per night.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "L’étoile de Rêve | Luxury Apartment in Phakalane, Gaborone",
  description: siteDescription,
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
    description: siteDescription,
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
    description: siteDescription,
    images: [ogImage],
  },
  icons: {
    icon: [
      { url: withBase("/icon.svg"), type: "image/svg+xml" },
      { url: withBase("/icon-32.png"), sizes: "32x32", type: "image/png" },
      { url: withBase("/icon-48.png"), sizes: "48x48", type: "image/png" },
      { url: withBase("/icon-192.png"), sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: withBase("/apple-touch-icon.png"), sizes: "180x180" }],
    shortcut: withBase("/favicon.ico"),
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: "nFejxBLEfUr1CjjZEAStkS4zaB0Dx4V45ms7SIX9RzE",
  },
};

export const viewport: Viewport = {
  themeColor: "#06150E",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "L’étoile de Rêve",
  description: siteDescription,
  url: siteUrl,
  email: "stay@letoiledereve.com",
  telephone: "+26771070488",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Phakalane",
    addressRegion: "Gaborone",
    addressCountry: "BW",
  },
  image: [`${siteUrl}${withBase("/assets/images/living-room.webp")}`],
  priceRange: `${RATE.currency} ${RATE.nightly}`,
  makesOffer: [
    {
      "@type": "Offer",
      name: "Nightly stay",
      priceCurrency: RATE.currency,
      price: String(RATE.nightly),
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceCurrency: RATE.currency,
        price: String(RATE.nightly),
        unitCode: "DAY",
      },
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/#rates`,
    },
    {
      "@type": "Offer",
      name: OFFER.title,
      description: `${OFFER.summary} ${OFFER.terms}`,
      priceCurrency: RATE.currency,
      price: String(RATE.nightly * (OFFER.minNights - OFFER.freeNights)),
      eligibleQuantity: {
        "@type": "QuantitativeValue",
        value: OFFER.minNights,
        unitCode: "DAY",
      },
      url: `${siteUrl}/#rates`,
    },
  ],
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
      <head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <link
          rel="preload"
          as="image"
          href={withBase("/assets/images/logo-mark.webp")}
          type="image/webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href={withBase("/assets/images/living-room-sm.webp")}
          type="image/webp"
          media="(max-width: 767px)"
        />
        <link
          rel="preload"
          as="image"
          href={withBase("/assets/images/living-room.webp")}
          type="image/webp"
          media="(min-width: 768px)"
        />
      </head>
      <body className="font-body antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(sessionStorage.getItem("letoile-preloader")==="1"||window.matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("preloader-done")}catch(e){}})();`,
          }}
        />
        <div
          id="boot-preloader"
          role="status"
          aria-live="polite"
          aria-label="Loading L’étoile de Rêve"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- boot paint before hydration */}
          <img
            src={withBase("/assets/images/logo-mark.webp")}
            alt=""
            width={120}
            height={98}
            decoding="sync"
            fetchPriority="high"
          />
          <span className="sr-only">L’étoile de Rêve</span>
        </div>
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
