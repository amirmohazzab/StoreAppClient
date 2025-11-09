import { Component, OnInit } from '@angular/core';
import { BasketService } from '../services/basket-service';
import { Observable } from 'rxjs';
import { IBasket, IBasketItems } from '../models/Basket';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { TotalOrder } from "../total-order/total-order";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-basket',
  imports: [DecimalPipe, TotalOrder, AsyncPipe, RouterModule],
  templateUrl: './basket.html',
  styleUrl: './basket.scss'
})
export class Basket implements OnInit{

  basket: IBasket;
  basket$ : Observable<IBasket>;
  constructor(private basketService: BasketService){}

  ngOnInit(): void {
    this.basket$ = this.basketService.basketItems$;
  }

  increaseItenQuantity(item: IBasketItems){
     this.basketService.increaseItenQuantity(item.productId).subscribe();
   }

   decreaseItenQuantity(item: IBasketItems){
     
     this.basketService.decreaseItenQuantity(item.productId).subscribe({
      next: res => {
    if (res) {
      console.log('Updated basket:', res);
    } else {
      console.log('Basket is now empty');
    }
  },
  error: err => console.error('Error deleting item:', err)
    });
   }
}
