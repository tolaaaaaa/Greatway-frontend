export type Result<T> = {
  code: number
  message: string
  data: T
}

/**
 * Creates a successful result object
 */
export const createSuccess = <T>(data: T, code: number = 200): Result<T> => ({
  code,
  message: "",
  data,
})

/**
 * Creates a failure result object
 */
export const createFailure = <T = void>(error: unknown): Result<T> => {
  const err = error as {
    status?: number
    error?: string
    message?: string
    detail?: string
  }

  return {
    code: err.status || 500,
    message: err.message || err.error || err.detail || "An Error Occurred",
    data: {} as T,
  }
}

/**
 * Helper to safely catch errors in async functions
 * Returns a tuple: [Error | undefined, Data | undefined]
 */
export async function catchError<T>(promise: Promise<T>): Promise<[Error | undefined, T | undefined]> {
  try {
    const data = await promise
    return [undefined, data]
  } catch (err: unknown) {
    const error = err as Error
    return [error, undefined]
  }
}