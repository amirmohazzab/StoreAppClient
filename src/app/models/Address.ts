import { IDeliveryMethod } from "./order"

export interface IAddress {
    id: number,
    isMain: boolean,
    state: string,
    city: string,
    firstName: string,
    fullAddress: string,
    lastName: string,
    number: string,
    postalCode: string
}

export interface ICheckoutFormBuilder {
    address: IAddress,
    deliveryMethod: IDeliveryMethod,
    portalType: number
}

export interface IAddAddress{
    isMain: boolean,
    state: string,
    city: string,
    firstName: string,
    fullAddress: string,
    lastName: string,
    number: string,
    postalCode: string
}