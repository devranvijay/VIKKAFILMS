import { NextRequest } from "next/server";
import { verifySession } from "@/app/lib/dal";
import prisma from "@/app/lib/db";
import { revalidatePath } from "next/cache";

export async function GET() {
  await verifySession();
  const steps = await prisma.processStep.findMany({ orderBy: { sortOrder: "asc" } });
  return Response.json(steps);
}

export async function PUT(req: NextRequest) {
  await verifySession();
  const steps: Array<Record<string, unknown>> = await req.json();
  await Promise.all(
    steps.map((s) => {
      const { id, updatedAt: _u, ...data } = s as { id: number; updatedAt?: unknown } & Record<string, unknown>;
      return prisma.processStep.update({ where: { id }, data });
    })
  );
  revalidatePath("/services");
  const updated = await prisma.processStep.findMany({ orderBy: { sortOrder: "asc" } });
  return Response.json(updated);
}
