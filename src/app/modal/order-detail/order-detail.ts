import { Component } from '@angular/core';
import { IOrder } from '../../models/order';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DecimalPipe } from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-order-detail',
  imports: [DecimalPipe, RouterModule],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.scss'
})
export class OrderDetail {

  order: IOrder;
  constructor(public bsModalRef: BsModalRef){}

  
}
