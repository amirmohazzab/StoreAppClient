import { Component, OnInit } from '@angular/core';
import { BasketService } from '../services/basket-service';
import { Observable } from 'rxjs';
import { IBasket, IBasketItems } from '../models/Basket';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { TotalOrder } from "../total-order/total-order";

@Component({
  selector: 'app-basket',
  imports: [AsyncPipe, DecimalPipe, TotalOrder],
  templateUrl: './basket.html',
  styleUrl: './basket.scss'
})
export class Basket implements OnInit{

  basket$ : Observable<IBasket>;
  constructor(private basketService: BasketService){}

  ngOnInit(): void {
    this.basket$ = this.basketService.basketItems$;
  }

  increaseItenQuantity(item: IBasketItems){
    this.basketService.increaseItenQuantity(item.id).subscribe();
  }

  decreaseItenQuantity(item: IBasketItems){
    this.basketService.decreaseItenQuantity(item.id).subscribe();
  }
}
