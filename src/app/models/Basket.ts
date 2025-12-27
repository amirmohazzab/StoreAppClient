import { v4 as uuidv4 } from 'uuid';

export interface IBasket {
    id: string,
    items: IBasketItems[],
}


export interface IBasketItems {
    productId: number;   
    basketId: string;  
    isDelete?: boolean,
    productName: string,
    type: string,
    brand: string,
    quantity: number,
    price: number,
    discount: number,
    pictureUrl: string
}

export class Basket implements IBasket {
    id : string = uuidv4();
    items: IBasketItems[] = [];
}

export interface IBasketTotal {
    shipping: number,
    subTotal: number,
    total: number
}

export interface IMostAddedToBasket {
  productId: number;
  productName: string;
  totalQuantity: number;
  pictureUrl: string
}