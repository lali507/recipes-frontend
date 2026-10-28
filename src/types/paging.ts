export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// GET /recipes, GET /recipes/mine, GET /favorites
export interface PaginatedResponse<T> {
  items: T[];
  pagination: Pagination;
}