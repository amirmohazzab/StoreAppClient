import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile-service';
import { IBasket } from '../models/Basket';
import { Subscription } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-basket-list',
  imports: [ DecimalPipe, RouterLink],
  templateUrl: './basket-list.html',
  styleUrl: './basket-list.scss'
})
export class BasketList implements OnInit, OnDestroy{

  private sub = new Subscription();
  baskets: IBasket[] = [];
  constructor(private profileService: ProfileService){}
  
  ngOnInit(): void {
    this.getBasketsForCurrentUser();
  }

  getBasketsForCurrentUser(){
    const sub$ = this.profileService.getBasketsForClient().subscribe(res => {
      this.baskets = res;
      console.log(this.baskets);
    });
    this.sub.add(sub$);
  }

totalPrice(basket: IBasket): number {
  return basket.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
