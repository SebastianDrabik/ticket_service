import { db } from '../../db'
import { and, eq } from 'drizzle-orm'
import { businesses, businessMembers } from './business.schema'
import type { BusinessRole } from './business.permissions.server'

type Business = typeof businesses.$inferSelect
type DbResponse = { success: boolean, message?: string }

export async function createBusiness(business: Omit<Business, 'id' | 'verification'>, userId: string): Promise<DbResponse> {
  if(await hasBusiness(userId)) {
    return { success: false, message: 'User already has a business' }
  }

  const bRes = await db.insert(businesses).values({
    name: business.name,
    address: business.address,
    phoneNumber: business.phoneNumber,
    nip: business.nip,
    email: business.email,
    description: business.description,
    image: business.image,
  }).returning({ id: businesses.id })

  if (bRes.length === 0) {
    return { success: false, message: 'Failed to create business' }
  }

  const bMemRes = await db.insert(businessMembers).values({
    business_id: bRes[0].id,
    user_id: userId,
    role: 'owner'
  })

  if (bMemRes.rowCount === 0) {
    return { success: false, message: 'Failed to add business owner' }
  }

  return { success: true } 
}

export async function hasBusiness(userId: string) {
  const res = await db.select().from(businessMembers).where(eq(businessMembers.user_id, userId))
  return res.length > 0
}

export async function getBusinessMembers(businessId: number) {
  const res = await db.select().from(businessMembers).where(eq(businessMembers.business_id, businessId))
  return res
}

export async function getBusinessById(businessId: number) {
  const res = await db.select().from(businesses).where(eq(businesses.id, businessId))
  return res[0]
}

export async function getBusinessByUserId(userId: string) {
  const res = await db.select().from(businesses).innerJoin(businessMembers, eq(businessMembers.business_id, businesses.id)).where(eq(businessMembers.user_id, userId))

  if (res.length === 0) {
    return null
  }

  return res[0]
}

export async function getMemberRole(businessId: number, userId: string) {
  const res = await db.select().from(businessMembers).where(and(eq(businessMembers.business_id, businessId), eq(businessMembers.user_id, userId)))
  return res[0]?.role
}

export async function addBusinessMember(businessId: number, userId: string, role: BusinessRole) {
  const res = await db.insert(businessMembers).values({
    business_id: businessId,
    user_id: userId,
    role,
  })

  return (res.rowCount ?? 0) > 0
}

export async function removeBusinessMember(businessId: number, userId: string) {
  const res = await db.delete(businessMembers).where(and(eq(businessMembers.business_id, businessId), eq(businessMembers.user_id, userId)))

  return (res.rowCount ?? 0) > 0
}