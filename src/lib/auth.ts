import { betterAuth } from 'better-auth'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from '#/db';
import * as schema from '#/db/auth-schema.ts';

export const auth = betterAuth({
  rateLimit: {
    window: 10,
    max: 100
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [tanstackStartCookies()],
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema
  }),
})
