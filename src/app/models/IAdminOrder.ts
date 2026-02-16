import { IAdminOrderItem } from "./IAdminOrderItem";

export interface IAdminOrder {
  id: number;
  buyerPhoneNumber: string;
  subTotal: number;
  total: number;
  orderStatus: string;
  isFinally: boolean;
  created: string;
  userName: string;
  userEmail: string;
  shippingAddress: string;
  deliveryPrice: number;
  items: IAdminOrderItem[];
  
}

export interface IAdminOrderFilter {
  userName?: string;
  orderStatus?: string;
  fromDate?: string;
  toDate?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy: string;
  sortDesc: boolean;
}

export interface IPaymentStatus{
  pendingCount: number;
  paidCount: number;
}

export enum OrderStatusFilter {
  All = -1,
  Pending = 1,
  PaymentSuccess = 2,
  PaymentFailed = 3,
  Shipped = 4,
  Delivered = 5,
  Cancelled = 6,
}

