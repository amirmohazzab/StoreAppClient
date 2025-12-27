import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IAdminOrderDetail } from '../../models/IAdminOrderDetail';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-order-detail-modal',
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './admin-order-detail-modal.html',
  styleUrl: './admin-order-detail-modal.scss'
})
export class AdminOrderDetailModal {

  orderDetail: IAdminOrderDetail;
  selectedOrder: IAdminOrderDetail;
   orderStatuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

   @Input() order!: IAdminOrderDetail;
   @Output() close = new EventEmitter<void>();

   closeModal() {
    this.close.emit();
   }

   constructor(public bsModalRef: BsModalRef){}
}
