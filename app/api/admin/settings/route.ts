import { NextRequest } from "next/server";
import { verifySession } from "@/app/lib/dal";
import prisma from "@/app/lib/db";
import { revalidatePath } from "next/cache";

export async function GET() {
  await verifySession();
  const settings = await prisma.siteSettings.findUnique({ where: { id: "main" } });
  return Response.json(settings);
}

export async function PUT(req: NextRequest) {
  await verifySession();
  const data = await req.json();
  // Remove id and updatedAt from data — these are managed by Prisma
  const { id: _id, updatedAt: _u, ...updateData } = data;
  const settings = await prisma.siteSettings.update({
    where: { id: "main" },
    data: updateData,
  });
  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/services");
  revalidatePath("/contact");
  return Response.json(settings);
}
