import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAuthenticatedUser } from "#/features/auth/auth.middleware";
import { createBusiness as createBusinessServer } from "./business.server";

// TODO: add validation for phone number and NIP (Polish tax identification number)

export const createBusiness = createServerFn({ method: 'POST' })
  .middleware([requireAuthenticatedUser])
  .inputValidator(z.object({
    name: z.string().min(1, "Name is required"),
    address: z.string().min(1, "Address is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    nip: z.string().min(1, "NIP is required"),
    email: z.email("Invalid email format").min(1, "Email is required"),
    description: z.string().optional(),
    image: z.string().optional(),
  }))
  .handler(async ({ context, data }) => {
    const userId = context.user.id;

    const result = await createBusinessServer(
      {
        ...data,
        description: data.description ?? null,
        image: data.image ?? null,
      },
      userId,
    );

    return result;
})