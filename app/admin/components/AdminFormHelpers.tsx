"use client";

import { ChangeEvent, useRef, useState } from "react";

// ─── Save Bar ────────────────────────────────────────────────────────────────
export function AdminSaveBar({
  title,
  saving,
  saved,
  onSave,
}: {
  title: string;
  saving: boolean;
  saved: boolean;
  onSave: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 0,
      }}
    >
      <h1 style={{ color: "#e2e2e2", fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em" }}>
        {title}
      </h1>
      <button
        onClick={onSave}
        disabled={saving}
        style={{
          background: saved ? "#16a34a" : saving ? "#333" : "#e2e2e2",
          color: saved ? "#fff" : saving ? "#666" : "#0e0e0e",
          border: "none",
          borderRadius: 8,
          padding: "10px 22px",
          fontSize: 14,
          fontWeight: 600,
          cursor: saving ? "not-allowed" : "pointer",
          transition: "all 0.2s",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {saving && <Spinner />}
        {saved ? "Saved ✓" : saving ? "Saving…" : "Save Changes"}
      </button>
    </div>
  );
}

// ─── Text Field ───────────────────────────────────────────────────────────────
export function AdminField({
  label,
  hint,
  value,
  onChange,
  multiline = false,
  rows = 4,
  type = "text",
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  rows?: number;
  type?: string;
}) {
  const sharedStyle: React.CSSProperties = {
    width: "100%",
    background: "#1b1b1b",
    border: "1px solid #2a2a2a",
    borderRadius: 8,
    padding: "11px 14px",
    color: "#e2e2e2",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
    fontFamily: "inherit",
    resize: multiline ? "vertical" : "none",
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", color: "#999", fontSize: 12, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 6 }}>
        {label}
      </label>
      {multiline ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
          style={sharedStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#444")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#2a2a2a")}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          style={sharedStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#444")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#2a2a2a")}
        />
      )}
      {hint && <p style={{ color: "#555", fontSize: 12, marginTop: 5 }}>{hint}</p>}
    </div>
  );
}

// ─── Image Upload Field ───────────────────────────────────────────────────────
export function ImageUploadField({
  label,
  hint,
  currentUrl,
  onUpload,
}: {
  label: string;
  hint?: string;
  currentUrl?: string;
  onUpload: (url: string, publicId: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    setUploading(false);
    if (!res.ok) {
      setError("Upload failed. Please try again.");
      return;
    }
    const data = await res.json();
    onUpload(data.url, data.publicId);
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", color: "#999", fontSize: 12, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 6 }}>
        {label}
      </label>
      {currentUrl && (
        <div style={{ marginBottom: 10, borderRadius: 8, overflow: "hidden", maxWidth: 200, border: "1px solid #2a2a2a" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={currentUrl} alt="current" style={{ width: "100%", display: "block", objectFit: "cover", aspectRatio: "4/3" }} />
        </div>
      )}
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          style={{
            background: "#1b1b1b",
            border: "1px solid #2a2a2a",
            borderRadius: 8,
            padding: "10px 16px",
            color: "#999",
            fontSize: 13,
            cursor: uploading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {uploading ? <Spinner /> : (
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>upload</span>
          )}
          {uploading ? "Uploading…" : "Upload Image"}
        </button>
        {currentUrl && (
          <span style={{ color: "#444", fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 200 }}>
            {currentUrl.split("/").pop()}
          </span>
        )}
      </div>
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
      {error && <p style={{ color: "#f87171", fontSize: 12, marginTop: 6 }}>{error}</p>}
      {hint && <p style={{ color: "#555", fontSize: 12, marginTop: 5 }}>{hint}</p>}
    </div>
  );
}

// ─── Tag Editor ───────────────────────────────────────────────────────────────
export function TagEditor({
  label,
  tags,
  onChange,
}: {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
}) {
  const [input, setInput] = useState("");

  function addTag() {
    const t = input.trim();
    if (t && !tags.includes(t)) onChange([...tags, t]);
    setInput("");
  }

  function removeTag(tag: string) {
    onChange(tags.filter((t) => t !== tag));
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", color: "#999", fontSize: 12, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 6 }}>
        {label}
      </label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              background: "#1b1b1b",
              border: "1px solid #2a2a2a",
              borderRadius: 9999,
              padding: "4px 12px",
              color: "#c4c7c8",
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              style={{ background: "none", border: "none", color: "#666", cursor: "pointer", padding: 0, lineHeight: 1 }}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
          placeholder="Add tag and press Enter"
          style={{
            flex: 1,
            background: "#1b1b1b",
            border: "1px solid #2a2a2a",
            borderRadius: 8,
            padding: "9px 12px",
            color: "#e2e2e2",
            fontSize: 13,
            outline: "none",
          }}
        />
        <button
          onClick={addTag}
          style={{ background: "#1b1b1b", border: "1px solid #2a2a2a", borderRadius: 8, padding: "9px 14px", color: "#999", cursor: "pointer", fontSize: 13 }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

// ─── Section Card ──────────────────────────────────────────────────────────────
export function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#161616", border: "1px solid #1f1f1f", borderRadius: 12, padding: 28, marginBottom: 20 }}>
      <h3 style={{ color: "#e2e2e2", fontSize: 15, fontWeight: 500, marginBottom: 24 }}>{title}</h3>
      {children}
    </div>
  );
}

// ─── Spinner ──────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <span
      style={{
        width: 14,
        height: 14,
        border: "2px solid #555",
        borderTopColor: "#e2e2e2",
        borderRadius: "50%",
        display: "inline-block",
        animation: "spin 0.7s linear infinite",
      }}
    />
  );
}
