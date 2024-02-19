import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../lib/prisma'

export async function createUser(app: FastifyInstance) {
  app.post('/users', async (request) => {
    const bodySchema = z.object({
      name: z.string().min(1),
      email: z.string().email(),
    })

    const { name, email } = bodySchema.parse(request.body)

    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    })

    return { user }
  })
}
