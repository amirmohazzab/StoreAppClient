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
  constructor(private orderService: OrderService, private formBuilder: CheckoutFormBuilderService, private basketService: BasketService){}

  ngOnInit(): void {
    this.getDeliveryMethods();
  }

  onChangeDelivery(index: number){
    this.indexSelected = index;
    this.setDeliveryMethod(index);
    this.basketService.setShippingPrice(this.deliveryMethods[index].price);
    this.formBuilder.formBuilder$.subscribe(res => console.log(res));
  }

  private setDeliveryMethod(index: number) {
    this.formBuilder.setDeliveryMethod(this.deliveryMethods[index]);
  }


  private getDeliveryMethods(){
    this.orderService.getDeliveryMethods().subscribe(res => {
      this.deliveryMethods = res;
      this.basketService.setShippingPrice(this.deliveryMethods[0].price);
      this.setDeliveryMethod(this.indexSelected);
    })
  }

  
  
}
