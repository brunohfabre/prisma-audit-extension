import { FastifyInstance, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { prisma } from '../lib/prisma'

export async function deleteTasks(app: FastifyInstance) {
  app.delete('/projects/:projectId/tasks', async (request: FastifyRequest) => {
    const paramsSchema = z.object({
      projectId: z.string().uuid(),
    })
    const bodySchema = z.object({
      ids: z.array(z.string().uuid()),
    })

    const { projectId } = paramsSchema.parse(request.params)
    const { ids } = bodySchema.parse(request.body)

    await prisma.$transaction(
      ids.map((id) =>
        prisma.task.delete({
          where: {
            id,
            projectId,
          },
        }),
      ),
    )
  })
}
