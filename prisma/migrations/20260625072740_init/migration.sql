-- CreateTable
CREATE TABLE "AdminUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'main',
    "heroTagline" TEXT NOT NULL DEFAULT 'Vika Films',
    "heroCta" TEXT NOT NULL DEFAULT 'Let''s Create ↗',
    "heroCtaLink" TEXT NOT NULL DEFAULT '/contact',
    "heroSubheading" TEXT NOT NULL DEFAULT 'Campaigns That Moved Markets.',
    "founderName" TEXT NOT NULL DEFAULT 'Vivek Kamble',
    "founderTitle" TEXT NOT NULL DEFAULT 'Founder & Cinematographer, VIKA FILMS',
    "founderBio1" TEXT NOT NULL DEFAULT 'I create cinematic content for luxury hospitality brands, premium products, healthcare companies, and businesses looking to elevate their visual identity.',
    "founderBio2" TEXT NOT NULL DEFAULT 'My work focuses on combining storytelling, aesthetics, and commercial strategy to create films that leave a lasting impression.',
    "founderAvatarUrl" TEXT NOT NULL DEFAULT '/vivek-kamble.png',
    "availabilityText" TEXT NOT NULL DEFAULT 'Available across India & International',
    "ctaHeading" TEXT NOT NULL DEFAULT 'Let''s Build Something Iconic',
    "ctaBtn1Text" TEXT NOT NULL DEFAULT 'Book A Shoot',
    "ctaBtn1Link" TEXT NOT NULL DEFAULT '/contact',
    "ctaBtn2Text" TEXT NOT NULL DEFAULT 'View Portfolio',
    "ctaBtn2Link" TEXT NOT NULL DEFAULT '/portfolio',
    "servicesEyebrow" TEXT NOT NULL DEFAULT 'Vikka Films · Services',
    "servicesHeading" TEXT NOT NULL DEFAULT 'What We Do.',
    "servicesSubtitle" TEXT NOT NULL DEFAULT 'One studio. Every visual discipline.',
    "contactEmail" TEXT NOT NULL DEFAULT 'vikafilms15@gmail.com',
    "contactWhatsapp" TEXT NOT NULL DEFAULT '+91 93099 06722',
    "contactWhatsappLink" TEXT NOT NULL DEFAULT 'https://wa.me/919309906722',
    "contactLocation" TEXT NOT NULL DEFAULT 'Mumbai, India',
    "contactWhatsappMessage" TEXT NOT NULL DEFAULT 'Hi VikaFilms! 👋 I''d like to inquire about a shoot. Could you share more details about your packages and availability?',
    "instagramUrl" TEXT NOT NULL DEFAULT 'https://www.instagram.com/vikafilms.in',
    "linkedinUrl" TEXT NOT NULL DEFAULT 'https://www.linkedin.com/in/vivek-kamble-65a39b238',
    "footerCopyright" TEXT NOT NULL DEFAULT '© 2024 VikaFilms. All Rights Reserved.',
    "brandName" TEXT NOT NULL DEFAULT 'VikaFilms',
    "logoUrl" TEXT NOT NULL DEFAULT '/vikafilms-logo.png',
    "seoTitle" TEXT NOT NULL DEFAULT 'VikaFilms | Commercial Photography, Brand Films & Product Shoots',
    "seoDescription" TEXT NOT NULL DEFAULT 'Crafting visual stories that move people. VikaFilms is Mumbai''s premium commercial photography and cinematography studio — specializing in brand films, automotive campaigns, product photography, drone cinematography, corporate portraits, and creative visual storytelling for brands across India.',
    "seoKeywords" TEXT NOT NULL DEFAULT 'vikafilms,VikaFilms Mumbai,photographer in mumbai,commercial photographer,cinematographer,product photographer,wedding photographer,mumbai,india',
    "seoCanonical" TEXT NOT NULL DEFAULT 'https://www.vikafilms.com',
    "estYear" TEXT NOT NULL DEFAULT 'Est. 2022',
    "websiteUrl" TEXT NOT NULL DEFAULT 'https://www.vikafilms.com',
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL DEFAULT '',
    "client" TEXT NOT NULL DEFAULT '',
    "year" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "cloudinaryId" TEXT NOT NULL,
    "cloudinaryUrl" TEXT NOT NULL DEFAULT '',
    "tags" TEXT NOT NULL DEFAULT '[]',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Service" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL,
    "tags" TEXT NOT NULL DEFAULT '[]',
    "ctaText" TEXT NOT NULL DEFAULT '',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ProcessStep" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_username_key" ON "AdminUser"("username");
