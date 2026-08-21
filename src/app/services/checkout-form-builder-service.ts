import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAddress, ICheckoutFormBuilder } from '../models/Address';
import { IDeliveryMethod } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormBuilderService {
  private formBuilder = new BehaviorSubject<ICheckoutFormBuilder>(
    this.getInitialCheckoutState()
  );

  private getInitialCheckoutState(): ICheckoutFormBuilder {
    return {
        address: {
            id: 0,
            isMain: false,
            state: '',
            city: '',
            firstName: '',
            lastName: '',
            fullAddress: '',
            number: '',
            postalCode: '',
            avatarUrl: '',
            place: ''
        },
        deliveryMethod: undefined,
        portalType: undefined,
        buyerPhoneNumber: ''
    };
  }

  public formBuilder$ = this.formBuilder.asObservable();


  constructor() {
    const stored = localStorage.getItem('checkout-form');

    if (stored) {
        this.formBuilder.next(JSON.parse(stored));
    }
  }

  setAddress(address: IAddress){
    const value = {...this.formBuilder.value, address};

    this.formBuilder.next(value);
    localStorage.setItem('checkout-form', JSON.stringify(value));
  }

  setDeliveryMethod(deliveryMethod: IDeliveryMethod){
    const value = {...this.formBuilder.value, deliveryMethod
    };

    this.formBuilder.next(value);
    localStorage.setItem('checkout-form', JSON.stringify(value)
    );
  }

  setPortalType(portalType: number){
    this.formBuilder.next({...this.formBuilder.value, portalType});
  }

  clearCheckout() {
    localStorage.removeItem('checkout-form');
    this.formBuilder.next(this.getInitialCheckoutState());
  }

  getCurrentValue(): ICheckoutFormBuilder {
    return this.formBuilder.value;
  }


}
