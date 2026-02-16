export class ReviewParams {
  text?: string = '';
  productName?: string = '';
  userName?: string = '';
  rating?: number | null = null;
  fromDate?: string = '';
  toDate?: string = '';
  pageSize: number = 5;
  pageNumber: number = 1; 
  isApproved: boolean | null | undefined = undefined;
  status: FilterReviewStatus = FilterReviewStatus.All;
}

export enum FilterReviewStatus {
  All = 0,
  Pending = 1,
  Approved = 2,
  Rejected = 3,
}