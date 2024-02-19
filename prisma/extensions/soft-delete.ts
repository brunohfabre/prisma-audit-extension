import { Prisma } from '@prisma/client'

export const softDeleteExtension = Prisma.defineExtension((client) => {
  return client.$extends({
    name: 'soft-delete',
    model: {
      $allModels: {
        delete<T>(
          this: T,
          args: Prisma.Args<T, 'delete'> & {
            userId: string
          },
        ) {},
      },
    },
    // query: {
    //   $allModels: {
    //     async findFirst({ args, query }) {
    //       args.where = {
    //         ...args.where,
    //         deletedAt: null,
    //       }

    //       return query(args)
    //     },

    //     async findUnique({ args, query }) {
    //       args.where = {
    //         ...args.where,
    //         deletedAt: null,
    //       }

    //       return query(args)
    //     },

    //     async findMany({ args, query }) {
    //       args.where = {
    //         ...args.where,
    //         deletedAt: null,
    //       }

    //       return query(args)
    //     },

    //     async create({ model, args, operation }) {
    //       const result = client.$transaction(async (tx) => {
    //         const queryResult = await tx[model][operation](args)

    //         await tx.audit.create({
    //           data: { model, operation, data: queryResult, userId: 'user-id' },
    //         })

    //         return queryResult
    //       })

    //       return result
    //     },

    //     async createMany({ model, args, operation }) {
    //       const result = client.$transaction(async (tx) => {
    //         const queryResult = await tx[model][operation](args)

    //         await tx.audit.create({
    //           data: { model, operation, data: queryResult, userId: 'user-id' },
    //         })

    //         return queryResult
    //       })

    //       return result
    //     },

    //     async update({ model, args, operation }) {
    //       const result = client.$transaction(async (tx) => {
    //         const queryResult = await tx[model][operation](args)

    //         await tx.audit.create({
    //           data: { model, operation, data: queryResult, userId: 'user-id' },
    //         })

    //         return queryResult
    //       })

    //       return result
    //     },

    //     async updateMany({ model, args, operation }) {
    //       const result = client.$transaction(async (tx) => {
    //         const queryResult = await tx[model][operation](args)

    //         await tx.audit.create({
    //           data: { model, operation, data: queryResult, userId: 'user-id' },
    //         })

    //         return queryResult
    //       })

    //       return result
    //     },

    //     async delete({ model, args, operation }) {
    //       const result = await client.$transaction(async (tx) => {
    //         const queryResult = await tx[model].updateMany({
    //           where: args.where,
    //           data: {
    //             deletedAt: new Date(),
    //           },
    //         })

    //         await tx.audit.create({
    //           data: { model, operation, data: args.where, userId: 'user-id' },
    //         })

    //         return queryResult
    //       })

    //       return result
    //     },

    //     // async deleteMany({ model, args, operation }) {
    //     //   const result = await client.$transaction(async (tx) => {
    //     //     const queryResult = await tx[model].updateMany({
    //     //       where: args.where,
    //     //       data: {
    //     //         deletedAt: new Date(),
    //     //       },
    //     //     })

    //     //     await tx.audit.create({
    //     //       data: { model, operation, args, result: queryResult },
    //     //     })

    //     //     return queryResult
    //     //   })

    //     //   return result
    //     // },
    //   },
    // },
  })
})

// .$extends({
//   query: {
//     $allModels: {
//       async delete({ model, args }) {
//         const result = await prisma[model].update({
//           where: args.where,
//           data: {
//             deletedAt: new Date(),
//           },
//         })

//         console.log('DELETE_METHOD', JSON.stringify(result, null, 2))

//         return result
//       },

//       async deleteMany({ model, args }) {
//         console.log(args)

//         const result = await prisma[model].updateMany({
//           where: args.where,
//           data: {
//             deletedAt: new Date(),
//           },
//         })

//         console.log('DELETE_MANY_METHOD', JSON.stringify(result, null, 2))

//         return result
//       },
//     },
//   },
// })
