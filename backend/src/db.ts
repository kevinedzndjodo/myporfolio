import { PrismaClient } from '@prisma/client'

function createClient() {
  const client = new PrismaClient()
  return client
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma = globalForPrisma.prisma ?? createClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
