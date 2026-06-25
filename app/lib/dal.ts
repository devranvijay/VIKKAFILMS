import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt } from "./session";
import prisma from "./db";

export const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  const session = await decrypt(token);
  if (!session?.userId) {
    redirect("/admin/login");
  }
  return { isAuth: true, userId: session.userId };
});

export const getAdminUser = cache(async () => {
  const session = await verifySession();
  return prisma.adminUser.findUnique({
    where: { id: session.userId },
    select: { id: true, username: true },
  });
});
