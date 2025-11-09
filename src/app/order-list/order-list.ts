import { Component, OnDestroy, OnInit } from '@angular/core';
import { IOrder } from '../models/order';
import { CastEnumPipe } from '../pipes/cast-enum-pipe';
import { DatePipe, DecimalPipe, JsonPipe } from '@angular/common';
import { ProfileService } from '../services/profile-service';
import { Subscription } from 'rxjs';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { OrderDetail } from '../modal/order-detail/order-detail';

@Component({
  selector: 'app-order-list',
  imports: [CastEnumPipe, DatePipe, DecimalPipe],
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss'
})
export class OrderList implements OnInit, OnDestroy{

  private sub = new Subscription();
  orders: IOrder[] = [];
  bsModalRef : BsModalRef;

  constructor(private profileService: ProfileService, private modalService: BsModalService){}
  
  ngOnInit(): void {
   this.getOrdersForCurrentUser();
  }
  
  getOrdersForCurrentUser(){
     const sub$ = this.profileService.getOrdersForClient().subscribe(res => {
      this.orders = res;
      console.log(this.orders);
     });
     this.sub.add(sub$);
   }
    
  showOrder(orderId: number){
    const childOrder = this.orders.find(x => x.id == orderId);
    const initial: ModalOptions = {
      class: 'modal-lg',
      initialState: {
        order : childOrder,
      }
    }
    this.bsModalRef = this.modalService.show(OrderDetail, initial);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
