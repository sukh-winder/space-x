export interface LaunchesPagination {
  limit: number;
  page: number;
  sort?: Record<string, 1 | -1>;
  totalDocs?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  nextPage?: number | null;
  hasMore?: boolean;
  query?: object;
}
