import { verifySession } from "@/app/lib/dal";
import prisma from "@/app/lib/db";
import AdminShell from "./components/AdminShell";
import Link from "next/link";

export const metadata = { title: "Dashboard — VikaFilms CMS" };

export default async function AdminDashboard() {
  await verifySession();

  const [settings, projectCount, serviceCount] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: "main" } }),
    prisma.project.count({ where: { active: true } }),
    prisma.service.count({ where: { active: true } }),
  ]);

  const quickLinks = [
    { href: "/admin/hero", title: "Hero Section", desc: "Headline, CTA, tagline", icon: "home" },
    { href: "/admin/about", title: "About & Founder", desc: "Bio, photo, availability", icon: "person" },
    { href: "/admin/projects", title: "Portfolio", desc: `${projectCount} active projects`, icon: "photo_library" },
    { href: "/admin/services", title: "Services", desc: `${serviceCount} services`, icon: "build" },
    { href: "/admin/contact", title: "Contact", desc: "Email, WhatsApp, social", icon: "mail" },
    { href: "/admin/seo", title: "SEO", desc: "Title, description, keywords", icon: "search" },
    { href: "/admin/settings", title: "Site Settings", desc: "Brand, logo, footer", icon: "settings" },
  ];

  return (
    <AdminShell>
      <style>{`.adm-link:hover { border-color: #333 !important; }`}</style>
      <div style={{ maxWidth: 900 }}>
        <h1
          style={{
            color: "#e2e2e2",
            fontSize: 28,
            fontWeight: 500,
            letterSpacing: "-0.03em",
            marginBottom: 8,
          }}
        >
          Welcome back
        </h1>
        <p style={{ color: "#666", fontSize: 15, marginBottom: 48 }}>
          {settings?.brandName} Studio CMS — manage your website content below.
        </p>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginBottom: 48,
          }}
        >
          {[
            { label: "Portfolio Projects", value: projectCount, icon: "photo_library" },
            { label: "Active Services", value: serviceCount, icon: "build" },
            { label: "Site Status", value: "Live", icon: "public" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "#161616",
                border: "1px solid #1f1f1f",
                borderRadius: 12,
                padding: "24px",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#555", display: "block", marginBottom: 12 }}>
                {stat.icon}
              </span>
              <div style={{ color: "#e2e2e2", fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 4 }}>
                {stat.value}
              </div>
              <div style={{ color: "#666", fontSize: 13 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick access */}
        <h2 style={{ color: "#999", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
          Edit Content
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 12,
          }}
        >
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="adm-link"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                background: "#161616",
                border: "1px solid #1f1f1f",
                borderRadius: 10,
                padding: "20px",
                textDecoration: "none",
                transition: "border-color 0.15s",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#555", marginTop: 2, flexShrink: 0 }}>
                {link.icon}
              </span>
              <div>
                <div style={{ color: "#e2e2e2", fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{link.title}</div>
                <div style={{ color: "#555", fontSize: 13 }}>{link.desc}</div>
              </div>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#333", marginLeft: "auto", marginTop: 2, flexShrink: 0 }}>
                chevron_right
              </span>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 60, paddingTop: 24, borderTop: "1px solid #1f1f1f", color: "#444", fontSize: 12 }}>
          VikaFilms CMS · All changes are saved to the database and reflected on the live site.
        </div>
      </div>
    </AdminShell>
  );
}
