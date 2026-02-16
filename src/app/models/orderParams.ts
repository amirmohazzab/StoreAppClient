import { OrderStatusFilter } from "./IAdminOrder";

export class OrderParams {
  orderStatus: OrderStatusFilter = OrderStatusFilter.All;
  buyerPhoneNumber: string = '';
  fromDate: string = '';
  toDate: string = '';
  sortBy?: string;
  sortDesc: boolean = false;
  pageSize: number = 5;
  pageNumber: number = 1;
  userName: string = '';
}