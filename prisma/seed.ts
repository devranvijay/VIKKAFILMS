import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../app/generated/prisma/client";
import bcrypt from "bcryptjs";

const adapter = new PrismaLibSql({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // Admin user
  const adminUsername = process.env.ADMIN_USERNAME || "vikafilms_admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "VikaFilms@2024!";
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  await prisma.adminUser.upsert({
    where: { username: adminUsername },
    update: {},
    create: { username: adminUsername, password: hashedPassword },
  });
  console.log("✅ Admin user created:", adminUsername);

  // Site settings (singleton)
  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      heroTagline: "Vika Films",
      heroCta: "Let's Create ↗",
      heroCtaLink: "/contact",
      heroSubheading: "Campaigns That Moved Markets.",
      founderName: "Vivek Kamble",
      founderTitle: "Founder & Cinematographer, VIKA FILMS",
      founderBio1:
        "I create cinematic content for luxury hospitality brands, premium products, healthcare companies, and businesses looking to elevate their visual identity.",
      founderBio2:
        "My work focuses on combining storytelling, aesthetics, and commercial strategy to create films that leave a lasting impression.",
      founderAvatarUrl: "/vivek-kamble.png",
      availabilityText: "Available across India & International",
      ctaHeading: "Let's Build Something Iconic",
      ctaBtn1Text: "Book A Shoot",
      ctaBtn1Link: "/contact",
      ctaBtn2Text: "View Portfolio",
      ctaBtn2Link: "/portfolio",
      servicesEyebrow: "Vikka Films · Services",
      servicesHeading: "What We Do.",
      servicesSubtitle: "One studio. Every visual discipline.",
      contactEmail: "vikafilms15@gmail.com",
      contactWhatsapp: "+91 93099 06722",
      contactWhatsappLink: "https://wa.me/919309906722",
      contactLocation: "Mumbai, India",
      contactWhatsappMessage:
        "Hi VikaFilms! 👋 I'd like to inquire about a shoot. Could you share more details about your packages and availability?",
      instagramUrl:
        "https://www.instagram.com/vikafilms.in?igsh=MWkyc2hoMTBiM3VhMA%3D%3D&utm_source=qr",
      linkedinUrl:
        "https://www.linkedin.com/in/vivek-kamble-65a39b238?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      footerCopyright: "© 2024 VikaFilms. All Rights Reserved.",
      brandName: "VikaFilms",
      logoUrl: "/vikafilms-logo.png",
      seoTitle:
        "VikaFilms | Commercial Photography, Brand Films & Product Shoots",
      seoDescription:
        "Crafting visual stories that move people. VikaFilms is Mumbai's premium commercial photography and cinematography studio — specializing in brand films, automotive campaigns, product photography, drone cinematography, corporate portraits, and creative visual storytelling for brands across India.",
      seoKeywords:
        "vikafilms,VikaFilms Mumbai,photographer in mumbai,commercial photographer,cinematographer,product photographer,wedding photographer,mumbai,india,automotive,fashion,editorial,healthcare,vivek kamble photographer",
      seoCanonical: "https://www.vikafilms.com",
      estYear: "Est. 2022",
      websiteUrl: "https://www.vikafilms.com",
    },
  });
  console.log("✅ Site settings created");

  // Services
  await prisma.service.deleteMany();
  await prisma.service.createMany({
    data: [
      {
        number: "01",
        title: "Commercial & Product Stills",
        subtitle: "Photography",
        description:
          "Full-frame photography for automotive campaigns, product launches, editorial portraits, and brand identity.",
        tags: JSON.stringify(["Automotive", "Product", "Editorial", "E-Commerce"]),
        ctaText: "Book a Shoot",
        sortOrder: 1,
        active: true,
      },
      {
        number: "02",
        title: "Brand & Narrative Films",
        subtitle: "Cinematography",
        description:
          "Cinematic brand stories and product films — shot on cinema glass, graded in DaVinci Resolve, delivered in 4K.",
        tags: JSON.stringify(["Brand Films", "Product Cinematics", "Weddings", "Documentary"]),
        ctaText: "Commission a Film",
        sortOrder: 2,
        active: true,
      },
      {
        number: "03",
        title: "Reels & Platform Video",
        subtitle: "Social Content",
        description:
          "Short-form content optimised for Instagram, YouTube, and broadcast — reels, demos, testimonials.",
        tags: JSON.stringify(["Instagram Reels", "YouTube", "Product Demo", "Events"]),
        ctaText: "Start a Project",
        sortOrder: 3,
        active: true,
      },
      {
        number: "04",
        title: "Drone & Behind-the-Scenes",
        subtitle: "Aerial & BTS",
        description:
          "Licensed drone cinematography for aerial establishing shots, event coverage, and authentic BTS content.",
        tags: JSON.stringify(["Licensed Drone Ops", "Aerial", "Event Coverage", "BTS"]),
        ctaText: "Enquire Now",
        sortOrder: 4,
        active: true,
      },
    ],
  });
  console.log("✅ Services created");

  // Process steps
  await prisma.processStep.deleteMany();
  await prisma.processStep.createMany({
    data: [
      {
        number: "01",
        title: "Brief & Discovery",
        description:
          "We map your objectives, deliverables, and vision — no guesswork, just clarity before a single frame is shot.",
        sortOrder: 1,
      },
      {
        number: "02",
        title: "Production Day",
        description:
          "Cinema glass, professional lighting, a focused crew. Every detail is locked before we call action.",
        sortOrder: 2,
      },
      {
        number: "03",
        title: "Edit & Delivery",
        description:
          "DaVinci grading, motion graphics, colour-correct masters — optimised and delivered for every platform.",
        sortOrder: 3,
      },
    ],
  });
  console.log("✅ Process steps created");

  // Portfolio projects — BMW Z4
  const bmwImages = [
    { id: "DSC01488_qx6a1n", featured: true, sortOrder: 1 },
    { id: "DSC01456_ygk3gp", featured: false, sortOrder: 2 },
    { id: "DSC01395-Enhanced-NR_el2qlx", featured: false, sortOrder: 3 },
    { id: "DSC01346-Enhanced-NR_lf6bof", featured: false, sortOrder: 4 },
    { id: "DSC01326_fedjlf", featured: false, sortOrder: 5 },
    { id: "DSC01538_nj4cxb", featured: false, sortOrder: 6 },
    { id: "DSC01487_gybjpg", featured: false, sortOrder: 7 },
    { id: "DSC01458_a4sarj", featured: false, sortOrder: 8 },
    { id: "DSC01400_onzzlx", featured: false, sortOrder: 9 },
    { id: "DSC01390_ttilio", featured: false, sortOrder: 10 },
  ];

  const djiImages = [
    { id: "DSC09380_aonznj", featured: true, sortOrder: 1 },
    { id: "DSC09376_lygk5q", featured: false, sortOrder: 2 },
    { id: "DSC09383_sdvqan", featured: false, sortOrder: 3 },
    { id: "DSC09373_uxxdtu", featured: false, sortOrder: 4 },
    { id: "DSC09374_sxovrw", featured: false, sortOrder: 5 },
    { id: "DSC09378_ryczhm", featured: false, sortOrder: 6 },
  ];

  const cloudName = "deheutmgd";

  await prisma.project.deleteMany();

  for (const img of bmwImages) {
    await prisma.project.create({
      data: {
        title: "BMW Z4",
        category: "Commercial",
        subcategory: "Cars",
        client: "BMW India",
        year: "2024",
        description:
          "A cinematic exploration of speed, precision, and engineering excellence. Shot on full-frame 8K sensors with anamorphic glass to capture the raw soul of the machine in every frame.",
        cloudinaryId: img.id,
        cloudinaryUrl: `https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto/${img.id}`,
        tags: JSON.stringify(["8K Full-Frame", "Anamorphic Glass", "Studio Lighting"]),
        featured: img.featured,
        sortOrder: img.sortOrder,
        active: true,
      },
    });
  }

  for (const img of djiImages) {
    await prisma.project.create({
      data: {
        title: "DJI Gimbal",
        category: "Commercial",
        subcategory: "Products",
        client: "DJI India",
        year: "2024",
        description:
          "Precision meets artistry. A product cinematics campaign built around DJI's stabilisation technology — every angle crafted to reveal the engineering detail and tactile quality of the hardware.",
        cloudinaryId: img.id,
        cloudinaryUrl: `https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto/${img.id}`,
        tags: JSON.stringify(["Product Cinema", "Macro Detail", "Studio Light"]),
        featured: img.featured,
        sortOrder: img.sortOrder,
        active: true,
      },
    });
  }

  console.log("✅ Portfolio projects created (16 total)");
  console.log("\n🎉 Database seeded successfully!");
  console.log(`\n🔑 Admin login:`);
  console.log(`   Username: ${adminUsername}`);
  console.log(`   Password: ${adminPassword}`);
  console.log(`   URL: http://localhost:3000/admin`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
