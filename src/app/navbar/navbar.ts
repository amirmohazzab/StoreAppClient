import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasketService } from '../services/basket-service';
import { IBasket } from '../models/Basket';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, AsyncPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit{

  basket$ : Observable<IBasket>;
  constructor(private basketService: BasketService){}

  ngOnInit(): void {
    this.basket$ = this.basketService.basketItems$;
  }


}
