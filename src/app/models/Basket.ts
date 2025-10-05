export interface IBasket {
    id: number,
    userId: number,
    items: IBasketItems[],
}


export interface IBasketItems {
    id: number,
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
    id : number = 1;
    userId: number = 1;
    items: IBasketItems[] = [];
}

export interface IBasketTotal {
    shipping: number,
    subTotal: number,
    total: number
}