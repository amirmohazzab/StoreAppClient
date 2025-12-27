import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../models/IPagination';
import { IProduct } from '../models/IProduct';
import { map, Observable } from 'rxjs';
import { IType } from '../models/IType';
import { IBrand } from '../models/IBrand';
import { ShopParams } from '../models/shopParams';
import { IReview } from '../models/IReview';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  
  private backendUrl = "https://localhost:7096/api";
  private shopParams = new ShopParams();

  constructor(private http: HttpClient){}

  getShopParams(){
    return this.shopParams;
  }

  updateShopParams(params: ShopParams){
    this.shopParams = params;
  }

  getProducts() : Observable<IPagination<IProduct>>{
    let params = this.generateShopParams();
   return this.http.get<IPagination<IProduct>>(`${this.backendUrl}/product`, {params});
  }

  getProduct(id: number) : Observable<IProduct> {
     return this.http.get<IProduct>(`${this.backendUrl}/product/${id}`);
  }

  getBrands(includeAll = true){
    return this.http.get<IBrand[]>(`${this.backendUrl}/productBrand`).pipe(map((brands) => {
      if (includeAll)
        brands = [{ id: 0, title: 'All'}, ...brands];
      return brands;
    }))
  };

  getTypes(includeAll = true){
    return this.http.get<IType[]>(`${this.backendUrl}/productType`).pipe(map((types) => {
      if (includeAll)
        types = [{ id: 0, title: 'All'}, ...types];
      return types;
    }))
  }

   private generateShopParams() {
      let params = new HttpParams();
      if (this.shopParams.search) params = params.append('search', this.shopParams.search);
      if (this.shopParams?.brandId && this.shopParams?.brandId > 0) params = params.append('brandId', this.shopParams.brandId);
      if (this.shopParams?.typeId && this.shopParams?.typeId > 0) params = params.append('typeId', this.shopParams.typeId);

      params = params.append('pageSize', this.shopParams.pageSize);
      params = params.append('pageIndex', this.shopParams.pageIndex);
      params = params.append('sort', this.shopParams.sort);
      params = params.append('typeSort', this.shopParams.typeSort);

      return params
  }

  incrementViewCount(productId: number): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/product/${productId}/increament-view`, {});
  }

  getProductsByCategory(categoryId: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.backendUrl}/product/by-category/${categoryId}`);
  }

  toggleLike(productId: number): Observable<{ liked: boolean; likeCount: number }> {
    return this.http.post<{ liked: boolean; likeCount: number }>(`${this.backendUrl}/product/toggle-like/${productId}`, {});
  }

  getRelatedProducts(productId: number, count: number = 6): Observable<IProduct[]> {
   return this.http.get<IProduct[]>(`${this.backendUrl}/product/${productId}/related?count=${count}`);
  }

  addReview(productId: number, data: { rating: number, comment: string }) {
    return this.http.post(`${this.backendUrl}/product/${productId}/review`, data);
  }

  getReviews(productId: number, pageIndex = 1, pageSize = 5): Observable<IPagination<IReview>> {
    return this.http.get<IPagination<IReview>>(`${this.backendUrl}/product/${productId}/review?pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  editReview(reviewId: number, data: { rating: number, comment: string }) {
    return this.http.put<any>(`${this.backendUrl}/product/review/${reviewId}`, data);
  }

  deleteReview(reviewId: number) {
    return this.http.delete<any>(`${this.backendUrl}/product/review/${reviewId}`);
  }

  toggleWishList(productId: number): Observable<boolean> {
    return this.http.post<boolean>(`${this.backendUrl}/product/toggle-wishlist/${productId}`, {});
  }

  // getUserWishlist(userId: number): Observable<any> {
  //   return this.http.get(`${this.backendUrl}/user/${userId}`);
  // }

  // getLikeStatus(productId: number) {
  //   return this.http.get<{ liked: boolean }>(`${this.backendUrl}/product/like-status/${productId}`);
  // }

}
