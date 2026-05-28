import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

import { user } from '../auth/auth.schema'
import { businesses } from '../business/business.schema'

export const events = pgTable('events', {
  id: serial().primaryKey(),
  name: text().notNull(),
  description: text(),
  image: text(),
  start_time: timestamp().notNull(),
  end_time: timestamp().notNull(),
  organizer: serial().references(() => businesses.id).notNull(),
  createdBy: text().references(() => user.id).notNull(),
})

export const eventTypes = pgTable('event_types', {
  id: serial().primaryKey(),
  name: text().notNull(),
  description: text(),
})

export const eventEventType = pgTable('event_event_type', {
  event_id: serial().references(() => events.id),
  event_type_id: serial().references(() => eventTypes.id),
})

export const eventTickets = pgTable('event_tickets', {
  id: serial().primaryKey(),
  event_id: serial().references(() => events.id).notNull(),
  user_id: text().references(() => user.id).notNull(),
  quantity: serial().notNull(),
})