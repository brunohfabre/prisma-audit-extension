import fastify from 'fastify'

import { appRoutes } from './routes'

const app = fastify()

app.register(appRoutes)

// app.addHook('onResponse', async (request, reply) => {
//   console.log('RESPONSE', {
//     route: request.routeOptions,
//     statusCode: reply.statusCode,
//     elapsedTime: reply.elapsedTime,
//   })
// })

// app.addHook('onTimeout', async (request, reply) => {
//   console.log('TIMEOUT', {
//     route: request.routeOptions,
//     statusCode: reply.statusCode,
//     elapsedTime: reply.elapsedTime,
//   })
// })

app
  .listen({
    host: '0.0.0.0',
    port: 3333,
  })
  .then(() => console.log('Server running on port 3333!'))
