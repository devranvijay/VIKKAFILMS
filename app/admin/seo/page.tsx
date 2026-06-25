"use client";

import { useEffect, useState } from "react";
import AdminShell from "../components/AdminShell";
import { AdminField, AdminSaveBar, SectionCard } from "../components/AdminFormHelpers";

export default function SeoAdminPage() {
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
      <AdminSaveBar title="SEO & Metadata" saving={saving} saved={saved} onSave={handleSave} />

      <div style={{ maxWidth: 680, marginTop: 32 }}>
        <SectionCard title="Search Engine Optimization">
          <AdminField
            label="Page Title"
            hint="Shown in Google search results and browser tab. Keep under 60 characters."
            value={data.seoTitle}
            onChange={(v) => setData({ ...data, seoTitle: v })}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <span style={{ color: "#555", fontSize: 12 }}>
              {data.seoTitle?.length ?? 0} / 60 characters
            </span>
            <span style={{ color: data.seoTitle?.length > 60 ? "#f87171" : "#555", fontSize: 12 }}>
              {data.seoTitle?.length > 60 ? "Too long" : "Good"}
            </span>
          </div>
          <AdminField
            label="Meta Description"
            hint="Shown below the title in search results. Ideal: 150–160 characters."
            value={data.seoDescription}
            onChange={(v) => setData({ ...data, seoDescription: v })}
            multiline
            rows={4}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ color: "#555", fontSize: 12 }}>
              {data.seoDescription?.length ?? 0} / 160 characters
            </span>
          </div>
          <AdminField
            label="Keywords"
            hint="Comma-separated keywords. Less important for modern SEO, but still useful."
            value={data.seoKeywords}
            onChange={(v) => setData({ ...data, seoKeywords: v })}
            multiline
            rows={3}
          />
          <AdminField
            label="Canonical URL"
            hint="The main URL of your website, e.g. https://www.vikafilms.com"
            type="url"
            value={data.seoCanonical}
            onChange={(v) => setData({ ...data, seoCanonical: v })}
          />
        </SectionCard>

        <SectionCard title="Search Preview">
          <div
            style={{
              background: "#1b1b1b",
              border: "1px solid #2a2a2a",
              borderRadius: 8,
              padding: 16,
              fontFamily: "Arial, sans-serif",
            }}
          >
            <div style={{ color: "#8ab4f8", fontSize: 18, marginBottom: 2 }}>{data.seoTitle || "Page Title"}</div>
            <div style={{ color: "#34a853", fontSize: 13, marginBottom: 4 }}>{data.seoCanonical}</div>
            <div style={{ color: "#bdc1c6", fontSize: 14, lineHeight: 1.5 }}>
              {data.seoDescription?.slice(0, 160) || "Meta description will appear here…"}
            </div>
          </div>
        </SectionCard>
      </div>
    </AdminShell>
  );
}
