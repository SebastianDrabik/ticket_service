import { betterAuth } from 'better-auth'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from '#/db';
import schema from '#/db/schema';

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  plugins: [tanstackStartCookies()],
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema
  }),
})
