import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order-service';
import { ToastrService } from 'ngx-toastr';
import { CheckoutFormBuilderService } from '../services/checkout-form-builder-service';
import {ReactiveFormsModule} from '@angular/forms';
import { PortalType } from '../models/checkout';
import {CommonModule} from '@angular/common';
import { ShowEnumPipe } from '../pipes/show-enum-pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  imports: [ReactiveFormsModule, CommonModule, ShowEnumPipe],
  templateUrl: './checkout-payment.html',
  styleUrl: './checkout-payment.scss'
})
export class CheckoutPayment implements OnInit {

  PortalType = PortalType;
  portalSelected = 3;
  transferToPortal = false;

  constructor(
    private orderService: OrderService, 
    private toast: ToastrService, 
    private formBuilder: CheckoutFormBuilderService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.formBuilder.setPortalType(this.portalSelected);
  }

  createOrder(){
    this.transferToPortal = true;
    this.orderService.createOrder().subscribe(res => {
      if (res){
        if (res.authority) {
          window.location.href = res.link;
        } else {
          this.transferToPortal = false;
          this.router.navigateByUrl('/checkout/success/?status=failed');
        }
        this.toast.success('Payment Successful');
      }
    })
  }

  onChangePortal(portalType: number){
    this.portalSelected = portalType;
    this.formBuilder.setPortalType(portalType);
  }
}
