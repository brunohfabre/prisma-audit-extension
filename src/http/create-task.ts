import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '../lib/prisma'

// const delay = (delayInms) => {
//   return new Promise((resolve) => setTimeout(resolve, delayInms))
// }

export async function createTask(app: FastifyInstance) {
  app.post('/projects/:projectId/tasks', async (request, reply) => {
    const paramsSchema = z.object({
      projectId: z.string().uuid(),
    })
    const bodySchema = z.object({
      name: z.string().min(1),
    })

    const { projectId } = paramsSchema.parse(request.params)
    const { name } = bodySchema.parse(request.body)

    const findProject = await prisma.project.findFirst({
      where: {
        id: projectId,
      },
    })

    if (!findProject) {
      return reply.status(400).send({ message: 'Project not found' })
    }

    const task = await prisma.task.create({
      data: {
        name,
        projectId,
      },
    })

    return {
      task,
    }
  })
}
