import { Component, OnInit } from '@angular/core';
import { BasketService } from '../services/basket-service';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { IBasketTotal } from '../models/Basket';

@Component({
  selector: 'app-total-order',
  imports: [DecimalPipe, AsyncPipe],
  templateUrl: './total-order.html',
  styleUrl: './total-order.scss'
})
export class TotalOrder implements OnInit{

  basketTotal$ : Observable<IBasketTotal>;
  constructor(private basketService: BasketService){}

  ngOnInit(): void {
    this.basketTotal$ = this.basketService.totalBasket$;
  }


}
