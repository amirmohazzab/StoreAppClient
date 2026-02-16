import { IPagination } from "./IPagination";
import { FilterReviewStatus } from "./reviewParams";

export interface IReview {
  id: number;
  userName: string;
  comment: string;
  rating: number;
  created: string;
  productId: number;
  userId?: string;
  productName: string;
  isApproved: boolean | null | undefined;
  reviewsCount: number;
  status: FilterReviewStatus;
}

export interface IReviewResponse{
  reviews: IPagination<IReview>,
  pendingCount: number,
  approvedCount: number,
  rejectedCount: number
}

export interface IMostReviewedProducts {
  pictureUrl: string;
  productId: number;
  productName: string
  reviewsCount: number
}
