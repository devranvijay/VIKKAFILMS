"use client";

import { useEffect, useState } from "react";
import AdminShell from "../components/AdminShell";
import { AdminField, AdminSaveBar, SectionCard } from "../components/AdminFormHelpers";

export default function ContactAdminPage() {
  const [data, setData] = useState<Record<string, string> | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings").then((r) => r.json()).then(setData);
  }, []);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (!data) return <AdminShell><div style={{ color: "#555", padding: 40 }}>Loading…</div></AdminShell>;

  return (
    <AdminShell>
      <AdminSaveBar title="Contact Information" saving={saving} saved={saved} onSave={handleSave} />

      <div style={{ maxWidth: 680, marginTop: 32 }}>
        <SectionCard title="Contact Details">
          <AdminField
            label="Email Address"
            type="email"
            hint="Shown on contact page and used as reply-to for form submissions"
            value={data.contactEmail}
            onChange={(v) => setData({ ...data, contactEmail: v })}
          />
          <AdminField
            label="WhatsApp Number"
            hint="Display format, e.g. +91 93099 06722"
            value={data.contactWhatsapp}
            onChange={(v) => setData({ ...data, contactWhatsapp: v })}
          />
          <AdminField
            label="WhatsApp Link"
            hint="Full wa.me URL with country code, e.g. https://wa.me/919309906722"
            value={data.contactWhatsappLink}
            onChange={(v) => setData({ ...data, contactWhatsappLink: v })}
          />
          <AdminField
            label="WhatsApp Pre-filled Message"
            hint="Message pre-filled when someone clicks the WhatsApp button"
            value={data.contactWhatsappMessage}
            onChange={(v) => setData({ ...data, contactWhatsappMessage: v })}
            multiline
            rows={3}
          />
          <AdminField
            label="Studio Location"
            hint="Short location text, e.g. Mumbai, India"
            value={data.contactLocation}
            onChange={(v) => setData({ ...data, contactLocation: v })}
          />
        </SectionCard>

        <SectionCard title="Social Media Links">
          <AdminField
            label="Instagram URL"
            type="url"
            value={data.instagramUrl}
            onChange={(v) => setData({ ...data, instagramUrl: v })}
          />
          <AdminField
            label="LinkedIn URL"
            type="url"
            value={data.linkedinUrl}
            onChange={(v) => setData({ ...data, linkedinUrl: v })}
          />
        </SectionCard>
      </div>
    </AdminShell>
  );
}
