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

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Footer,
    Navbar,
    RouterModule,
    Shop,
    CommonModule,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    PaginationModule,
    BreadcrumbItemDirective,
    BreadcrumbComponent,
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
  
  constructor(private basketService: BasketService){}

  ngOnInit(): void {
    const basketId = localStorage.getItem('basket_item');
    if (basketId) {
      this.basketService.getBasket(JSON.parse(basketId)).subscribe(res => console.log(res))
    }
  }

}
