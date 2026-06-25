"use client";

import { useEffect, useState } from "react";
import AdminShell from "../components/AdminShell";
import { AdminField, AdminSaveBar, ImageUploadField, SectionCard } from "../components/AdminFormHelpers";

export default function SiteSettingsAdminPage() {
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
      <AdminSaveBar title="Site Settings" saving={saving} saved={saved} onSave={handleSave} />

      <div style={{ maxWidth: 680, marginTop: 32 }}>
        <SectionCard title="Brand Identity">
          <AdminField
            label="Brand Name"
            hint="Your studio name as displayed throughout the site"
            value={data.brandName}
            onChange={(v) => setData({ ...data, brandName: v })}
          />
          <AdminField
            label="Established Year"
            hint="Shown in the services page header, e.g. Est. 2022"
            value={data.estYear}
            onChange={(v) => setData({ ...data, estYear: v })}
          />
          <AdminField
            label="Website URL"
            hint="Your canonical domain for SEO and metadata"
            type="url"
            value={data.websiteUrl}
            onChange={(v) => setData({ ...data, websiteUrl: v })}
          />
          <ImageUploadField
            label="Logo"
            hint="PNG with transparent background recommended. Displayed in navbar."
            currentUrl={data.logoUrl}
            onUpload={(url) => setData({ ...data, logoUrl: url })}
          />
        </SectionCard>

        <SectionCard title="Footer">
          <AdminField
            label="Copyright Text"
            hint="Shown at the bottom of every page, e.g. © 2024 VikaFilms. All Rights Reserved."
            value={data.footerCopyright}
            onChange={(v) => setData({ ...data, footerCopyright: v })}
          />
        </SectionCard>

        <SectionCard title="Services Page Labels">
          <AdminField
            label="Services Eyebrow"
            hint="Small label above the main heading"
            value={data.servicesEyebrow}
            onChange={(v) => setData({ ...data, servicesEyebrow: v })}
          />
          <AdminField
            label="Services Main Heading"
            value={data.servicesHeading}
            onChange={(v) => setData({ ...data, servicesHeading: v })}
          />
          <AdminField
            label="Services Subtitle"
            value={data.servicesSubtitle}
            onChange={(v) => setData({ ...data, servicesSubtitle: v })}
          />
        </SectionCard>
      </div>
    </AdminShell>
  );
}
