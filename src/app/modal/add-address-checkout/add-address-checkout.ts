import { Component, EventEmitter, Output } from '@angular/core';
import { AccountService } from '../../services/account-service';
import { ToastrService } from 'ngx-toastr';
import {BsModalRef} from 'ngx-bootstrap/modal';
import { UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IAddress } from '../../models/Address';

@Component({
  selector: 'app-add-address-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './add-address-checkout.html',
  styleUrl: './add-address-checkout.scss'
})
export class AddAddressCheckout {

  @Output() newAddress = new EventEmitter<IAddress>();
  title: string = "Register New Address";
  closeBtnName: string = "Close";

  constructor(public bsModalRef: BsModalRef, private accountService: AccountService, private toast: ToastrService){}

  modalForm = new UntypedFormGroup({
    number: new UntypedFormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    isMain: new UntypedFormControl(true),
    state: new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
    city: new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
    firstName: new UntypedFormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    lastName: new UntypedFormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    fullAddress: new UntypedFormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]),
    postalCode: new UntypedFormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
  })


  onSubmit(){
    if (this.modalForm.invalid){
      this.modalForm.markAsTouched();
      return;
    }
    this.accountService.addAddress(this.modalForm.value).subscribe(newAddress => {
      this.newAddress.emit(newAddress);
      this.toast.success('Address added successfully');
      this.bsModalRef.hide();
    });
  }

}
