import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../models/IPagination';
import { IProduct } from '../models/IProduct';
import { map, Observable } from 'rxjs';
import { IType } from '../models/IType';
import { IBrand } from '../models/IBrand';
import { ShopParams } from '../models/shopParams';

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

  getProduct(id: number){
     return this.http.get<IProduct>(`${this.backendUrl}/product/${id}`);
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
}
