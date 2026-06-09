import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Shoot – Contact VikaFilms Mumbai",
  description:
    "Book a commercial photography or cinematography shoot with VikaFilms in Mumbai. Send an inquiry for brand films, product campaigns, automotive shoots, weddings & corporate photography.",
  alternates: { canonical: "https://www.vikafilms.com/contact" },
  openGraph: {
    title: "Contact VikaFilms – Book a Shoot in Mumbai",
    description:
      "Send a booking inquiry for commercial photography or cinematography. VikaFilms, Mumbai — brand films, product shoots, automotive campaigns & more.",
    url: "https://www.vikafilms.com/contact",
    images: [{ url: "/portfolio/commercial/BMW-01.jpg", width: 1200, height: 630 }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
