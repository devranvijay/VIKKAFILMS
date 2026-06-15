import { cldImage, cldVideoThumb } from "../lib/cloudinary";

// ─── Categories — mirrors Cloudinary top-level folders exactly ───────────────
export type Category = "Commercial" | "Cinematic Reels" | "Events";

export const CATEGORIES: Category[] = ["Commercial", "Cinematic Reels", "Events"];

// ─── Per-category copy shown in the portfolio header ─────────────────────────
export const CATEGORY_META: Record<"All" | Category, { heading: string; sub: string }> = {
  All: {
    heading: "The\nCollection.",
    sub: "Commercial campaigns, cinematic reels, and live event coverage — every frame crafted with intent.",
  },
  Commercial: {
    heading: "Commercial\nWork.",
    sub: "Brand photography and product campaigns for automotive, lifestyle, and business clients.",
  },
  "Cinematic Reels": {
    heading: "Cinematic\nReels.",
    sub: "Motion narratives, brand films, and short-form cinematics crafted frame by frame.",
  },
  Events: {
    heading: "Event\nCoverage.",
    sub: "Live event photography and videography — corporate, cultural, and social occasions.",
  },
};

// ─── Project interface ────────────────────────────────────────────────────────
export interface Project {
  id: number;
  category: Category;
  /** "Cars" | "Products" — only used within Commercial */
  subcategory?: string;
  title: string;
  description: string;
  src: string;
  featured?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// HOW TO ADD A NEW PROJECT
//
// 1. Upload the image to Cloudinary under the correct folder:
//      VikaFilms/Commercial/Cars/    ← car / automotive shoots
//      VikaFilms/Commercial/Products/ ← product / brand shoots
//      VikaFilms/Cinematic Reels/     ← video stills / film frames
//      VikaFilms/Events/              ← event photos
//
// 2. Copy the filename (without extension) from Cloudinary Media Library.
//
// 3. Add an entry below using cldImage("VikaFilms/FolderName/your-filename")
//    Cloudinary auto-serves WebP, compresses quality, and CDN-delivers it.
// ─────────────────────────────────────────────────────────────────────────────
export const PROJECTS: Project[] = [

  // ── Commercial → Cars (BMW Z4 shoot) ─────────────────────────────────────
  { id: 1,  category: "Commercial", subcategory: "Cars",     title: "BMW Z4", description: "BMW Z4 · Automotive commercial", src: cldImage("DSC01488_qx6a1n"),              featured: true  },
  { id: 2,  category: "Commercial", subcategory: "Cars",     title: "BMW Z4", description: "BMW Z4 · Automotive commercial", src: cldImage("DSC01456_ygk3gp"),              featured: false },
  { id: 3,  category: "Commercial", subcategory: "Cars",     title: "BMW Z4", description: "BMW Z4 · Automotive commercial", src: cldImage("DSC01395-Enhanced-NR_el2qlx"), featured: false },
  { id: 4,  category: "Commercial", subcategory: "Cars",     title: "BMW Z4", description: "BMW Z4 · Automotive commercial", src: cldImage("DSC01346-Enhanced-NR_lf6bof"), featured: false },
  { id: 5,  category: "Commercial", subcategory: "Cars",     title: "BMW Z4", description: "BMW Z4 · Automotive commercial", src: cldImage("DSC01326_fedjlf"),              featured: false },
  { id: 6,  category: "Commercial", subcategory: "Cars",     title: "BMW Z4", description: "BMW Z4 · Automotive commercial", src: cldImage("DSC01538_nj4cxb"),              featured: false },
  { id: 7,  category: "Commercial", subcategory: "Cars",     title: "BMW Z4", description: "BMW Z4 · Automotive commercial", src: cldImage("DSC01487_gybjpg"),              featured: false },
  { id: 8,  category: "Commercial", subcategory: "Cars",     title: "BMW Z4", description: "BMW Z4 · Automotive commercial", src: cldImage("DSC01458_a4sarj"),              featured: false },
  { id: 9,  category: "Commercial", subcategory: "Cars",     title: "BMW Z4", description: "BMW Z4 · Automotive commercial", src: cldImage("DSC01400_onzzlx"),              featured: false },
  { id: 10, category: "Commercial", subcategory: "Cars",     title: "BMW Z4", description: "BMW Z4 · Automotive commercial", src: cldImage("DSC01390_ttilio"),              featured: false },

  // ── Commercial → Products (DJI Gimbal shoot) ──────────────────────────────
  { id: 11, category: "Commercial", subcategory: "Products", title: "DJI Gimbal", description: "DJI Gimbal · Product commercial", src: cldImage("DSC09380_aonznj"),              featured: true  },
  { id: 12, category: "Commercial", subcategory: "Products", title: "DJI Gimbal", description: "DJI Gimbal · Product commercial", src: cldImage("DSC09376_lygk5q"),              featured: false },
  { id: 13, category: "Commercial", subcategory: "Products", title: "DJI Gimbal", description: "DJI Gimbal · Product commercial", src: cldImage("DSC09383_sdvqan"),              featured: false },
  { id: 14, category: "Commercial", subcategory: "Products", title: "DJI Gimbal", description: "DJI Gimbal · Product commercial", src: cldImage("DSC09373_uxxdtu"),              featured: false },
  { id: 15, category: "Commercial", subcategory: "Products", title: "DJI Gimbal", description: "DJI Gimbal · Product commercial", src: cldImage("DSC09374_sxovrw"),              featured: false },
  { id: 16, category: "Commercial", subcategory: "Products", title: "DJI Gimbal", description: "DJI Gimbal · Product commercial", src: cldImage("DSC09378_ryczhm"),              featured: false },

  // ── Cinematic Reels ── (add when uploaded to VikaFilms/Cinematic Reels/)
  // { id: 20, category: "Cinematic Reels", title: "...", description: "...", src: cldImage("VikaFilms/Cinematic Reels/filename"), featured: true },

  // ── Events ── (add when uploaded to VikaFilms/Events/)
  // { id: 30, category: "Events", title: "...", description: "...", src: cldImage("VikaFilms/Events/filename"), featured: true },
];

// ─────────────────────────────────────────────────────────────────────────────
// REELS — video showcase cards
//
// Upload video to: VikaFilms/Cinematic Reels/ on Cloudinary
// thumbnail → use cldVideoThumb("VikaFilms/Cinematic Reels/filename")
//             Cloudinary auto-generates a still from the 3-second mark
// videoUrl  → YouTube unlisted embed URL  OR  Cloudinary video URL
//             e.g. "https://www.youtube.com/embed/VIDEO_ID"
// ─────────────────────────────────────────────────────────────────────────────
export interface Reel {
  id: number;
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
  videoUrl?: string;
}

export const REELS: Reel[] = [

  // ── Cinematic Reels ────────────────────────────────────────────────────────
  // {
  //   id: 1,
  //   title: "Brand Launch Film",
  //   category: "Cinematic",
  //   duration: "2:34",
  //   thumbnail: cldVideoThumb("VikaFilms/Cinematic Reels/brand-launch"),
  //   videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  // },

  // ── Commercial ────────────────────────────────────────────────────────────
  // {
  //   id: 2,
  //   title: "BMW Motion Series",
  //   category: "Automotive",
  //   duration: "1:50",
  //   thumbnail: cldVideoThumb("VikaFilms/Commercial/Cars/bmw-motion"),
  //   videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  // },

  // ── Events ────────────────────────────────────────────────────────────────
  // {
  //   id: 3,
  //   title: "Annual Gala Highlights",
  //   category: "Event Film",
  //   duration: "3:20",
  //   thumbnail: cldVideoThumb("VikaFilms/Events/gala-2024"),
  //   videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  // },
];
