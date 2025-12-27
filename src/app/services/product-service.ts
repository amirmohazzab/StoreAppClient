import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAdminProduct, IMostSoldProduct, IMostWishlistedProduct } from '../models/IAdminProduct';
import { IMostReviewedProducts, IReview, IReviewResponse } from '../models/IReview';
import { ReviewParams } from '../models/reviewParams';
import { IMostAddedToBasket } from '../models/Basket';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private adminBackendUrl = "https://localhost:7096/api/admin";
  private reviewParams = new ReviewParams();
    
  constructor(private http: HttpClient){}

  getProducts(): Observable<IAdminProduct[]> {
    return this.http.get<IAdminProduct[]>(`${this.adminBackendUrl}/product/getAll`);
  }

  
  getProduct(id: number): Observable<any> {
    return this.http.get<any>(`${this.adminBackendUrl}/product/get/${id}`);
  }

 
  private buildFormData(data: any): FormData {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      if (key === 'gallery' && data.gallery?.length > 0) {
        data.gallery.forEach((file: File) => {
          formData.append('gallery', file, file.name);
        });
      }
      else if (key === 'mainImage' && data.mainImage) {
        formData.append('mainImage', data.mainImage, data.mainImage.name);
      }
      else if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });

    return formData;
  }

 
  createProduct(product: any): Observable<number> {
    const formData = this.buildFormData(product);
    return this.http.post<number>(`${this.adminBackendUrl}/product/create`, formData);
  }

  // updateProduct(product: any): Observable<boolean> {
  //   const formData = this.buildFormData(product);
  //   return this.http.put<boolean>(`${this.adminBackendUrl}/product/update`, formData);
  // }

  updateProduct(formData: FormData): Observable<any> {
    return this.http.put(`${this.adminBackendUrl}/product/update`, formData);
  }

  
  deleteProduct(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.adminBackendUrl}/product/delete/${id}`);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.adminBackendUrl}/product/wishlists`); // اگر endpoint دارید
  }

  getAtLeastOneWishlisted(): Observable<any> {
    return this.http.get<any>(`${this.adminBackendUrl}/product/at-least-one-wishlisted`);
  }

  getMostWishlistedProducts(take=5): Observable<IMostWishlistedProduct[]> {
    return this.http.get<IMostWishlistedProduct[]>(`${this.adminBackendUrl}/product/most-wishlisted-products`, {params : {take}});
  }

  getAdminReviews(): Observable<IReviewResponse> {
    // const params: any = {};
    // Object.keys(filter).forEach(key => {
    //   if (filter[key] !== '' && filter[key] !== null) {
    //     params[key] = filter[key];
    //   }
    // });
    let params = this.generateReviewParams();
    return this.http.get<IReviewResponse>(`${this.adminBackendUrl}/product/review`, { params });
  }


   getReviewParams(){
      return this.reviewParams;
    }
  
    updateReviewParams(params: ReviewParams){
      this.reviewParams = params;
    }

   private generateReviewParams() {
      let params = new HttpParams();
      if (this.reviewParams.text) params = params.append('text', this.reviewParams.text);
      if (this.reviewParams?.rating && this.reviewParams?.rating > 0) params = params.append('rating', this.reviewParams.rating);
      if (this.reviewParams?.productName) params = params.append('productName', this.reviewParams.productName);
      if (this.reviewParams?.userName) params = params.append('userName', this.reviewParams.userName);
      if (this.reviewParams?.fromDate) params = params.append('fromDate', this.reviewParams.fromDate);
      if (this.reviewParams?.toDate) params = params.append('toDate', this.reviewParams.toDate);
      // if (this.reviewParams.isApproved !== null && this.reviewParams.isApproved !== undefined) {
      //   params = params.append('isApproved', this.reviewParams.isApproved.toString());
      // }
      if (this.reviewParams.isApproved !== undefined) {
  params = params.append(
    'isApproved',
    this.reviewParams.isApproved === null
      ? 'null'
      : this.reviewParams.isApproved.toString()
  );
}

      params = params.append('pageSize', this.reviewParams.pageSize);
      params = params.append('pageNumber', this.reviewParams.pageNumber);

      return params
  }

  approveReview(reviewId: number, approve: boolean) {
    return this.http.put(`${this.adminBackendUrl}/product/review/approve`, { reviewId, approve });
  }

  updateReview(id: number, comment: string) {
  return this.http.put(`${this.adminBackendUrl}/product/review/${id}`,{ comment });
}

  deleteReview(reviewId: number) {
    return this.http.delete(`${this.adminBackendUrl}/product/review/${reviewId}`);
  }

  getMostReviewedProducts(take: number = 5) {
    return this.http.get<IMostReviewedProducts[]>(`${this.adminBackendUrl}/product/most-reviewed-products`,{ params: { take } });
  }

  getMostAddedToBasket() {
    return this.http.get<IMostAddedToBasket[]>(`${this.adminBackendUrl}/product/most-added-to-basket`);
  }

   getMostSoldProducts(take = 5) {
    return this.http.get<IMostSoldProduct[]>(`${this.adminBackendUrl}/product/most-sold-products`, { params: { take } });
  }

  getAtLeastOneReview(){
    return this.http.get<number>(`${this.adminBackendUrl}/product/review/at-least-one-review`);
  }

 

}