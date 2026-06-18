import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Hanken_Grotesk, Geist, Monsieur_La_Doulaise } from "next/font/google";
import Navbar from "./components/Navbar";
import FloatingContact from "./components/FloatingContact";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-hanken",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-geist",
  display: "swap",
});

const monsieurLaDoulaise = Monsieur_La_Doulaise({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-monsieur",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vikafilms.com"),
  title: {
    default: "VikaFilms | Commercial Photography, Brand Films & Product Shoots",
    template: "%s | VikaFilms",
  },
  description:
    "Crafting visual stories that move people. VikaFilms is Mumbai's premium commercial photography and cinematography studio — specializing in brand films, automotive campaigns, product photography, drone cinematography, corporate portraits, and creative visual storytelling for brands across India.",
  keywords: [
    "vikafilms",
    "vika films",
    "VikaFilms Mumbai",
    "photographer in mumbai",
    "commercial photographer mumbai",
    "cinematographer mumbai",
    "photography studio mumbai",
    "brand photographer mumbai",
    "product photographer mumbai",
    "commercial photography india",
    "film production company mumbai",
    "video production mumbai",
    "automotive photographer india",
    "wedding photographer mumbai",
    "corporate photographer mumbai",
    "advertising photographer mumbai",
    "fashion photographer mumbai",
    "editorial photographer mumbai",
    "luxury photography mumbai",
    "premium photo studio mumbai",
    "shoot in mumbai",
    "photo shoot mumbai",
    "professional photographer mumbai",
    "vivek kamble photographer",
    "healthcare photography mumbai",
    "brand film mumbai",
  ],
  authors: [{ name: "Vivek Kamble", url: "https://www.vikafilms.com" }],
  creator: "Vivek Kamble – VikaFilms",
  publisher: "VikaFilms",
  alternates: { canonical: "https://www.vikafilms.com" },
  openGraph: {
    type: "website",
    url: "https://www.vikafilms.com",
    siteName: "VikaFilms",
    title: "VikaFilms | Commercial Photography, Brand Films & Product Shoots",
    description:
      "Crafting visual stories that move people. Mumbai's premium commercial photography and cinematography studio — brand films, product campaigns, automotive shoots & editorial stories.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "VikaFilms – Commercial Photography & Brand Films, Mumbai",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "VikaFilms | Commercial Photography, Brand Films & Product Shoots",
    description:
      "Crafting visual stories that move people. Mumbai's premium commercial photography and cinematography studio — brand films, product campaigns & visual stories.",
    images: ["/opengraph-image"],
    creator: "@vikafilms",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "", // paste your Google Search Console verification code here when ready
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${hankenGrotesk.variable} ${geist.variable} ${monsieurLaDoulaise.variable} antialiased`}
    >
      <head>
        {/* JSON-LD: Local Business + Organization */}
        <Script
          id="json-ld-local-business"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "LocalBusiness",
                  "@id": "https://www.vikafilms.com/#business",
                  name: "VikaFilms",
                  alternateName: ["Vika Films", "VikaFilms Mumbai", "VikaFilms Studio"],
                  description:
                    "VikaFilms is a premium commercial photography and cinematography studio based in Mumbai, India. We specialize in brand films, product campaigns, automotive photography, corporate portraits, wedding cinematography, and editorial shoots.",
                  url: "https://www.vikafilms.com",
                  telephone: "+919309906722",
                  email: "vikafilms15@gmail.com",
                  image: "https://www.vikafilms.com/portfolio/commercial/BMW-01.jpg",
                  logo: "https://www.vikafilms.com/portfolio/commercial/BMW-01.jpg",
                  priceRange: "₹₹₹",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Mumbai",
                    addressRegion: "Maharashtra",
                    addressCountry: "IN",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: 19.076,
                    longitude: 72.8777,
                  },
                  areaServed: [
                    { "@type": "City", name: "Mumbai" },
                    { "@type": "City", name: "Pune" },
                    { "@type": "City", name: "Delhi" },
                    { "@type": "State", name: "Maharashtra" },
                    { "@type": "Country", name: "India" },
                  ],
                  sameAs: [
                    "https://www.instagram.com/vikafilms.in",
                    "https://www.linkedin.com/in/vivek-kamble-65a39b238",
                  ],
                  serviceType: [
                    "Commercial Photography",
                    "Cinematography",
                    "Brand Film Production",
                    "Product Photography",
                    "Automotive Photography",
                    "Corporate Photography",
                    "Wedding Photography",
                    "Editorial Photography",
                    "Video Production",
                  ],
                  openingHoursSpecification: {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    opens: "09:00",
                    closes: "19:00",
                  },
                  hasMap: "https://maps.google.com/?q=Mumbai,Maharashtra,India",
                },
                {
                  "@type": "Person",
                  "@id": "https://www.vikafilms.com/#founder",
                  name: "Vivek Kamble",
                  jobTitle: "Founder & Cinematographer",
                  worksFor: { "@id": "https://www.vikafilms.com/#business" },
                  url: "https://www.linkedin.com/in/vivek-kamble-65a39b238",
                  image: "https://www.vikafilms.com/vivek-kamble.png",
                  sameAs: [
                    "https://www.instagram.com/vikafilms.in",
                    "https://www.linkedin.com/in/vivek-kamble-65a39b238",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.vikafilms.com/#website",
                  url: "https://www.vikafilms.com",
                  name: "VikaFilms",
                  publisher: { "@id": "https://www.vikafilms.com/#business" },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: { "@type": "EntryPoint", urlTemplate: "https://www.vikafilms.com/?q={search_term_string}" },
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          backgroundColor: "#0e0e0e",
          color: "#e2e2e2",
          margin: 0,
          padding: 0,
        }}
      >
        <Navbar />
        <FloatingContact />
        {children}
      </body>
    </html>
  );
}
