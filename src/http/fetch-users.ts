import { FastifyInstance } from 'fastify'

import { prisma } from '../lib/prisma'

export async function fetchUsers(app: FastifyInstance) {
  app.get('/users', async () => {
    const users = await prisma.user.findMany()

    return { users }
  })
}
