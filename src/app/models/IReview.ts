export interface IReview {
  id: number;
  userName: string;
  comment: string;
  rating: number;
  created: string;
  productId: number;
  userId?: string;
  productTitle: string
}