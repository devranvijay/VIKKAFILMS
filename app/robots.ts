import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://www.vikafilms.com/sitemap.xml",
    host: "https://www.vikafilms.com",
  };
}
