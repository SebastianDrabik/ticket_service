import { boolean, pgEnum, pgTable, serial, text } from 'drizzle-orm/pg-core'

import { user } from '../auth/auth.schema'

export const BUSINESS_ROLES = [
  'owner',
  'manager',
  'member',
] as const

export const BusinessRole = pgEnum('business_role', BUSINESS_ROLES )

export const businesses = pgTable('businesses', {
  id: serial().primaryKey(),
  name: text().notNull(),
  address: text().notNull(),
  phoneNumber: text().notNull(),
  nip: text().notNull(),
  email: text().notNull(),
  description: text(),
  image: text(),
  verification: boolean().notNull().default(false),
})

export const businessMembers = pgTable('business_members', {
  business_id: serial().references(() => businesses.id),
  user_id: text().references(() => user.id),
  role: BusinessRole().notNull(),
})