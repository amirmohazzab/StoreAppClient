export interface IPagination<T> {
  result: T[],
  totalCount: number,
  pageNumber: number,
  pageSize: number,
  totalPages?: number;
  hasPrevious?: boolean;
  hasNext?: boolean;
}
