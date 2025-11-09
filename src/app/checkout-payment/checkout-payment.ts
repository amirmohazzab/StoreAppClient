import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order-service';
import { ToastrService } from 'ngx-toastr';
import { CheckoutFormBuilderService } from '../services/checkout-form-builder-service';
import {ReactiveFormsModule} from '@angular/forms';
import { PortalTypeEnum } from '../models/checkout';
import {CommonModule} from '@angular/common';
import { ShowEnumPipe } from '../pipes/show-enum-pipe';
import { Router } from '@angular/router';
import { BasketService } from '../services/basket-service';

@Component({
  selector: 'app-checkout-payment',
  imports: [ReactiveFormsModule, CommonModule, ShowEnumPipe],
  templateUrl: './checkout-payment.html',
  styleUrl: './checkout-payment.scss'
})
export class CheckoutPayment implements OnInit {

  PortalType = PortalTypeEnum;
  portalSelected = 3;
  transferToPortal = false;

  constructor(
    private orderService: OrderService, 
    private basketService: BasketService,
    private toast: ToastrService, 
    private formBuilder: CheckoutFormBuilderService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.formBuilder.setPortalType(this.portalSelected);
  }

  submitPayment(){
    //this.orderService.createOrder();
    this.orderService.createOrder().subscribe({
    next: () => {
      this.basketService.clearLocalBasket();
      this.toast.success('ayment Done Successfully');
      this.router.navigateByUrl('/checkout/success');
    },
    error: err => {
      this.toast.error('Payment Unsuccessful');
      console.error(err);
    }
  });
  }

  onChangePortal(portalType: number){
    this.portalSelected = portalType;
    this.formBuilder.setPortalType(portalType);
  }
}
