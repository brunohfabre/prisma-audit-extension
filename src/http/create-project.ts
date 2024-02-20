import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../lib/prisma'
import { withQueryContext } from '../utils/with-query-context'

export async function createProject(app: FastifyInstance) {
  app.post('/projects', async (request) => {
    const querySchema = z.object({
      userId: z.string().uuid(),
    })
    const bodySchema = z.object({
      name: z.string().min(1),
    })

    const { userId } = querySchema.parse(request.query)
    const { name } = bodySchema.parse(request.body)

    const project = await prisma.project.create(
      withQueryContext(
        {
          data: {
            name,
            members: {
              create: {
                role: 'OWNER',
                userId,
              },
            },
          },
        },
        { userId },
      ),
    )

    return { project }
  })
}
