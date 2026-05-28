import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeErrors(errors: unknown[]) {
  return errors
    .map((error) => {
      if (typeof error === 'string') {
        return { message: error }
      }

      if (error && typeof error === 'object' && 'message' in error) {
        return { message: String((error as { message?: unknown }).message ?? '') }
      }

      return { message: String(error) }
    })
    .filter((error) => error.message)
}
