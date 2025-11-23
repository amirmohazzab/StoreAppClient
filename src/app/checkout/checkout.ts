import { Component, ViewChild } from '@angular/core';
import { TotalOrder } from "../total-order/total-order";
import { CheckoutAddress } from "../checkout-address/checkout-address";
import { CheckoutDelivery } from "../checkout-delivery/checkout-delivery";
import { CheckoutReview } from "../checkout-review/checkout-review";
import { CheckoutPayment } from "../checkout-payment/checkout-payment";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-checkout',
  imports: [CommonModule, TotalOrder, CheckoutAddress, CheckoutDelivery, CheckoutReview, CheckoutPayment],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {

  //@ViewChild("stepper") stepper: MatStepper;

   steps = [
    { label: 'Choose Address', active: true },
    { label: 'Delivery Method', active: false },
    { label: 'Basket Review', active: false },
    { label: 'Payment', active: false }
  ];

  selectedIndex = 0;

  selectStep(i: number) {
    this.selectedIndex = i;
    this.steps.forEach((s, idx) => s.active = idx === i);
  }

  nextStep() {
    if (this.selectedIndex < this.steps.length - 1) this.selectStep(this.selectedIndex + 1);
  }

  prevStep() {
    if (this.selectedIndex > 0) this.selectStep(this.selectedIndex - 1);
  }

 
}
