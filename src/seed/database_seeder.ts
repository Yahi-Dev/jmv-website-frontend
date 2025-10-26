// src/seed/database_seeder.ts

import { PrismaClient } from "@prisma/client";
import { seedUsers } from "./users";

async function runSeeders() {
  console.log("🌱 Starting database seeding...");
  const prisma = new PrismaClient();
  try {
    await seedUsers(prisma);
    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("💥 Database seeding failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runSeeders();