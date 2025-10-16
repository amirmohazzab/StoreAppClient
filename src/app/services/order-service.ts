import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDeliveryMethod, IOrder, IOrderRequest } from '../models/order';
import { BasketService } from './basket-service';
import { IAddress } from '../models/Address';
import { FormBuilder } from '@angular/forms';
import { CheckoutFormBuilderService } from './checkout-form-builder-service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  private backendUrl = "https://localhost:7096/api";

  constructor(private http: HttpClient, private basketService: BasketService, private formBuilder: CheckoutFormBuilderService){}

  getDeliveryMethods(){
    return this.http.get<IDeliveryMethod[]>(`${this.backendUrl}/order/getDeliveryMethods`);
  }

  createOrder(){
    let address: IAddress;
    let deliveryMethod: IDeliveryMethod;
    let basketId: number;
    let portalType: number = 3;

    this.basketService.basketItems$.subscribe(res => {
      basketId = res?.id;
    });
    this.formBuilder.formBuilder$.subscribe(res => {
      address = res.address;
      deliveryMethod = res.deliveryMethod;
      portalType = res.portalType;
    });
    const order: IOrderRequest = {
      basketId: basketId,
      buyerPhoneNumber: address.number,
      deliveryMethodId: deliveryMethod.id,
      shioToAddress: address,
      portalType: portalType
    };
    return this.http.post<IOrder>(`${this.backendUrl}/order/createOrder`, order).pipe(tap(res => {
      if (res) {
        this.basketService.clearLocalBasket();
      }
    }))
  }
}
