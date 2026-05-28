import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const events = pgTable('events', {
  id: serial().primaryKey(),
  name: text().notNull(),
  description: text(),
  start_time: timestamp().notNull(),
  end_time: timestamp().notNull(),
})

