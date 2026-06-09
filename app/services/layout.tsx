import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services – Photography & Cinematography Packages in Mumbai",
  description:
    "VikaFilms offers commercial photography, brand cinematography, product shoots, automotive campaigns, corporate portraits, weddings & event coverage in Mumbai and across India.",
  alternates: { canonical: "https://www.vikafilms.com/services" },
  openGraph: {
    title: "Services | VikaFilms – Photography & Cinematography Mumbai",
    description:
      "Commercial photography, brand films, product shoots, automotive campaigns, corporate portraits & wedding cinematography — Mumbai-based, India-wide.",
    url: "https://www.vikafilms.com/services",
    images: [{ url: "/portfolio/commercial/BMW-01.jpg", width: 1200, height: 630 }],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
