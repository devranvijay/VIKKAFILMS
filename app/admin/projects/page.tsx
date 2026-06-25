"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminShell from "../components/AdminShell";

type Project = {
  id: number;
  title: string;
  category: string;
  subcategory: string;
  client: string;
  year: string;
  cloudinaryId: string;
  cloudinaryUrl: string;
  featured: boolean;
  active: boolean;
  sortOrder: number;
};

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "deheutmgd";

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/admin/projects").then((r) => r.json()).then(setProjects);
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    setDeleting(id);
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    setProjects((prev) => prev!.filter((p) => p.id !== id));
    setDeleting(null);
  }

  async function toggleActive(project: Project) {
    const updated = { ...project, active: !project.active };
    await fetch(`/api/admin/projects/${project.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setProjects((prev) => prev!.map((p) => (p.id === project.id ? updated : p)));
  }

  const grouped = projects
    ? Object.groupBy(projects, (p) => p.category)
    : null;

  return (
    <AdminShell>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <h1 style={{ color: "#e2e2e2", fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em" }}>
          Portfolio Projects
        </h1>
        <Link
          href="/admin/projects/new"
          style={{
            background: "#e2e2e2",
            color: "#0e0e0e",
            border: "none",
            borderRadius: 8,
            padding: "10px 20px",
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
          Add Project
        </Link>
      </div>

      {!projects ? (
        <div style={{ color: "#555" }}>Loading…</div>
      ) : (
        Object.entries(grouped ?? {}).map(([category, items]) => (
          <div key={category} style={{ marginBottom: 40 }}>
            <h2 style={{ color: "#999", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
              {category}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
              {items?.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onDelete={() => handleDelete(project.id)}
                  onToggle={() => toggleActive(project)}
                  deleting={deleting === project.id}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </AdminShell>
  );
}

function ProjectCard({
  project,
  onDelete,
  onToggle,
  deleting,
}: {
  project: Project;
  onDelete: () => void;
  onToggle: () => void;
  deleting: boolean;
}) {
  const imgUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_400,h_280,c_fill,q_auto,f_auto/${project.cloudinaryId}`;

  return (
    <div
      style={{
        background: "#161616",
        border: "1px solid #1f1f1f",
        borderRadius: 10,
        overflow: "hidden",
        opacity: project.active ? 1 : 0.5,
        transition: "opacity 0.2s",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", aspectRatio: "10/7", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgUrl}
          alt={project.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {project.featured && (
          <span
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              background: "rgba(0,0,0,0.8)",
              color: "#e2e2e2",
              fontSize: 10,
              padding: "2px 8px",
              borderRadius: 9999,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Featured
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "12px 14px" }}>
        <div style={{ color: "#e2e2e2", fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{project.title}</div>
        <div style={{ color: "#555", fontSize: 12 }}>
          {project.client} · {project.year}
        </div>
      </div>

      {/* Actions */}
      <div style={{ padding: "8px 14px 12px", display: "flex", gap: 8 }}>
        <Link
          href={`/admin/projects/${project.id}`}
          style={{
            flex: 1,
            background: "#1b1b1b",
            border: "1px solid #2a2a2a",
            borderRadius: 6,
            padding: "7px",
            color: "#999",
            fontSize: 12,
            textDecoration: "none",
            textAlign: "center",
          }}
        >
          Edit
        </Link>
        <button
          onClick={onToggle}
          title={project.active ? "Deactivate" : "Activate"}
          style={{
            background: "#1b1b1b",
            border: "1px solid #2a2a2a",
            borderRadius: 6,
            padding: "7px 10px",
            color: project.active ? "#22c55e" : "#666",
            cursor: "pointer",
            fontSize: 12,
          }}
        >
          {project.active ? "On" : "Off"}
        </button>
        <button
          onClick={onDelete}
          disabled={deleting}
          title="Delete"
          style={{
            background: "#1b1b1b",
            border: "1px solid #2a2a2a",
            borderRadius: 6,
            padding: "7px 10px",
            color: deleting ? "#666" : "#f87171",
            cursor: deleting ? "not-allowed" : "pointer",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>delete</span>
        </button>
      </div>
    </div>
  );
}
