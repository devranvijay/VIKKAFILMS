"use client";

import { useEffect, useState } from "react";
import AdminShell from "../components/AdminShell";
import { AdminField, AdminSaveBar, SectionCard, TagEditor } from "../components/AdminFormHelpers";

type Service = {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string;
  ctaText: string;
  sortOrder: number;
  active: boolean;
};

type ProcessStep = {
  id: number;
  number: string;
  title: string;
  description: string;
  sortOrder: number;
};

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[] | null>(null);
  const [steps, setSteps] = useState<ProcessStep[] | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/services").then((r) => r.json()),
      fetch("/api/admin/process").then((r) => r.json()),
    ]).then(([s, p]) => {
      setServices(s);
      setSteps(p);
    });
  }, []);

  async function handleSave() {
    if (!services || !steps) return;
    setSaving(true);
    setSaved(false);
    await Promise.all([
      fetch("/api/admin/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(services),
      }),
      fetch("/api/admin/process", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(steps),
      }),
    ]);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function updateService(id: number, field: keyof Service, value: string | boolean | string[]) {
    setServices((prev) =>
      prev!.map((s) =>
        s.id === id
          ? { ...s, [field]: Array.isArray(value) ? JSON.stringify(value) : value }
          : s
      )
    );
  }

  function updateStep(id: number, field: keyof ProcessStep, value: string) {
    setSteps((prev) => prev!.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  }

  if (!services || !steps) {
    return <AdminShell><div style={{ color: "#555", padding: 40 }}>Loading…</div></AdminShell>;
  }

  return (
    <AdminShell>
      <AdminSaveBar title="Services" saving={saving} saved={saved} onSave={handleSave} />

      <div style={{ maxWidth: 720, marginTop: 32 }}>
        {services.map((svc) => (
          <SectionCard key={svc.id} title={`${svc.number} · ${svc.title}`}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <AdminField
                label="Number"
                hint="Display number e.g. 01"
                value={svc.number}
                onChange={(v) => updateService(svc.id, "number", v)}
              />
              <AdminField
                label="Category Label"
                hint="Shown above the title, e.g. Photography"
                value={svc.subtitle}
                onChange={(v) => updateService(svc.id, "subtitle", v)}
              />
            </div>
            <AdminField
              label="Service Title"
              value={svc.title}
              onChange={(v) => updateService(svc.id, "title", v)}
            />
            <AdminField
              label="Description"
              value={svc.description}
              onChange={(v) => updateService(svc.id, "description", v)}
              multiline
              rows={3}
            />
            <TagEditor
              label="Tags"
              tags={JSON.parse(svc.tags || "[]")}
              onChange={(tags) => updateService(svc.id, "tags", tags)}
            />
            <AdminField
              label="CTA Button Text"
              hint="e.g. Book a Shoot"
              value={svc.ctaText}
              onChange={(v) => updateService(svc.id, "ctaText", v)}
            />
          </SectionCard>
        ))}

        <div style={{ marginTop: 40, marginBottom: 16 }}>
          <h2 style={{ color: "#e2e2e2", fontSize: 16, fontWeight: 500 }}>Process Steps</h2>
          <p style={{ color: "#666", fontSize: 13, marginTop: 4 }}>The "How it works" section on the services page.</p>
        </div>

        {steps.map((step) => (
          <SectionCard key={step.id} title={`Step ${step.number} — ${step.title}`}>
            <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 16 }}>
              <AdminField
                label="Number"
                value={step.number}
                onChange={(v) => updateStep(step.id, "number", v)}
              />
              <AdminField
                label="Step Title"
                value={step.title}
                onChange={(v) => updateStep(step.id, "title", v)}
              />
            </div>
            <AdminField
              label="Description"
              value={step.description}
              onChange={(v) => updateStep(step.id, "description", v)}
              multiline
              rows={3}
            />
          </SectionCard>
        ))}
      </div>
    </AdminShell>
  );
}
