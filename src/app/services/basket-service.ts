import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, tap } from 'rxjs';
import { IBasket, IBasketItems, IBasketTotal } from '../models/Basket';
import { HttpClient, HttpContext } from '@angular/common/http';
import { IProduct } from '../models/IProduct';
import { Basket } from '../basket/basket';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  
  private backendUrl = "https://localhost:7096/api";
  private basketItems = new BehaviorSubject<IBasket>(null);
  basketItems$ = this.basketItems.asObservable();

  private totalBasket = new BehaviorSubject<IBasketTotal>(null);
  public totalBasket$ = this.totalBasket.asObservable();

  constructor(private http: HttpClient){}

  getBasket(id: number){
    return this.http.get<IBasket>(`${this.backendUrl}/basket/${id}`).pipe(map(basket => {
      this.basketItems.next(basket);
      this.calculateTotal();
      return basket;
    }))
  }

  setBasket(basket: IBasket){
    return this.http.post<IBasket>(`${this.backendUrl}/basket`, basket).pipe(map(basket => {
      this.basketItems.next(basket);
      this.calculateTotal();
      return basket;
    }))
  }

  deleteBasket(id: number){

  }

  deleteItemFromBasket(id: number){
    if (this.getCurrentBasketSource()){
      const basketId = this.getCurrentBasketSource().id;
      return this.http.delete<IBasket>(`${this.backendUrl}/basket/DeleteItem/${basketId}/${id}`).pipe(tap(res => {
        if (res.items.length === 0){
          this.basketItems.next(null);
          this.totalBasket.next(null);
          localStorage.removeItem('basket_item');
        } else {
          this.basketItems.next(res);
          this.calculateTotal();
        }
      }))
    }
    return of(null);
  }

  getCurrentBasketSource(){
    return this.basketItems.getValue();
  }

  addItemToBasket(product: IProduct, quantity = 1){
    const itemToAdd : IBasketItems = this.mapProductToBasketItem(product, quantity);
    const basket = this.getCurrentBasketSource() ?? this.createBasket();
    //basket.items = basket.items ?? [];
    basket.items = this.addOrUpdateBasketItems(itemToAdd, basket.items, quantity);
    return this.setBasket(basket);
  }

  increaseItenQuantity(id: number){
    const basket = this.getCurrentBasketSource();
    const itemIndex = basket.items.findIndex(x => x.id === id);
    if (itemIndex != -1){
      const item = basket.items[itemIndex];
      item.quantity+=1;
      return this.setBasket(basket);
    }
    return of(null)
  }

decreaseItenQuantity(id: number){
    const basket = this.getCurrentBasketSource();
    const itemIndex = basket.items.findIndex(x => x.id === id);
     if (itemIndex != -1){
      const item = basket.items[itemIndex];
      if (item.quantity > 1){
        item.quantity--;
        return this.setBasket(basket);
      }
      else {
        this.deleteItemFromBasket(item.id);
      }
  }
  return of(null);
}

  private createBasket(): IBasket {
  const basket: IBasket = {
    id: 1,
    userId: 1,
    items: []
  };

  localStorage.setItem('basket_item', JSON.stringify(basket.id));
  return basket;
}

  private addOrUpdateBasketItems(itemToAdd: IBasketItems, items: IBasketItems[], quantity: number) : IBasketItems[] {
    const index = items.findIndex(x => x.id === itemToAdd.id);
    if (index === -1){
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity; 
    }
    return items;
  }

  private mapProductToBasketItem(product: IProduct, quantity: number) : IBasketItems {
    return {
      id : product.id,
      brand : product.productBrand,
      discount : 0,
      pictureUrl : product.pictureUrl,
      price : product.price,
      productName : product.title,
      quantity : quantity,
      type : product.productType,
    }
  }

  private calculateTotal(){
    const basket = this.getCurrentBasketSource();
    let shipping = 0;
    let subTotal = basket.items.reduce((init, item) =>{
      return item.price * item.quantity + init;
    }, 0);
    let total = shipping + subTotal;
    this.totalBasket.next({shipping: shipping, subTotal: subTotal, total: total});
  }

}
