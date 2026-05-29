import { createMiddleware } from "@tanstack/react-start";
import { getSession } from "#/features/auth/auth.server";
import { getBusinessByUserId, getMemberRole } from "./business.server";
import type { BUSINESS_ROLES } from './business.schema'

export type BusinessRole = (typeof BUSINESS_ROLES)[number]

type Resource = 'event' | 'management'

const roleAllowedResources: Record<BusinessRole, Record<Resource, boolean>> = {
  owner: {
    event: true,
    management: true,
  },
  manager: {
    event: true,
    management: false,
  },
  member: {
    event: false,
    management: false,
  },
}

export function can(role: BusinessRole, resource: Resource): boolean {
  return roleAllowedResources[role][resource] || false;
}

export function requireBusinessPermission(resource: Resource) {
  return createMiddleware({ type: 'function' }).server(async ({ next }) => {
    const session = await getSession()

    if (!session?.user) {
      throw new Error('Unauthorized')
    }

    const user = session.user
    const userBusiness = await getBusinessByUserId(user.id)

    if (!userBusiness) {
      throw new Error('User does not belong to any business')
    }

    const userRole = await getMemberRole(userBusiness.businesses.id, user.id)

    if (!can(userRole, resource)) {
      throw new Error('Forbidden')
    }

    return next({
      context: {
        business: userBusiness.businesses,
        businessRole: userRole,
        resource,
      },
    })
  })
}

export const requireBusinessBelonging = createMiddleware({ type: 'function' }).server(async ({ next }) => {
  const session = await getSession()

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const user = session.user
  const userBusiness = await getBusinessByUserId(user.id)

  if (!userBusiness) {
    throw new Error('User does not belong to any business')
  }

  return next({
    context: {
      business: userBusiness.businesses,
    },
  })
})