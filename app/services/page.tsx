import { getActiveServices, getProcessSteps } from "../lib/content";
import ServicesPageClient from "./ServicesPageClient";

export default async function ServicesPage() {
  const [services, processSteps] = await Promise.all([
    getActiveServices().catch(() => []),
    getProcessSteps().catch(() => []),
  ]);
  return <ServicesPageClient dbServices={services} dbSteps={processSteps} />;
}
