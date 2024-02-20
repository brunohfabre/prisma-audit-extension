import { FastifyInstance, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { prisma } from '../lib/prisma'
import { withQueryContext } from '../utils/with-query-context'

export async function deleteTasks(app: FastifyInstance) {
  app.delete('/projects/:projectId/tasks', async (request: FastifyRequest) => {
    const paramsSchema = z.object({
      projectId: z.string().uuid(),
    })
    const querySchema = z.object({
      userId: z.string().uuid(),
    })
    const bodySchema = z.object({
      ids: z.array(z.string().uuid()),
    })

    const { projectId } = paramsSchema.parse(request.params)
    const { userId } = querySchema.parse(request.query)
    const { ids } = bodySchema.parse(request.body)

    await prisma.$transaction(async (tx) => {
      for (const id of ids) {
        await tx.task.delete(
          withQueryContext(
            {
              where: {
                id,
                projectId,
              },
            },
            { userId },
          ),
        )
      }
    })
  })
}
