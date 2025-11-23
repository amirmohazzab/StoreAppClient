import { Component, OnInit } from '@angular/core';
import { BasketService } from '../services/basket-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBasket, IBasketItems } from '../models/Basket';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { TotalOrder } from "../total-order/total-order";
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-basket',
  imports: [DecimalPipe, TotalOrder, AsyncPipe, RouterModule],
  templateUrl: './basket.html',
  styleUrl: './basket.scss'
})
export class Basket implements OnInit{

  basket: IBasket;
  basket$ : Observable<IBasket>;

  private basketItems = new BehaviorSubject<IBasket | null>(null);
  basketItems$ = this.basketItems.asObservable();

  constructor(private basketService: BasketService, private toast: ToastrService){}

  ngOnInit(): void {
    this.basket$ = this.basketService.basketItems$;
     this.basketService.basketItems$.subscribe(basket => {
      this.basket = basket;
      console.log("Basket in component:", basket);
    });
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

   getImageUrl(pictureUrl: string | null | undefined): string {
  if (!pictureUrl.startsWith('http')) {
    return `https://localhost:7096/images/products/${pictureUrl}`;
  }
  return pictureUrl;
}


removeItem(item: IBasketItems) {
  this.basketService.removeItemFromBasket(item).subscribe({
    next: () => this.toast.success("Item removed successfully 🗑️"),
    error: () => this.toast.error("Failed to remove item ❌")
  });
}

clearBasket() {
    if (!this.basket) return;

    this.basketService.clearBasket(this.basket.id).subscribe({
      next: () => {
        this.toast.success("Basket cleared successfully");
      },
      error: () => this.toast.error("Failed to clear basket")
    });
  }


}
