import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";
import AdminSidebar from "./components/AdminSidebar";

export const metadata = { title: "VikaFilms CMS" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Login page doesn't need the sidebar layout
  return <>{children}</>;
}
