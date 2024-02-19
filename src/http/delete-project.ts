import { FastifyInstance, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { prisma } from '../lib/prisma'

export async function deleteProject(app: FastifyInstance) {
  app.delete('/projects/:id', async (request: FastifyRequest) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    await prisma.project.delete({
      where: {
        id,
      },
    })
  })
}
