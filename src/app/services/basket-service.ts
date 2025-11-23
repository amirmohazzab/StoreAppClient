import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap, throwError } from 'rxjs';
import { IBasket, IBasketItems, IBasketTotal } from '../models/Basket';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../models/IProduct';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  
  private backendUrl = "https://localhost:7096/api";
  //private readonly backendUrl = environment.apiUrl;
  private basketItems = new BehaviorSubject<IBasket | null>(null);
  basketItems$ = this.basketItems.asObservable();

  shippingPrice: number = 0;
  private totalBasket = new BehaviorSubject<IBasketTotal>(null);
  public totalBasket$ = this.totalBasket.asObservable();

  constructor(private http: HttpClient){}

  getBasket(id: string){
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

  deleteItemFromBasket(productId: number){
    if (this.getCurrentBasketSource()){
      const basketId = this.getCurrentBasketSource().id;
     
      return this.http.delete<IBasket>(`${this.backendUrl}/Basket/DeleteItem/${basketId}/${productId}`).pipe(
        map(res => res ?? { id: basketId, items: [] }),
        tap(res => {
        if (!res.items || res.items.length === 0){
          this.basketItems.next(null);
          this.totalBasket.next(null);
          localStorage.removeItem('basket_item');
        } else {
          this.basketItems.next(res);
          this.calculateTotal();
        }
      }))
    }
    return of({ id: '', items: [] });
  }

  getCurrentBasketSource(){
    const basketId = localStorage.getItem('basket_item');
    if (!basketId || basketId === 'null' || basketId === 'undefined') return null;
    const current = this.basketItems.value;
    return current ?? { id: basketId, items: [] };
  }

  addItemToBasket(product: IProduct, quantity = 1){

    let basket = this.getCurrentBasketSource() ?? this.createBasket();
     const itemToAdd: IBasketItems = this.mapProductToBasketItem(product, quantity, basket.id);
     basket.items = this.addOrUpdateBasketItems(itemToAdd, basket.items, quantity);
     basket.items = (basket.items ?? []).map(item => ({
       ...item,
       basketId: basket.id
     }));
     localStorage.setItem('basket_item', basket.id);
     this.basketItems.next(basket);
    

   return this.http.post<IBasket>(`${this.backendUrl}/basket/add-item`, basket)
     .pipe(
       tap(res => {
         this.basketItems.next(res);
       })
     );

  
  }

  increaseItenQuantity(id: number){
     const basket = this.getCurrentBasketSource();
     const itemIndex = basket.items.findIndex(x => x.productId === id);
     if (itemIndex != -1){
       const item = basket.items[itemIndex];
       item.quantity+=1;
       return this.setBasket(basket);
     }
     return of(null)
   }

   decreaseItenQuantity(productId: number){
     
       const basket = this.getCurrentBasketSource();
       const itemIndex = basket.items.findIndex(x => x.productId === productId);
       if (itemIndex != -1){
         const item = basket.items[itemIndex];
         if (item.quantity > 1){
           item.quantity--;
           return this.setBasket(basket);
         }
         else {
           
           this.deleteItemFromBasket(item.productId).subscribe();
         }
     }
    
     return of(null);
   }

  setShippingPrice(shippingPrice: number){
    this.shippingPrice = shippingPrice;
    this.calculateTotal();
  }

  clearLocalBasket(){
    this.basketItems.next(null);
    this.totalBasket.next(null);
    localStorage.removeItem('basket_item');
  }

  private createBasket(): IBasket {
    const basket: IBasket = {
      id:  uuidv4(),
      items: []
    };

    localStorage.setItem('basket_item', basket.id);
    return basket;
  }

  private addOrUpdateBasketItems(itemToAdd: IBasketItems, items: IBasketItems[], quantity: number) : IBasketItems[] {
    const index = items.findIndex(x => x.productId === itemToAdd.productId);

    if (index === -1) {
    // اگر وجود ندارد، آیتم جدید را اضافه کن
    return [...items, { ...itemToAdd, quantity }];
  } else {
    // اگر وجود دارد، فقط تعداد را زیاد کن
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], quantity: updatedItems[index].quantity + quantity };
    return updatedItems;
  }
  }

  private mapProductToBasketItem(product: IProduct, quantity: number, basketId: string) : IBasketItems {
    return {
      basketId: basketId,
      productId : product.id,
      isDelete: false,
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
    let subTotal = basket.items.reduce((init, item) =>{
      return item.price * item.quantity + init;
    }, 0);
    let total = this.shippingPrice + subTotal;
    this.totalBasket.next({shipping: this.shippingPrice, subTotal: subTotal, total: total});
  }

getCurrentBasketValue(): IBasket | null {
  return this.basketItems.value;
}

removeItem(basketId: string, productId: number) {
  return this.http.delete<IBasket>(
    `${this.backendUrl}/basket/removeItem?basketId=${basketId}&productId=${productId}`
  );
}


removeItemFromBasket(item: IBasketItems): Observable<IBasket> {
  const basket = this.basketItems.value;
  if (!basket) return throwError(() => new Error("Basket is empty"));

  return this.removeItem(basket.id, item.productId).pipe(
    tap(updatedBasket => {
      this.basketItems.next(updatedBasket);
      this.calculateTotal();
    })
  );
}

clearBasket(basketId: string) {
    return this.http.delete(`${this.backendUrl}/basket/clear/${basketId}`).pipe(
      tap(() => {
        const emptyBasket: IBasket = { id: basketId, items: [] };
        this.basketItems.next(emptyBasket);
        this.calculateTotal();
      })
    );
  }

}
