import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../services/account-service';
import { Subscription } from 'rxjs';
import { IAddress } from '../models/Address';
import { CheckoutFormBuilderService } from '../services/checkout-form-builder-service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AddAddressCheckout } from '../modal/add-address-checkout/add-address-checkout';

@Component({
  selector: 'app-checkout-address',
  imports: [],
  templateUrl: './checkout-address.html',
  styleUrl: './checkout-address.scss'
})
export class CheckoutAddress implements OnInit, OnDestroy {

  sub$ = new Subscription();
  public addresses: IAddress[] = [];
  public indexAddressShipping = 0;

  constructor(
    private accountService: AccountService, 
    private formBuilder: CheckoutFormBuilderService, 
    private bsModalRef: BsModalRef,
    private modalService: BsModalService
  ){}

  ngOnInit(): void {
    this.getAllAddresses();
    this.formBuilder.formBuilder$.subscribe(res => console.log(res));
  }

  private getAllAddresses(){
    const sub = this.accountService.getAddresses().subscribe((res) => {
      this.addresses = res;
      this.indexAddressShipping = res.findIndex(x => x.isMain == true);
      this.onChangeAddressShipping(this.indexAddressShipping);
    });
    this.sub$.add(sub);
  }

  AddNewAddress(){
    const initialState : ModalOptions = {
      initialState: {

      }
    };
    this.bsModalRef = this.modalService.show(AddAddressCheckout, initialState);
    this.bsModalRef.content.newAddress.subscribe((address) => {
      this.checkAddressMain(address);
      this.addresses.push(address);
      this.onChangeAddressShipping(this.addresses.length - 1);
    })
  }

  onChangeAddressShipping(index: number){
    const address = this.addresses[index];
    this.indexAddressShipping = index;
    this.formBuilder.setAddress(address);
  }

  setToMainAddress(index: number){

  }

  private checkAddressMain(address: IAddress) {
    if (address.isMain) {
      this.addresses.forEach((element) => {
        if (element.id === address.id) {
          element.isMain = true;
        } else {
          element.isMain = false;
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
 


}
