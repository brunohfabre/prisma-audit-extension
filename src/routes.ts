import { FastifyInstance } from 'fastify'

import { createProject } from './http/create-project'
import { createTask } from './http/create-task'
import { createUser } from './http/create-user'
import { deleteProject } from './http/delete-project'
import { deleteTasks } from './http/delete-tasks'
import { fetchProjects } from './http/fetch-projects'
import { fetchTasks } from './http/fetch-tasks'
import { fetchUsers } from './http/fetch-users'
import { updateTask } from './http/update-task'

export async function appRoutes(app: FastifyInstance) {
  app.register(fetchUsers)
  app.register(createUser)

  app.register(fetchProjects)
  app.register(createProject)
  app.register(deleteProject)

  app.register(fetchTasks)
  app.register(createTask)
  app.register(updateTask)
  app.register(deleteTasks)
}
