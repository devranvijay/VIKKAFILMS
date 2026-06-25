"use client";

import { useEffect, useState } from "react";
import AdminShell from "../components/AdminShell";
import { AdminField, AdminSaveBar, ImageUploadField, SectionCard } from "../components/AdminFormHelpers";

export default function AboutAdminPage() {
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
      <AdminSaveBar title="About & Founder" saving={saving} saved={saved} onSave={handleSave} />

      <div style={{ maxWidth: 680, marginTop: 32 }}>
        <SectionCard title="Founder Profile">
          <AdminField
            label="Founder Name"
            value={data.founderName}
            onChange={(v) => setData({ ...data, founderName: v })}
          />
          <AdminField
            label="Title / Role"
            hint="Shown below the founder's name"
            value={data.founderTitle}
            onChange={(v) => setData({ ...data, founderTitle: v })}
          />
          <AdminField
            label="Bio — First Paragraph"
            value={data.founderBio1}
            onChange={(v) => setData({ ...data, founderBio1: v })}
            multiline
            rows={3}
          />
          <AdminField
            label="Bio — Second Paragraph"
            value={data.founderBio2}
            onChange={(v) => setData({ ...data, founderBio2: v })}
            multiline
            rows={3}
          />
          <AdminField
            label="Availability Badge Text"
            hint="Small badge shown below the bio"
            value={data.availabilityText}
            onChange={(v) => setData({ ...data, availabilityText: v })}
          />
          <ImageUploadField
            label="Founder Photo"
            hint="Recommended: portrait orientation, min 800×1000px"
            currentUrl={data.founderAvatarUrl}
            onUpload={(url) => setData({ ...data, founderAvatarUrl: url })}
          />
        </SectionCard>

        <SectionCard title="CTA Section">
          <AdminField
            label="CTA Heading"
            value={data.ctaHeading}
            onChange={(v) => setData({ ...data, ctaHeading: v })}
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <AdminField label="Button 1 Text" value={data.ctaBtn1Text} onChange={(v) => setData({ ...data, ctaBtn1Text: v })} />
            <AdminField label="Button 1 Link" value={data.ctaBtn1Link} onChange={(v) => setData({ ...data, ctaBtn1Link: v })} />
            <AdminField label="Button 2 Text" value={data.ctaBtn2Text} onChange={(v) => setData({ ...data, ctaBtn2Text: v })} />
            <AdminField label="Button 2 Link" value={data.ctaBtn2Link} onChange={(v) => setData({ ...data, ctaBtn2Link: v })} />
          </div>
        </SectionCard>
      </div>
    </AdminShell>
  );
}
