import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Playfair_Display, Hanken_Grotesk, Geist, Monsieur_La_Doulaise, DM_Sans, Bebas_Neue } from "next/font/google";
import { headers } from "next/headers";
import Navbar from "./components/Navbar";
import FloatingContact from "./components/FloatingContact";
import Preloader from "./components/Preloader";
import { getSiteSettings } from "./lib/content";
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

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0e0e0e",
};

const META_DEFAULTS = {
  seoTitle: "VikaFilms | Commercial Photography, Brand Films & Product Shoots",
  seoDescription: "Crafting visual stories that move people. VikaFilms is Mumbai's premium commercial photography and cinematography studio.",
  seoKeywords: "vikafilms,commercial photographer,cinematographer,mumbai,india",
  seoCanonical: "https://www.vikafilms.com",
  brandName: "VikaFilms",
  founderName: "Vivek Kamble",
};

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings().catch(() => null) ?? META_DEFAULTS;
  const canonical = s.seoCanonical || "https://www.vikafilms.com";
  const keywords = s.seoKeywords ? s.seoKeywords.split(",").map((k) => k.trim()) : [];
  return {
    metadataBase: new URL(canonical),
    title: {
      default: s.seoTitle,
      template: `%s | ${s.brandName}`,
    },
    description: s.seoDescription,
    keywords,
    authors: [{ name: s.founderName, url: canonical }],
    creator: `${s.founderName} – ${s.brandName}`,
    publisher: s.brandName,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: s.brandName,
      title: s.seoTitle,
      description: s.seoDescription,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${s.brandName} – Commercial Photography & Brand Films` }],
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: s.seoTitle,
      description: s.seoDescription,
      images: ["/opengraph-image"],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const reqHeaders = await headers();
  const pathname = reqHeaders.get("x-pathname") ?? "";
  const isAdmin = pathname.startsWith("/admin");

  const settings = isAdmin ? null : await getSiteSettings().catch(() => null);

  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${hankenGrotesk.variable} ${geist.variable} ${monsieurLaDoulaise.variable} ${dmSans.variable} ${bebasNeue.variable} antialiased`}
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
        {!isAdmin && (
          <>
            <Preloader />
            <Navbar logoUrl={settings?.logoUrl} />
            <FloatingContact
              whatsappLink={settings?.contactWhatsappLink}
              whatsappMessage={settings?.contactWhatsappMessage}
              email={settings?.contactEmail}
            />
          </>
        )}
        {children}
      </body>
    </html>
  );
}
