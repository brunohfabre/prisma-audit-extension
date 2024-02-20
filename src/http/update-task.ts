import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../lib/prisma'
import { withQueryContext } from '../utils/with-query-context'

export async function updateTask(app: FastifyInstance) {
  app.put('/projects/:projectId/tasks/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const querySchema = z.object({
      userId: z.string().uuid(),
    })
    const bodySchema = z.object({
      name: z.string().optional(),
    })

    const { id } = paramsSchema.parse(request.params)
    const { userId } = querySchema.parse(request.query)
    const { name } = bodySchema.parse(request.body)

    await prisma.task.update(
      withQueryContext(
        {
          where: {
            id,
          },
          data: {
            name,
          },
        },
        { userId },
      ),
    )
  })
}
