import { NextRequest } from "next/server";
import { verifySession } from "@/app/lib/dal";
import prisma from "@/app/lib/db";
import { revalidatePath } from "next/cache";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  await verifySession();
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id: Number(id) } });
  if (!project) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(project);
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  await verifySession();
  const { id } = await params;
  const data = await req.json();
  const { id: _id, createdAt: _c, updatedAt: _u, ...updateData } = data;
  const project = await prisma.project.update({ where: { id: Number(id) }, data: updateData });
  revalidatePath("/portfolio");
  return Response.json(project);
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  await verifySession();
  const { id } = await params;
  await prisma.project.delete({ where: { id: Number(id) } });
  revalidatePath("/portfolio");
  return Response.json({ success: true });
}
