import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IAdminOrder, IAdminOrderFilter } from '../../models/IAdminOrder';
import { AdminOrderService } from '../../services/admin-order-service';
import { IAdminOrderDetail } from '../../models/IAdminOrderDetail';
import { FormsModule } from '@angular/forms';
import { AdminOrderDetailModal } from "../../modal/admin-order-detail-modal/admin-order-detail-modal";
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-list-order',
  imports: [FormsModule, CurrencyPipe, AdminOrderDetailModal, CommonModule],
  templateUrl: './admin-list-order.html',
  styleUrl: './admin-list-order.scss'
})
export class AdminListOrder implements OnInit{

  orderDetail: IAdminOrderDetail | null = null;
  orderStatuses: string[] = ['Pending', 'PaymentSuccess', 'PaymentFailed', 'Shipped', 'Delivered', 'Cancelled'];

  sortBy: string;
  sortDesc: boolean; 
  filter: IAdminOrderFilter = {pageNumber: 1, pageSize: 5, sortBy: 'Created', sortDesc: false};
  orders: IAdminOrder[] = [];
  totalCount = 0;
  selectedOrder: IAdminOrderDetail | null = null;
  isOrderDetailOpen = false;
  bsModalRef!: BsModalRef; 

  constructor(private adminOrderService: AdminOrderService, private modalService: BsModalService){}

  ngOnInit(): void {
    this.loadOrders();
  }


// viewOrderDetail(orderId: number) {
//   this.adminOrderService.getOrderDetail(orderId).subscribe(res => {
//     this.orderDetail = res;
//     this.isOrderDetailOpen = true;
//     console.log(this.orderDetail);
//   });
// }

showOrder(order: IAdminOrder) {
  this.adminOrderService.getOrderDetail(order.id).subscribe(res => {
    const initialState: ModalOptions = {
      class: 'modal-lg',
      initialState: { order: res }
    };
    console.log(order);
    this.bsModalRef = this.modalService.show(AdminOrderDetailModal, initialState);
  });
}

// viewOrderDetail(order: IAdminOrder) {
//    const initialState: ModalOptions = {
//      class: 'modal-lg',
//      initialState: {
//        order: order
//      }
//    };
//    this.adminOrderService.getOrderDetail(order.id).subscribe(res => {
//     this.selectedOrder = res; 
//   });

//   this.bsModalRef = this.modalService.show(
//     AdminOrderDetailModal,
//     initialState
//   );
// }

changePage(page: number) {
  this.filter.pageNumber = page;
  this.loadOrders();
}
  
changeOrderStatus(orderId: number, status) {

    //const select = event.target as HTMLSelectElement;
    //const status = select.value;
    //const status = (event.target as HTMLSelectElement).value;
  this.adminOrderService.updateOrderStatus(orderId, status).subscribe(res => {
    if (res) {
      const order = this.orders.find(o => o.id === orderId);
      if (order) order.orderStatus = status;
      this.loadOrders();
    }
  });
}

 loadOrders(){
   this.adminOrderService.getAdminOrders(this.filter).subscribe(res => {
     this.orders = res.result
     this.totalCount = res.totalCount;
     console.log(res);
   });
 }

// loadOrders(){
//   this.adminOrderService.getAdminOrders().subscribe(res => {
//     this.orders = res;
//     console.log(this.orders);
//   });
// }

applyFilter() {
  this.filter.pageNumber = 1; 
  this.loadOrders();
}

applySort(column: string) {
  if (this.sortBy === column) {
    this.sortDesc = !this.sortDesc; // تغییر ترتیب اگر دوباره روی همان ستون کلیک شد
  } else {
    this.sortBy = column;
    this.sortDesc = false;
  }

  this.filter.sortBy = this.sortBy;
  this.filter.sortDesc = this.sortDesc;
  this.loadOrders();
}

get totalPages(): number {
  return Math.ceil(this.totalCount / this.filter.pageSize);
}

closeOrderDetail() {
  this.isOrderDetailOpen = false;
  this.selectedOrder = null;
}

}
