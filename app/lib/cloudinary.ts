const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const BASE = `https://res.cloudinary.com/${CLOUD}`;

/**
 * Build an optimised Cloudinary image URL.
 * @param path  The Public ID shown in Cloudinary Media Library details panel.
 *              Do NOT include the folder path — Cloudinary stores only the
 *              filename as the public_id (e.g. "DSC01488_qx6a1n", not
 *              "VikaFilms/Commercial/Cars/DSC01488_qx6a1n").
 * @param transforms  e.g. "w_1200,q_auto,f_auto"   (defaults to q_auto,f_auto)
 */
export function cldImage(path: string, transforms = "q_auto,f_auto"): string {
  return `${BASE}/image/upload/${transforms}/${path}`;
}

/**
 * Build a Cloudinary video URL.
 * @param path  e.g. "vikafilms/reels/bmw-motion"   (no extension needed)
 */
export function cldVideo(path: string, transforms = "q_auto"): string {
  return `${BASE}/video/upload/${transforms}/${path}`;
}

/**
 * Auto-generate a video thumbnail from Cloudinary video (at 3s mark).
 * @param path  same path as the video
 */
export function cldVideoThumb(path: string): string {
  return `${BASE}/video/upload/so_3,q_auto,f_auto/${path}.jpg`;
}
