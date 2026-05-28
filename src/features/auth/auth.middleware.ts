import { createMiddleware } from '@tanstack/react-start'
import { getSession } from './auth.server'

export const requireAuthenticatedUser = createMiddleware({ type: 'function' }).server(async ({ next }) => {
  const session = await getSession()

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  return next({
    context: {
      session,
      user: session.user,
    },
  })
})