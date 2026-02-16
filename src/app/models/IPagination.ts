export interface IPagination<T> {
  map(arg0: (r: any) => any): IPagination<import("./IReview").IReview>;
  result: T[],
  totalCount: number,
  pageNumber: number,
  pageSize: number,
  totalPages?: number;
  hasPrevious?: boolean;
  hasNext?: boolean;
}
