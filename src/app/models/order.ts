import { IAddAddress } from "./Address";
import {PortalTypeEnum} from "./checkout";

export interface IDeliveryMethod {
    id: number;
    isDelete: boolean;
    shortName: string,
    deliveryDate: string;
    description: string;
    price: number;
}

export interface IOrderRequest {
    basketId: string;
    deliveryMethodId : number;
    buyerPhoneNumber: string;
    portalType: number;
    shipToAddress: IAddAddress;
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
  portalType: number | string | PortalTypeEnum; 
  authority: string;
  link: string;
  status: number | string | OrderStatusEnum; 
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

export enum OrderStatusEnum{
  Surveying, 
  Proccessing,
  DeliveredToPost,
  Sent,
  Delivered,
  Returned,
  Quited,
  Unsuccessful
}