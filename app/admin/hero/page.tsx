"use client";

import { useEffect, useState } from "react";
import AdminShell from "../components/AdminShell";
import { AdminField, AdminSaveBar } from "../components/AdminFormHelpers";

export default function HeroAdminPage() {
  const [data, setData] = useState<Record<string, string> | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then(setData);
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

  if (!data) return <AdminShell><LoadingSkeleton /></AdminShell>;

  return (
    <AdminShell>
      <AdminSaveBar title="Hero Section" saving={saving} saved={saved} onSave={handleSave} />

      <div style={{ maxWidth: 680, marginTop: 32 }}>
        <SectionCard title="Hero Content">
          <AdminField
            label="Main Tagline"
            hint="The large headline shown in the hero (e.g. 'Vika Films')"
            value={data.heroTagline}
            onChange={(v) => setData({ ...data, heroTagline: v })}
          />
          <AdminField
            label="Subheading"
            hint="The featured work caption below the tagline"
            value={data.heroSubheading}
            onChange={(v) => setData({ ...data, heroSubheading: v })}
          />
          <AdminField
            label="CTA Button Text"
            hint="Text on the primary call-to-action button"
            value={data.heroCta}
            onChange={(v) => setData({ ...data, heroCta: v })}
          />
          <AdminField
            label="CTA Button Link"
            hint="Where the CTA button links to (e.g. /contact)"
            value={data.heroCtaLink}
            onChange={(v) => setData({ ...data, heroCtaLink: v })}
          />
        </SectionCard>
      </div>
    </AdminShell>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#161616", border: "1px solid #1f1f1f", borderRadius: 12, padding: 28, marginBottom: 20 }}>
      <h3 style={{ color: "#e2e2e2", fontSize: 15, fontWeight: 500, marginBottom: 24 }}>{title}</h3>
      {children}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div style={{ maxWidth: 680 }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ background: "#161616", border: "1px solid #1f1f1f", borderRadius: 12, padding: 28, marginBottom: 16, height: 80 }} />
      ))}
    </div>
  );
}
