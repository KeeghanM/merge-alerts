import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'

export const usersTable = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
})

export const alertsTable = sqliteTable('alerts', {
  id: text('id').primaryKey(),
  userId: integer('userId')
    .notNull()
    .references(() => usersTable.id),
  fieldStructure: text('fieldStructure').notNull(),
  template: text('template').notNull(),
})

export type InsertUser = typeof usersTable.$inferInsert
export type SelectUser = typeof usersTable.$inferSelect

export type InsertAlert = typeof alertsTable.$inferInsert
export type SelectAlert = typeof alertsTable.$inferSelect
