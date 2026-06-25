import { NextRequest } from "next/server";
import { verifySession } from "@/app/lib/dal";
import prisma from "@/app/lib/db";
import { revalidatePath } from "next/cache";

export async function GET() {
  await verifySession();
  const projects = await prisma.project.findMany({ orderBy: [{ category: "asc" }, { sortOrder: "asc" }] });
  return Response.json(projects);
}

export async function POST(req: NextRequest) {
  await verifySession();
  const data = await req.json();
  const project = await prisma.project.create({ data });
  revalidatePath("/portfolio");
  return Response.json(project, { status: 201 });
}
