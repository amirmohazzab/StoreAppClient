import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./footer/footer";
import { Navbar } from "./navbar/navbar";
import { RouterModule } from '@angular/router';
import { Shop } from './shop/shop';
import { CommonModule } from '@angular/common';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { BreadcrumbComponent, BreadcrumbItemDirective } from 'xng-breadcrumb';
import { Breadcrumb } from "./breadcrumb/breadcrumb";
import { NgxSpinnerComponent } from 'ngx-spinner';
import { BasketService } from './services/basket-service';
import { AccountService } from './services/account-service';
import { BusyService } from './services/busy-service';
import { IUser } from './models/User';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Footer,
    Navbar,
    RouterModule,
    CommonModule,
    PaginationModule,
    Breadcrumb,
    NgxSpinnerComponent
],
  
  templateUrl: './app.html',
   template: `
    <ngx-spinner
      bdColor="rgba(0,0,0,0.8)"
      size="medium"
      color="#fff"
      type="square-jelly-box"
      [fullScreen]="true"
      #spinner>
    </ngx-spinner>

    <router-outlet></router-outlet>
  `,
  styleUrl: './app.scss'
})
export class App implements OnInit{
  
  constructor(
    private basketService: BasketService, 
    private accountService: AccountService,
    private busyService: BusyService
  ){}

  get busy$() {
    return this.busyService.busy$;
  }

  

  ngOnInit(): void {
    this.getBasket();
    this.getCurrentUser();
  }

  private getBasket(){
    const basketId = localStorage.getItem('basket_item');
    if (basketId) {
       this.basketService.getBasket(basketId).subscribe(res => console.log(res))
    }
  }

  private getCurrentUser(){

     const userJson = localStorage.getItem('user_token');

  if (!userJson) return; // اگر چیزی در localStorage نبود، کاری نکن

  try {
    const user = JSON.parse(userJson) as IUser;
    if (user) {
      this.accountService.setCurrentUser(user);
    }
  } catch (error) {
    console.error('❌ Invalid user_token in localStorage:', error);
    localStorage.removeItem('user_token'); // اگر خراب بود، پاکش کن
  }
    // const user = <IUser>JSON.parse(localStorage.getItem('user_token') || '');
    // if (user) {
    //   this.accountService.setCurrentUser(user);
    // }
  }

}
