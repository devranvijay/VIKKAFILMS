"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "../../components/AdminShell";
import { AdminField, AdminSaveBar, ImageUploadField, SectionCard, TagEditor } from "../../components/AdminFormHelpers";

const CATEGORIES = ["Commercial", "Cinematic Reels", "Events"];

export default function NewProjectPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "Commercial",
    subcategory: "",
    client: "",
    year: new Date().getFullYear().toString(),
    description: "",
    cloudinaryId: "",
    cloudinaryUrl: "",
    tags: "[]",
    featured: false,
    sortOrder: 0,
    active: true,
  });

  function set(field: string, value: string | boolean | string[]) {
    setForm((prev) => ({
      ...prev,
      [field]: Array.isArray(value) ? JSON.stringify(value) : value,
    }));
  }

  async function handleSave() {
    if (!form.cloudinaryId) {
      alert("Please upload an image first.");
      return;
    }
    setSaving(true);
    const res = await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/admin/projects");
    } else {
      setSaving(false);
      alert("Failed to create project.");
    }
  }

  return (
    <AdminShell>
      <AdminSaveBar title="Add New Project" saving={saving} saved={false} onSave={handleSave} />

      <div style={{ maxWidth: 680, marginTop: 32 }}>
        <SectionCard title="Project Details">
          <AdminField label="Project / Series Title" hint="e.g. BMW Z4, DJI Gimbal" value={form.title} onChange={(v) => set("title", v)} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", color: "#999", fontSize: 12, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 6 }}>
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                style={{ width: "100%", background: "#1b1b1b", border: "1px solid #2a2a2a", borderRadius: 8, padding: "11px 14px", color: "#e2e2e2", fontSize: 14, outline: "none" }}
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <AdminField label="Subcategory" hint="e.g. Cars, Products" value={form.subcategory} onChange={(v) => set("subcategory", v)} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <AdminField label="Client Name" value={form.client} onChange={(v) => set("client", v)} />
            <AdminField label="Year" value={form.year} onChange={(v) => set("year", v)} />
          </div>
          <AdminField label="Description" value={form.description} onChange={(v) => set("description", v)} multiline rows={4} />
          <TagEditor label="Tags" tags={JSON.parse(form.tags || "[]")} onChange={(tags) => set("tags", tags)} />
          <div style={{ display: "flex", gap: 20 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, color: "#999", fontSize: 14, cursor: "pointer" }}>
              <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} />
              Featured project
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 8, color: "#999", fontSize: 14, cursor: "pointer" }}>
              <input type="checkbox" checked={form.active} onChange={(e) => set("active", e.target.checked)} />
              Active (visible)
            </label>
          </div>
        </SectionCard>

        <SectionCard title="Project Image">
          <ImageUploadField
            label="Upload Image"
            hint="Upload to Cloudinary. Recommended: 8K or high-res JPG/PNG."
            currentUrl={form.cloudinaryUrl || undefined}
            onUpload={(url, publicId) => setForm((prev) => ({ ...prev, cloudinaryUrl: url, cloudinaryId: publicId }))}
          />
          {form.cloudinaryId && (
            <AdminField
              label="Cloudinary Public ID"
              hint="Auto-filled after upload — you can also paste a Cloudinary ID directly"
              value={form.cloudinaryId}
              onChange={(v) => setForm((prev) => ({ ...prev, cloudinaryId: v }))}
            />
          )}
        </SectionCard>
      </div>
    </AdminShell>
  );
}
