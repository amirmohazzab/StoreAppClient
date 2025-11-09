import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAddress, ICheckoutFormBuilder } from '../models/Address';
import { IDeliveryMethod } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormBuilderService {
  private formBuilder = new BehaviorSubject<ICheckoutFormBuilder>({
    address: { id: 0, isMain: false, state: '', city: '', firstName: '', lastName: '', fullAddress: '', number: '', postalCode:''},
    deliveryMethod: undefined,
    portalType: undefined,
    buyerPhoneNumber: ''
  });
  public formBuilder$ = this.formBuilder.asObservable();

  constructor(){}

  setAddress(address: IAddress){
    this.formBuilder.next({...this.formBuilder.value, address});
  }

  setDeliveryMethod(deliveryMethod: IDeliveryMethod){
    this.formBuilder.next({...this.formBuilder.value, deliveryMethod});
  }

  setPortalType(portalType: number){
    this.formBuilder.next({...this.formBuilder.value, portalType});
  }

//   setBuyerPhoneNumber(phoneNumber: string) {
//   this.formBuilder.next({ ...this.formBuilder.value, buyerPhoneNumber: phoneNumber });
// }


}
