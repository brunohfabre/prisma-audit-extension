import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../lib/prisma'

export async function fetchTasks(app: FastifyInstance) {
  app.get('/projects/:projectId/tasks', async (request) => {
    const paramsSchema = z.object({
      projectId: z.string().uuid(),
    })

    const { projectId } = paramsSchema.parse(request.params)

    const tasks = await prisma.task.findMany({
      where: {
        projectId,
      },
    })

    return { tasks }
  })
}
