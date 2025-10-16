import { Component, ViewChild } from '@angular/core';
import { TotalOrder } from "../total-order/total-order";
import {MatStepperModule} from "@angular/material/stepper";
import { Stepper } from '../stepper/stepper';
import { CheckoutAddress } from "../checkout-address/checkout-address";
import { CheckoutDelivery } from "../checkout-delivery/checkout-delivery";
import { CheckoutReview } from "../checkout-review/checkout-review";
import { CheckoutPayment } from "../checkout-payment/checkout-payment";

@Component({
  selector: 'app-checkout',
  imports: [TotalOrder, MatStepperModule, Stepper, CheckoutAddress, CheckoutDelivery, CheckoutReview, CheckoutPayment],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout {

  @ViewChild("stepper") stepper: any;
}
