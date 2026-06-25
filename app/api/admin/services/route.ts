import { NextRequest } from "next/server";
import { verifySession } from "@/app/lib/dal";
import prisma from "@/app/lib/db";
import { revalidatePath } from "next/cache";

export async function GET() {
  await verifySession();
  const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
  return Response.json(services);
}

export async function PUT(req: NextRequest) {
  await verifySession();
  const services: Array<Record<string, unknown>> = await req.json();
  await Promise.all(
    services.map((s) => {
      const { id, updatedAt: _u, ...data } = s as { id: number; updatedAt?: unknown } & Record<string, unknown>;
      return prisma.service.update({ where: { id }, data });
    })
  );
  revalidatePath("/services");
  const updated = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
  return Response.json(updated);
}
