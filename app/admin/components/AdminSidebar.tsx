"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/hero", label: "Hero Section", icon: "home" },
  { href: "/admin/about", label: "About & Founder", icon: "person" },
  { href: "/admin/projects", label: "Portfolio Projects", icon: "photo_library" },
  { href: "/admin/services", label: "Services", icon: "build" },
  { href: "/admin/contact", label: "Contact Info", icon: "mail" },
  { href: "/admin/seo", label: "SEO & Metadata", icon: "search" },
  { href: "/admin/settings", label: "Site Settings", icon: "settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside
      style={{
        width: 240,
        minHeight: "100vh",
        background: "#111",
        borderRight: "1px solid #1f1f1f",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 50,
        fontFamily: "var(--font-hanken, system-ui, sans-serif)",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "24px 20px",
          borderBottom: "1px solid #1f1f1f",
        }}
      >
        <Link href="/admin" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/vikafilms-logo.png" alt="VikaFilms" width={90} height={28} style={{ objectFit: "contain" }} />
          <span style={{ color: "#555", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 2 }}>
            CMS
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "16px 0", overflowY: "auto" }}>
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 20px",
                color: active ? "#e2e2e2" : "#666",
                background: active ? "#1b1b1b" : "transparent",
                borderRight: active ? "2px solid #e2e2e2" : "2px solid transparent",
                textDecoration: "none",
                fontSize: 14,
                transition: "all 0.15s",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}

        <div style={{ margin: "12px 20px", borderTop: "1px solid #1f1f1f" }} />

        <Link
          href="/"
          target="_blank"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 20px",
            color: "#555",
            textDecoration: "none",
            fontSize: 14,
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>open_in_new</span>
          View Site
        </Link>
      </nav>

      {/* Logout */}
      <div style={{ padding: "16px 20px", borderTop: "1px solid #1f1f1f" }}>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 12px",
            background: "transparent",
            border: "1px solid #2a2a2a",
            borderRadius: 8,
            color: "#666",
            fontSize: 14,
            cursor: "pointer",
            transition: "all 0.15s",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>logout</span>
          {loggingOut ? "Logging out…" : "Logout"}
        </button>
      </div>
    </aside>
  );
}
