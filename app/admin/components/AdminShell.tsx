"use client";

import AdminSidebar from "./AdminSidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0e0e0e",
        fontFamily: "var(--font-hanken, system-ui, sans-serif)",
      }}
    >
      <AdminSidebar />
      <main
        style={{
          flex: 1,
          marginLeft: 240,
          padding: "40px",
          maxWidth: "calc(100vw - 240px)",
          overflowX: "hidden",
        }}
      >
        {children}
      </main>
    </div>
  );
}
