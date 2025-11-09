import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../services/account-service';
import { filter, Subscription } from 'rxjs';
import { IAddress } from '../models/Address';
import { CheckoutFormBuilderService } from '../services/checkout-form-builder-service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AddAddressCheckout } from '../modal/add-address-checkout/add-address-checkout';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout-address',
  imports: [FormsModule],
  templateUrl: './checkout-address.html',
  styleUrl: './checkout-address.scss'
})
export class CheckoutAddress implements OnInit, OnDestroy {

  sub$ = new Subscription();
  public addresses: IAddress[] = [];
  public indexAddressShipping = 0;
  bsModalRef?: BsModalRef;

  constructor(
    private accountService: AccountService, 
    private formBuilder: CheckoutFormBuilderService, 
    private modalService: BsModalService
  ){}

  ngOnInit(): void {
    this.getAllAddresses();
    this.formBuilder.formBuilder$.subscribe(res => console.log(res));
  }

  private getAllAddresses(){
    const sub = this.accountService.getAddresses().subscribe((res: IAddress[]) => {
      this.addresses = res;
      console.log(this.addresses);
      this.indexAddressShipping = res.findIndex(x => x.isMain === true);
      if (this.indexAddressShipping === -1 && res.length > 0) {
        this.indexAddressShipping = 0;
      }
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
    // بروزرسانی index
    this.indexAddressShipping = index;
    // بروزرسانی isMain برای همه آدرس‌ها
    this.addresses.forEach((a, i) => a.isMain = (i === index));
    // بروزرسانی فرم یا سرویس
    this.formBuilder.setAddress(this.addresses[index]);
  }

 
  ngOnDestroy(): void {
    this.sub$.unsubscribe();
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

 


}
