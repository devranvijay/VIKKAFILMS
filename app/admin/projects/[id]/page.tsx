"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminShell from "../../components/AdminShell";
import { AdminField, AdminSaveBar, ImageUploadField, SectionCard, TagEditor } from "../../components/AdminFormHelpers";

const CATEGORIES = ["Commercial", "Cinematic Reels", "Events"];

type Project = {
  id: number;
  title: string;
  category: string;
  subcategory: string;
  client: string;
  year: string;
  description: string;
  cloudinaryId: string;
  cloudinaryUrl: string;
  tags: string;
  featured: boolean;
  sortOrder: number;
  active: boolean;
};

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [form, setForm] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/projects/${id}`).then((r) => r.json()).then(setForm);
  }, [id]);

  function set(field: keyof Project, value: string | boolean | string[]) {
    setForm((prev) => prev && ({
      ...prev,
      [field]: Array.isArray(value) ? JSON.stringify(value) : value,
    }));
  }

  async function handleSave() {
    if (!form) return;
    setSaving(true);
    setSaved(false);
    await fetch(`/api/admin/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  async function handleDelete() {
    if (!confirm("Delete this project permanently?")) return;
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    router.push("/admin/projects");
  }

  if (!form) return <AdminShell><div style={{ color: "#555", padding: 40 }}>Loading…</div></AdminShell>;

  return (
    <AdminShell>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <AdminSaveBar title={`Edit: ${form.title}`} saving={saving} saved={saved} onSave={handleSave} />
        <button
          onClick={handleDelete}
          style={{ marginLeft: 12, background: "transparent", border: "1px solid #3a1515", borderRadius: 8, padding: "10px 16px", color: "#f87171", fontSize: 14, cursor: "pointer" }}
        >
          Delete
        </button>
      </div>

      <div style={{ maxWidth: 680, marginTop: 32 }}>
        <SectionCard title="Project Details">
          <AdminField label="Project / Series Title" value={form.title} onChange={(v) => set("title", v)} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", color: "#999", fontSize: 12, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 6 }}>Category</label>
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
          <AdminField label="Sort Order" hint="Lower numbers appear first" value={String(form.sortOrder)} onChange={(v) => set("sortOrder", v)} type="number" />
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
            label="Replace Image"
            hint="Upload a new image to replace the current one"
            currentUrl={form.cloudinaryUrl || undefined}
            onUpload={(url, publicId) => setForm((prev) => prev && ({ ...prev, cloudinaryUrl: url, cloudinaryId: publicId }))}
          />
          <AdminField
            label="Cloudinary Public ID"
            hint="The image identifier on Cloudinary"
            value={form.cloudinaryId}
            onChange={(v) => set("cloudinaryId", v)}
          />
        </SectionCard>
      </div>
    </AdminShell>
  );
}
