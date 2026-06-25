import "server-only";
import prisma from "./db";

export async function getSiteSettings() {
  let settings = await prisma.siteSettings.findUnique({ where: { id: "main" } });
  if (!settings) {
    // Auto-create defaults if seeder hasn't run yet
    settings = await prisma.siteSettings.create({ data: { id: "main" } });
  }
  return settings;
}

export async function getActiveProjects() {
  return prisma.project.findMany({
    where: { active: true },
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });
}

export async function getActiveServices() {
  return prisma.service.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getProcessSteps() {
  return prisma.processStep.findMany({
    orderBy: { sortOrder: "asc" },
  });
}
