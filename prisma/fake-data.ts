import Decimal from 'decimal.js'

import { faker } from '@faker-js/faker'
import { Role } from '@prisma/client'

export function fakeUser() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    deletedAt: undefined,
  }
}
export function fakeUserComplete() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: undefined,
  }
}
export function fakeProject() {
  return {
    name: faker.person.fullName(),
    deletedAt: undefined,
  }
}
export function fakeProjectComplete() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: undefined,
  }
}
export function fakeMember() {
  return {
    role: faker.helpers.arrayElement([
      Role.OWNER,
      Role.ADMIN,
      Role.VIWER,
    ] as const),
    deletedAt: undefined,
  }
}
export function fakeMemberComplete() {
  return {
    id: faker.string.uuid(),
    role: faker.helpers.arrayElement([
      Role.OWNER,
      Role.ADMIN,
      Role.VIWER,
    ] as const),
    userId: faker.string.uuid(),
    projectId: faker.string.uuid(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: undefined,
  }
}
export function fakeTask() {
  return {
    name: faker.person.fullName(),
    doneAt: undefined,
    deletedAt: undefined,
  }
}
export function fakeTaskComplete() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    doneAt: undefined,
    projectId: faker.string.uuid(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: undefined,
  }
}
