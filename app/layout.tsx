import type { Metadata } from "next";
import { Playfair_Display, Hanken_Grotesk, Geist } from "next/font/google";
import Navbar from "./components/Navbar";
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

export const metadata: Metadata = {
  title: "VikaFilms | Premium Commercial Photography Studio",
  description:
    "VikaFilms — A premium commercial photography studio. Making every moment a masterpiece through cinematic minimalism and advanced glassmorphism.",
  keywords: "VikaFilms, commercial photography, studio, luxury, cinematic, films",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${hankenGrotesk.variable} ${geist.variable} antialiased`}
    >
      <head>
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
        {children}
      </body>
    </html>
  );
}
