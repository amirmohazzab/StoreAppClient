export class ReviewParams {
  text: string = '';
  productName: string = '';
  userName: string = '';
  rating: number = 0;
  fromDate: string = '';
  toDate: string = '';
  pageSize: number = 5;
  pageNumber: number = 1;
  isApproved: boolean | null | undefined = undefined;
}