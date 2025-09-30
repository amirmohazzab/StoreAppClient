import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, viewChild } from '@angular/core';
import { ShopService } from '../services/shop-service';
import { Subscription } from 'rxjs';
import { IProduct } from '../models/IProduct';
import { IPagination } from '../models/IPagination';
import { CardShop } from "../card-shop/card-shop";
import { MatSidenavContainer } from "@angular/material/sidenav";
import { MatSidenavContent, MatSidenav } from "@angular/material/sidenav";
import { ShopFilter } from "../shop-filter/shop-filter";
import { PaginationComponent } from "ngx-bootstrap/pagination";
import { ShopParams } from '../models/shopParams';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-shop',
  imports: [CardShop, MatSidenavContainer, MatSidenavContent, MatSidenav, ShopFilter, PaginationComponent, FormsModule],
  templateUrl: './shop.html',
  styleUrl: './shop.scss'
})
export class Shop implements OnInit, OnDestroy{
  public data : IPagination<IProduct>;
  shopParams: ShopParams;
  sidenavOpen: boolean = true;

  @ViewChild('search', {static: false}) searchItem: ElementRef

  private sub$ = new Subscription();
  constructor(private shopService: ShopService){}
 

  ngOnInit(): void {
    this.getProducts();
    this.shopParams = this.shopService.getShopParams();
  }

  @HostListener("window:resize")
  public onWindowResize(){
    window.innerWidth < 960 ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

   private getProducts(){
    const sub$ = this.shopService.getProducts().subscribe(res => this.data = res);
    this.sub$.add(sub$);
   }
   
   updateParams(updated: boolean){
    if (updated)
      this.getProducts();
   }

   onPageChange(data: any){
    this.shopParams.pageIndex = data.page;
    this.shopService.updateShopParams(this.shopParams);
    this.getProducts();
   }

   onSearch(){
    this.shopParams.search = this.searchItem.nativeElement.value;
    this.getProducts();
   }

   onReset(){
    this.shopParams = new ShopParams();
    this.shopService.updateShopParams(this.shopParams);
    this.searchItem.nativeElement.value = '';
    this.getProducts();
   }

   ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }


}
