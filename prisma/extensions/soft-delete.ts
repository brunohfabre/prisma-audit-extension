// import { randomUUID } from 'crypto'

import { randomUUID } from 'crypto'

import { Prisma } from '@prisma/client'

import { redis } from '../../src/lib/redis'

export const softDeleteExtension = Prisma.defineExtension((client) => {
  return client.$extends({
    name: 'prisma-extension-soft-delete-audit',
    query: {
      $allModels: {
        async $allOperations(props) {
          const { model, operation, args, query } = props as {
            model: Prisma.ModelName
            operation: any
            args: Record<string, any>
            query: (data: any) => Promise<any>
          }
          const { __queryContext, ...restArgs } = args

          if (['delete', 'deleteMany'].includes(operation)) {
            const result = await client[model].update({
              where: restArgs.where,
              data: {
                deletedAt: new Date(),
              },
            })

            if (__queryContext?.userId) {
              redis.set(
                randomUUID(),
                JSON.stringify({
                  args,
                  userId: __queryContext.userId,
                  data: result,
                  createdAt: new Date(),
                  operation,
                  model,
                }),
              )
            }

            return result
          }

          const result = await query(restArgs)

          if (__queryContext?.userId) {
            redis.set(
              randomUUID(),
              JSON.stringify({
                args,
                userId: __queryContext.userId,
                data: result,
                createdAt: new Date(),
                operation,
                model,
              }),
            )
          }

          return result
        },
      },
    },
  })
})
