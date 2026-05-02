import 'server-only'
import { ApiClient } from './api'
import { cookies } from 'next/headers'
import { FetchOptions } from '@/types'
import { getAccessToken } from '@/lib/session'

async function withServerHeaders(headers: HeadersInit = {}): Promise<HeadersInit> {
  const cookieStore = await cookies()
  const cookieString = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ')

  // Get access token from session and attach as Bearer
  const accessToken = await getAccessToken()

  return {
    ...headers,
    ...(cookieString ? { cookie: cookieString } : {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  }
}

export const ServerApiClient = {
  async get<T>(endpoint: string, options?: Omit<FetchOptions, 'body'>) {
    return ApiClient.get<T>(endpoint, {
      ...options,
      headers: await withServerHeaders(options?.headers),
    })
  },

  async post<T>(endpoint: string, payload: unknown, options?: Omit<FetchOptions, 'body'>) {
    return ApiClient.post<T>(endpoint, payload, {
      ...options,
      headers: await withServerHeaders(options?.headers),
    })
  },

  async put<T>(endpoint: string, payload: unknown, options?: Omit<FetchOptions, 'body'>) {
    return ApiClient.put<T>(endpoint, payload, {
      ...options,
      headers: await withServerHeaders(options?.headers),
    })
  },

  async patch<T>(endpoint: string, payload: unknown, options?: Omit<FetchOptions, 'body'>) {
    return ApiClient.patch<T>(endpoint, payload, {
      ...options,
      headers: await withServerHeaders(options?.headers),
    })
  },

  async delete<T>(endpoint: string, options?: FetchOptions) {
    return ApiClient.delete<T>(endpoint, {
      ...options,
      headers: await withServerHeaders(options?.headers),
    })
  },
}