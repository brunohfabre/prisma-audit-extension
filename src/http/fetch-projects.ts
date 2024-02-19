import { FastifyInstance } from 'fastify'

import { prisma } from '../lib/prisma'

export async function fetchProjects(app: FastifyInstance) {
  app.get('/projects', async () => {
    const projects = await prisma.project.findMany({
      include: {
        tasks: true,
        members: true,
      },
    })

    return { projects }
  })
}
