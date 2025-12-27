export class OrderParams {
  orderStatus: string | null = null;
  userName: string = '';
  fromDate: string = '';
  toDate: string = '';
  sortBy?: string;
  sortDesc: boolean = false;
  pageSize: number = 5;
  pageNumber: number = 1;
}