"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "Invalid credentials");
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0e0e0e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "var(--font-hanken, system-ui, sans-serif)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <Image
              src="/vikafilms-logo.png"
              alt="VikaFilms"
              width={120}
              height={40}
              style={{ objectFit: "contain" }}
            />
          </div>
          <p style={{ color: "#666", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Studio CMS
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "#161616",
            border: "1px solid #2a2a2a",
            borderRadius: 12,
            padding: "40px 36px",
          }}
        >
          <h1
            style={{
              color: "#e2e2e2",
              fontSize: 22,
              fontWeight: 500,
              marginBottom: 8,
              letterSpacing: "-0.02em",
            }}
          >
            Admin Login
          </h1>
          <p style={{ color: "#666", fontSize: 14, marginBottom: 32 }}>
            Sign in to manage your website content.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <label
                htmlFor="username"
                style={{ display: "block", color: "#999", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                style={{
                  width: "100%",
                  background: "#1b1b1b",
                  border: "1px solid #2a2a2a",
                  borderRadius: 8,
                  padding: "12px 16px",
                  color: "#e2e2e2",
                  fontSize: 15,
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#555")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#2a2a2a")}
              />
            </div>

            <div style={{ marginBottom: 28 }}>
              <label
                htmlFor="password"
                style={{ display: "block", color: "#999", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                style={{
                  width: "100%",
                  background: "#1b1b1b",
                  border: "1px solid #2a2a2a",
                  borderRadius: 8,
                  padding: "12px 16px",
                  color: "#e2e2e2",
                  fontSize: 15,
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#555")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#2a2a2a")}
              />
            </div>

            {error && (
              <div
                style={{
                  background: "rgba(220,38,38,0.1)",
                  border: "1px solid rgba(220,38,38,0.3)",
                  borderRadius: 8,
                  padding: "10px 14px",
                  color: "#f87171",
                  fontSize: 14,
                  marginBottom: 20,
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: loading ? "#333" : "#e2e2e2",
                color: loading ? "#666" : "#0e0e0e",
                border: "none",
                borderRadius: 8,
                padding: "14px",
                fontSize: 15,
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background 0.2s, color 0.2s",
                letterSpacing: "0.01em",
              }}
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
