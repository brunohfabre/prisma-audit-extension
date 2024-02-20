import { FastifyInstance, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { prisma } from '../lib/prisma'
import { withQueryContext } from '../utils/with-query-context'

export async function deleteProject(app: FastifyInstance) {
  app.delete('/projects/:id', async (request: FastifyRequest) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const querySchema = z.object({
      userId: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)
    const { userId } = querySchema.parse(request.query)

    await prisma.project.delete(
      withQueryContext(
        {
          where: {
            id,
          },
        },
        { userId },
      ),
    )
  })
}
