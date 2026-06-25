import { getSiteSettings } from "./lib/content";
import HomePageClient from "./HomePageClient";

export default async function HomePage() {
  const settings = await getSiteSettings().catch(() => undefined);
  return <HomePageClient settings={settings} />;
}
