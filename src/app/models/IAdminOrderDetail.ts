
export interface IAdminOrderDetail {
 id: number;
  buyerPhoneNumber: string;
  subTotal: number;
  total: number;
  orderStatus: string;
  created: string;
  userName: string;
  userEmail: string;
  deliveryPrice: number;
  shippingAddress: string;
  items: IAdminOrderItem[]; 
}

export interface IAdminOrderItem {
  productId: number;
  productName: string;
  brandName: string;
  typeName: string;
  pictureUrl: string;
  price: number;
  quantity: number;
}