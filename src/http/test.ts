import { prisma } from '../lib/prisma'

export async function test() {
  const result = await prisma.task.delete({})
}
