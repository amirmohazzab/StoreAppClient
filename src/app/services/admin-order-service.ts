import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAdminOrderDetail } from '../models/IAdminOrderDetail';
import { Observable } from 'rxjs/internal/Observable';
import { IPagination } from '../models/IPagination';
import { IAdminOrder, IAdminOrderFilter, IPaymentStatus } from '../models/IAdminOrder';
import { OrderParams } from '../models/orderParams';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService {
  
   private adminBackendUrl = "https://localhost:7096/api/admin";
   private orderParams = new OrderParams();
   constructor(private http: HttpClient){}

  //  getAdminOrders() : Observable<IAdminOrder[]> {
  //    return this.http.get<IAdminOrder[]>(`${this.adminBackendUrl}/order`);
  //  }

   private generateOrderParams() {
      let params = new HttpParams();
      if (this.orderParams?.orderStatus !== null) params = params.append('status', this.orderParams.orderStatus);
      if (this.orderParams?.userName) params = params.append('userName', this.orderParams.userName);
      if (this.orderParams?.fromDate) params = params.append('fromDate', this.orderParams.fromDate);
      if (this.orderParams?.toDate) params = params.append('toDate', this.orderParams.toDate);
      if (this.orderParams?.sortBy) params = params.append('sortBy', this.orderParams.sortBy);
      if (this.orderParams?.sortDesc !== undefined) params = params.append('sortDesc', this.orderParams.sortDesc.toString());

      params = params.append('pageSize', this.orderParams.pageSize);
      params = params.append('pageNumber', this.orderParams.pageNumber);

      return params
  }

  getAdminOrders(filter: IAdminOrderFilter) : Observable<IPagination<IAdminOrder>> {
    let params = this.generateOrderParams();

    // Object.entries(filter).forEach(([key, value]) => {
    //      if (value !== null && value !== undefined && value !== '') {
    //        params = params.append(key, value.toString());
    //      }
    // });

    return this.http.get<IPagination<IAdminOrder>>(`${this.adminBackendUrl}/order`, {params});
  }

   getOrderDetail(orderId: number): Observable<IAdminOrderDetail> {
    return this.http.get<IAdminOrderDetail>(`${this.adminBackendUrl}/order/${orderId}`);
  }

  updateOrderStatus(orderId: number, status: string): Observable<boolean> {
    return this.http.put<boolean>(`${this.adminBackendUrl}/order/change-status`, { orderId, status });
  }

  getPaymentStatus() : Observable<IPaymentStatus> {
    return this.http.get<IPaymentStatus>(`${this.adminBackendUrl}/order/payment-status`);
  }

   getTotalRevenue() : Observable<any>{
     return this.http.get<any>(`${this.adminBackendUrl}/order/stats/total-revenue`);   
  }

 
}
