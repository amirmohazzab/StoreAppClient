import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { IDeliveryMethod, IOrder, IOrderRequest } from '../models/order';
import { BasketService } from './basket-service';
import { Router } from '@angular/router';
import { Observable, switchMap, take } from 'rxjs';
import { CheckoutFormBuilderService } from './checkout-form-builder-service';
import { ICheckoutFormBuilder } from '../models/Address';

@Injectable({
  providedIn: 'root'
})
export class OrderService implements OnInit{
  
  private backendUrl = "https://localhost:7096/api";
  formData: ICheckoutFormBuilder;

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private basketService: BasketService,
    private formBuilder: CheckoutFormBuilderService
  ){}

  ngOnInit(): void {
     
  }
  //const formData = this.formBuilder.getCurrentForm();

  getDeliveryMethods(){
    return this.http.get<IDeliveryMethod[]>(`${this.backendUrl}/order/getDeliveryMethods`);
  }

  // createOrder(){
  //    //this.basketService.clearLocalBasket();
  //    //this.router.navigateByUrl('/checkout/success');
  //    const basket = this.basketService.getCurrentBasketValue();
  //   if (!basket) {
  //     console.error('No basket found.');
  //     return new Observable(); // یا throwError()
  //   }

  //    return this.formBuilder.formBuilder$.pipe(
  //   take(1), // فقط آخرین مقدار را بگیر
  //   switchMap(formData => {

  //   const order = {
  //     basketId: basket.id,
  //     buyerPhoneNumber: this.formData.address?.number || '',
  //     shipToAddress: this.formData.address || {},
  //     items: basket.items.map(item => ({
  //       productId: item.productId,
  //       quantity: item.quantity,
  //       price: item.price,
  //     })),
  //     totalPrice: basket.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  //   };
  // }
  //   return this.http.post<any>(`${this.backendUrl}/order/createOrder`, order);
  // }
createOrder() {
  const basket = this.basketService.getCurrentBasketValue();
  if (!basket) return new Observable();

  return this.formBuilder.formBuilder$.pipe(
    take(1), 
    switchMap(formData => {
      const order = {
        basketId: basket.id,
        buyerPhoneNumber: formData.address?.number || '',
        deliveryMethodId: formData.deliveryMethod.id,
        portalType: formData.portalType,
        shipToAddress: formData.address || {},
        items: basket.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice: basket.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
      };
      return this.http.post<any>(`${this.backendUrl}/order/createOrder`, order);
    })
  );
}
  
  

}
