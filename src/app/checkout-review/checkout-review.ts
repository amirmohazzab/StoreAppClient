import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BasketService } from '../services/basket-service';
import { Observable } from 'rxjs';
import { IBasket } from '../models/Basket';
import { TotalOrder } from '../total-order/total-order';

@Component({
  selector: 'app-checkout-review',
  imports: [DecimalPipe, AsyncPipe],
  templateUrl: './checkout-review.html',
  styleUrl: './checkout-review.scss'
})
export class CheckoutReview implements OnInit{

  basket$ : Observable<IBasket>;
  constructor(private basketService: BasketService){}

  ngOnInit(): void {
    this.basket$ = this.basketService.basketItems$;
  }
}
