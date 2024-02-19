import { PrismaClient } from '@prisma/client'

import { softDeleteExtension } from '../../prisma/extensions/soft-delete'

export const prisma = new PrismaClient({
  log: ['query'],
}).$extends(softDeleteExtension)
