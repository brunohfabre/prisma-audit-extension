import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../lib/prisma'

export async function updateTask(app: FastifyInstance) {
  app.put('/projects/:projectId/tasks/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const bodySchema = z.object({
      name: z.string().optional(),
    })

    const { id } = paramsSchema.parse(request.params)
    const { name } = bodySchema.parse(request.body)

    await prisma.task.update({
      where: {
        id,
      },
      data: {
        name,
      },
    })
  })
}
