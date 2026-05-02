import z, { ZodError } from "zod"

export function formatError<T, K>(error: ZodError<K>): T {
  const tree = z.treeifyError(error)

  if (!('properties' in tree && tree.properties)) {
    return {} as T
  }

  return formatProperties(tree.properties) as T
}

function formatProperties(properties: Record<string, { errors: string[]; properties?: any } | undefined>) {
  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(properties)) {
    if (!value) continue

    // If the property has nested properties, recurse
    if (value.properties) {
      result[key] = formatProperties(value.properties)
    } else if (value.errors.length) {
      result[key] = value.errors[0] // just take the first error
    }
  }

  return result
}


export function formatPrice(price: string) {
  return `₦${Number(price).toLocaleString("en-US")}`
}


export const formatDate = (date: Date | string) => {
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj.toDateString();
};