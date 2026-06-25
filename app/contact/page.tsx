import { getSiteSettings } from "../lib/content";
import ContactPageClient from "./ContactPageClient";

export default async function ContactPage() {
  const s = await getSiteSettings().catch(() => null);
  return (
    <ContactPageClient
      email={s?.contactEmail}
      contactWhatsapp={s?.contactWhatsapp}
      contactWhatsappLink={s?.contactWhatsappLink}
      contactLocation={s?.contactLocation}
      instagramUrl={s?.instagramUrl}
      linkedinUrl={s?.linkedinUrl}
    />
  );
}
