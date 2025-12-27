import { IPagination } from "./IPagination";

export interface IReview {
  id: number;
  userName: string;
  comment: string;
  rating: number;
  created: string;
  productId: number;
  userId?: string;
  productName: string;
  isApproved: boolean;
  reviewsCount: number;
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
