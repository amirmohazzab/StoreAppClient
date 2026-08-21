import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BasketService } from '../services/basket-service';
import { Observable } from 'rxjs';
import { IBasket } from '../models/Basket';
import { TotalOrder } from '../total-order/total-order';
import { environment } from '../../environments/environment';
import { IAddress } from '../models/Address';
import { AccountService } from '../services/account-service';
import { CheckoutFormBuilderService } from '../services/checkout-form-builder-service';

@Component({
  selector: 'app-checkout-review',
  imports: [DecimalPipe, AsyncPipe],
  templateUrl: './checkout-review.html',
  styleUrl: './checkout-review.scss'
})
export class CheckoutReview implements OnInit{

  basket$ : Observable<IBasket>;
  selectedAddress?: IAddress;

  constructor(private basketService: BasketService, private formBuilder: CheckoutFormBuilderService){}

  ngOnInit(): void {
    this.basket$ = this.basketService.basketItems$;
    
    this.formBuilder.formBuilder$.subscribe(res => {
      this.selectedAddress = res.address;
    });
  }

   getImageUrl(pictureUrl: string | null | undefined): string {
  if (!pictureUrl.startsWith('http')) {
    return `${environment.imageBaseUrl}${pictureUrl}`;
  }
  return pictureUrl;
}
}
