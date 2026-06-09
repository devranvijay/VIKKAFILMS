import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio – Commercial Photography & Cinematography Work",
  description:
    "Explore VikaFilms' portfolio of premium commercial photography and cinematography. Automotive campaigns, healthcare brand shoots, product films, and editorial stories crafted in Mumbai.",
  alternates: { canonical: "https://www.vikafilms.com/portfolio" },
  openGraph: {
    title: "Our Work | VikaFilms – Commercial Photography Mumbai",
    description:
      "View VikaFilms' portfolio — cinematic automotive campaigns, brand films, product shoots, and editorial stories by Mumbai's premium commercial studio.",
    url: "https://www.vikafilms.com/portfolio",
    images: [{ url: "/portfolio/commercial/BMW-01.jpg", width: 1200, height: 630 }],
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
