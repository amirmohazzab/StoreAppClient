import { IDeliveryMethod } from "./order"

export interface IAddress {
    id: number,
    isMain: boolean,
    state: string,
    city: string,
    firstName: string,
    lastName: string,
    fullAddress: string,
    number: string,
    postalCode: string
}

export interface ICheckoutFormBuilder {
    address?: IAddress,
    deliveryMethod?: IDeliveryMethod,
    portalType?: number,
    buyerPhoneNumber?: string
}

export interface IAddAddress{
    isMain: boolean,
    state: string,
    city: string,
    firstName: string,
    lastName: string,
    fullAddress: string,
    number: string,
    postalCode: string
}