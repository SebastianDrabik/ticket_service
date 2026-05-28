import { betterAuth } from 'better-auth'
import { z } from 'zod'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { getRequest } from '@tanstack/react-start/server'
import { db } from '#/db';
import * as schema from '#/features/auth/auth.schema';
import { isValidPhoneNumber } from 'libphonenumber-js'
import { authClient } from './auth-client'

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

export async function getSession() {
  const request = getRequest()
  const { data } = await authClient.getSession({
    fetchOptions: {
      cache: 'no-store',
      headers: request?.headers,
    },
  })

  return data
}
