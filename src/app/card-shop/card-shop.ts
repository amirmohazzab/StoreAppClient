import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../models/IProduct';
import { DecimalPipe } from '@angular/common';
import {RouterModule} from '@angular/router';
import { BasketService } from '../services/basket-service';
 
@Component({
  selector: 'app-card-shop',
  imports: [DecimalPipe, RouterModule],
  templateUrl: './card-shop.html',
  styleUrl: './card-shop.scss'
})
export class CardShop implements OnInit{

   @Input() product!: IProduct;

   constructor(private basketService: BasketService){}

  ngOnInit(): void {
    this.addItemToBasket();
  }

  addItemToBasket(){
    if (!this.product) {
      console.error("Product is not defined!");
      return;
    }
    this.basketService.addItemToBasket(this.product).subscribe({
    next: res => console.log('Basket updated:', res),
    error: err => console.error('Error updating basket:', err)
  });
  }
}
