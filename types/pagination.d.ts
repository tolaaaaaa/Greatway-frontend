interface Pagination<T> {
  items: T[]
  metadata: PaginationMetadata
}

type PaginationMetadata = {
  total: number
    page: number
    limit: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
}

type PaginationOptions<T> = {
  data: T[]
  total: number
  page?: number
  pageSize?: number
}

type PaginationParams<F extends Record<string, unknown> = Record<string, never>> = {
  page?: number | string
  limit?: number | string
} & Partial<F>
