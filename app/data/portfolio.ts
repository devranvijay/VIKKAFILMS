export type Category =
  | "Commercial"
  | "Cinematics"
  | "Weddings"
  | "Hospitality"
  | "Medical"
  | "Businesses";

export const CATEGORIES: Category[] = [
  "Commercial",
  "Cinematics",
  "Weddings",
  "Hospitality",
  "Medical",
  "Businesses",
];

/** Per-category heading + sub shown in the portfolio header */
export const CATEGORY_META: Record<"All" | Category, { heading: string; sub: string }> = {
  All: {
    heading: "Commercial\nShowcase.",
    sub: "Selected campaigns, editorial narratives, and motion stories — crafted for brands that demand attention.",
  },
  Commercial: {
    heading: "Brand\nCampaigns.",
    sub: "High-impact commercial photography engineered for global market leadership.",
  },
  Cinematics: {
    heading: "Cinematic\nReels.",
    sub: "Brand films, wedding cinematics, and motion narratives — crafted frame by frame.",
  },
  Weddings: {
    heading: "Wedding\nFilms.",
    sub: "Timeless documentation of your most important day — photo and cinema combined.",
  },
  Hospitality: {
    heading: "Space\nNarratives.",
    sub: "Interior stories and lifestyle photography for the hospitality sector.",
  },
  Medical: {
    heading: "Clinical\nPrecision.",
    sub: "Healthcare facility and medical brand photography that communicates trust.",
  },
  Businesses: {
    heading: "Corporate\nPortraits.",
    sub: "Professional imagery that elevates your team, office, and company identity.",
  },
};

export interface Project {
  id: number;
  category: Category;
  title: string;
  description: string;
  src: string;
  featured?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// ADD YOUR SHOOTS HERE
//
// src → files inside public/portfolio/<category>/
// e.g. src: "/portfolio/weddings/sharma-wedding-01.jpg"
//
// featured: true → appears in the "Selected Work" grid on the home page
// ─────────────────────────────────────────────────────────────────────────────
export const PROJECTS: Project[] = [
  // ── Commercial ─────────────────────────────────────────────────────────────
  {
    id: 1,
    category: "Commercial",
    title: "BMW Series",
    description: "Luxury automotive campaign",
    src: "/portfolio/commercial/BMW-01.jpg",
    featured: true,
  },
  {
    id: 2,
    category: "Commercial",
    title: "Dental Studio",
    description: "Clinical precision · healthcare brand",
    src: "/portfolio/commercial/DentalChair-01.jpeg",
    featured: true,
  },

  // ── Cinematics ───────────────────────────────────────────────────────────────
  // Add your cinematic / video stills below:
  // {
  //   id: 5,
  //   category: "Cinematics",
  //   title: "Product Launch Film",
  //   description: "Brand reveal · 4K cinematic",
  //   src: "/portfolio/cinematics/launch-film-01.jpg",
  //   featured: true,
  // },

  // ── Weddings ────────────────────────────────────────────────────────────────
  // Add your wedding images below:
  // {
  //   id: 10,
  //   category: "Weddings",
  //   title: "Sharma Wedding",
  //   description: "Luxury destination wedding · Udaipur",
  //   src: "/portfolio/weddings/sharma-wedding-01.jpg",
  //   featured: true,
  // },

  // ── Hospitality ─────────────────────────────────────────────────────────────
  // Add your hospitality images below:
  // {
  //   id: 20,
  //   category: "Hospitality",
  //   title: "The Grand Oberoi",
  //   description: "Resort interiors & lifestyle",
  //   src: "/portfolio/hospitality/oberoi-01.jpg",
  // },

  // ── Medical ─────────────────────────────────────────────────────────────────
  // Add your medical images below:
  // {
  //   id: 30,
  //   category: "Medical",
  //   title: "Apollo Clinics",
  //   description: "Healthcare facility brand shoot",
  //   src: "/portfolio/medical/apollo-01.jpg",
  // },

  // ── Businesses ──────────────────────────────────────────────────────────────
  // Add your business/corporate images below:
  // {
  //   id: 40,
  //   category: "Businesses",
  //   title: "The Leadership Team",
  //   description: "Executive portraits · corporate identity",
  //   src: "/portfolio/businesses/corp-01.jpg",
  // },
];

// ─────────────────────────────────────────────────────────────────────────────
// REELS — video showcase cards
//
// Add your Vimeo / YouTube embed URLs in videoUrl.
// thumbnail → any image from public/ (used as poster before play)
// ─────────────────────────────────────────────────────────────────────────────
export interface Reel {
  id: number;
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
  videoUrl?: string; // YouTube / Vimeo embed src (optional — shows placeholder if empty)
}

export const REELS: Reel[] = [
  { id: 1,  title: "BMW Motion Series",        category: "Automotive Film",  duration: "2:34", thumbnail: "/portfolio/commercial/BMW-01.jpg",        videoUrl: "" },
  { id: 2,  title: "Healthcare Brand Story",   category: "Corporate Film",   duration: "3:12", thumbnail: "/portfolio/commercial/DentalChair-01.jpeg", videoUrl: "" },
  { id: 3,  title: "Wedding Cinematic Reel",   category: "Wedding Film",     duration: "4:05", thumbnail: "/portfolio/commercial/BMW-01.jpg",        videoUrl: "" },
  { id: 4,  title: "Luxury Hotel Walkthrough", category: "Hospitality Film", duration: "2:48", thumbnail: "/portfolio/commercial/DentalChair-01.jpeg", videoUrl: "" },
  { id: 5,  title: "Product Launch Film",      category: "Commercial Film",  duration: "1:55", thumbnail: "/portfolio/commercial/BMW-01.jpg",        videoUrl: "" },
  { id: 6,  title: "Corporate Identity Reel",  category: "Brand Film",       duration: "3:30", thumbnail: "/portfolio/commercial/DentalChair-01.jpeg", videoUrl: "" },
  { id: 7,  title: "Medical Facility Tour",    category: "Healthcare Film",  duration: "2:15", thumbnail: "/portfolio/commercial/BMW-01.jpg",        videoUrl: "" },
  { id: 8,  title: "Annual Event Highlights",  category: "Event Film",       duration: "5:10", thumbnail: "/portfolio/commercial/DentalChair-01.jpeg", videoUrl: "" },
  { id: 9,  title: "Startup Brand Story",      category: "Brand Film",       duration: "2:58", thumbnail: "/portfolio/commercial/BMW-01.jpg",        videoUrl: "" },
  { id: 10, title: "Restaurant Ambience Film", category: "Hospitality Film", duration: "1:30", thumbnail: "/portfolio/commercial/DentalChair-01.jpeg", videoUrl: "" },
  { id: 11, title: "Executive Portrait Film",  category: "Corporate Film",   duration: "2:20", thumbnail: "/portfolio/commercial/BMW-01.jpg",        videoUrl: "" },
  { id: 12, title: "Fashion Editorial Cuts",   category: "Editorial Film",   duration: "1:42", thumbnail: "/portfolio/commercial/DentalChair-01.jpeg", videoUrl: "" },
];
