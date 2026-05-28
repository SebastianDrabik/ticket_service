import { betterAuth } from 'better-auth'
import { minLength, z } from 'zod'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from '#/db';
import * as schema from '#/db/auth-schema.ts';
import { isValidPhoneNumber } from 'libphonenumber-js'

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
  user: {
    additionalFields: {
      surname: {
        type: "string",
        required: true,
      },
      dateOfBirth: {
        type: "date",
        required: true,
      },
      phoneNumber: {
        type: "string",
        required: false,
        validator: {
          input: z.string().refine(
            val => isValidPhoneNumber(val),
            "Invalid phone number"
          ).optional(),
        }
      },
    },
    password: {
      minLength: 8,
    }
  }
})
