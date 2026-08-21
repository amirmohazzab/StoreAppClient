import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order-service';
import { IDeliveryMethod } from '../models/order';
import { DecimalPipe } from '@angular/common';
import {RouterLink} from '@angular/router';
import { CheckoutFormBuilderService } from '../services/checkout-form-builder-service';
import { BasketService } from '../services/basket-service';

@Component({
  selector: 'app-checkout-delivery',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './checkout-delivery.html',
  styleUrl: './checkout-delivery.scss'
})
export class CheckoutDelivery implements OnInit {

  indexSelected = 0;
  deliveryMethods: IDeliveryMethod[] = [];
  
  constructor(
    private orderService: OrderService, 
    private formBuilder: CheckoutFormBuilderService, 
    private basketService: BasketService){}

  ngOnInit(): void {
    this.getDeliveryMethods();
  }

  onChangeDelivery(index: number){
    this.indexSelected = index;
    this.saveSelectedDeliveryMethod(index);
    this.basketService.setShippingPrice(this.deliveryMethods[index].price);
    this.formBuilder.formBuilder$.subscribe(res => console.log(res));
  }

  private saveSelectedDeliveryMethod(index: number) {
    this.formBuilder.setDeliveryMethod(this.deliveryMethods[index]);
  }

  
  private getDeliveryMethods() {

  this.orderService.getDeliveryMethods().subscribe(res => {

    if (res && res.length > 0) {

      this.deliveryMethods = res;

      // Restore previously selected delivery method
      const selected =
        this.formBuilder.getCurrentValue().deliveryMethod;

      if (selected) {

        const index =
          res.findIndex(x => x.id === selected.id);

        if (index !== -1) {
          this.indexSelected = index;
        }
      }

      this.basketService.setShippingPrice(
        this.deliveryMethods[this.indexSelected].price
      );

      this.saveSelectedDeliveryMethod(this.indexSelected);

    }
    else {

      console.warn('No delivery methods found');
      this.deliveryMethods = [];

    }

  });

}
  // private getDeliveryMethods(){
  //   this.orderService.getDeliveryMethods().subscribe(res => {
  //     if (res && res.length > 0) {
  //       this.deliveryMethods = res;
  //       this.basketService.setShippingPrice(this.deliveryMethods[0]?.price ?? 0);
  //       this.setDeliveryMethod(this.indexSelected);
  //     } else {
  //       console.warn('No delivery methods found');
  //       this.deliveryMethods = [];
  //     }
  //   })
  // }

  
  
}
