import { IAddAddress } from "./Address";

export interface IDeliveryMethod {
    id: number;
    isDelete: boolean;
    shortName: string,
    deliveryTime: string;
    description: string;
    price: number;
}

export interface IOrderRequest {
    basketId: number;
    deliveryMethodId : number;
    buyerPhoneNumber: string;
    portalType: number;
    shioToAddress: IAddAddress;
}

export interface IOrder {
  id: number;
  created: string;
  createdBy: string;
  lastModified: string;
  lastModifiedBy: string;
  buyerPhoneNumber: string;
  subTotal: number;
  trackingCode: string;
  isFinally: boolean;
  total: number;
  portal: Portal;
  portalType: number | string | PortalTypeEnum; //enum
  authority: string;
  link: string;
  status: number | string | OrderStatusEnum; //enum
  deliveryMethod: IDeliveryMethod;
  shipToAddress: IAddAddress;
  orderItems: IOrderItem[];
}

export interface Portal {
  id: number;
  orderId: number;
  gateway: number;
  status: number;
  createdOn: string;
  amount: number;
  referenceId: string;
}
export interface IOrderItem {
  productItemId: number;
  productName: string;
  productTypeName: string;
  productBrandName: string;
  pictureUrl: string;
  id: number;
  price: number;
  quantity: number;
}