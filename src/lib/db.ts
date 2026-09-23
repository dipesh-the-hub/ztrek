import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

export const USE_DB = Boolean(process.env.DATABASE_URL);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createClient() {
  // Small pool: this runs once per Next.js build worker / serverless
  // invocation, so a large default pool (pg's default max is 10) can
  // exhaust a free-tier database's connection limit under concurrency.
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    idleTimeoutMillis: 1000,
    connectionTimeoutMillis: 10000,
  });
  return new PrismaClient({ adapter });
}

export const prisma =
  globalForPrisma.prisma ?? (USE_DB ? createClient() : (undefined as unknown as PrismaClient));

if (process.env.NODE_ENV !== "production" && USE_DB) {
  globalForPrisma.prisma = prisma;
}
