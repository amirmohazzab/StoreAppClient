import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasketService } from '../services/basket-service';
import { IBasket } from '../models/Basket';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AccountService } from '../services/account-service';
import { IUser } from '../models/User';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, AsyncPipe, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit{

  basket$ : Observable<IBasket>;
  currentUser$: Observable<IUser>;
  constructor(private basketService: BasketService, private accountService: AccountService){}

  ngOnInit(): void {
    this.basket$ = this.basketService.basketItems$;
    this.currentUser$ = this.accountService.currentUser$;
  }

  logout(){
    this.accountService.logout();

  }


}
