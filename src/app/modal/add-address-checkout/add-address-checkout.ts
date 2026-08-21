import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../../services/account-service';
import { ToastrService } from 'ngx-toastr';
import {BsModalRef } from 'ngx-bootstrap/modal';
import { UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms';
import { IAddress } from '../../models/Address';
import { CommonModule } from '@angular/common';
import { InputForm } from '../../input-form/input-form';
import { AddressService } from '../../services/address-service';


@Component({
  selector: 'app-add-address-checkout',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-address-checkout.html',
  styleUrl: './add-address-checkout.scss',
})
export class AddAddressCheckout {

  @Output() newAddress = new EventEmitter<IAddress>();
  modalForm: FormGroup;
  title: string = "Register New Address";
  closeBtnName: string = "Close";

  constructor(public bsModalRef: BsModalRef, private addressService: AddressService, private toast: ToastrService){
     this.modalForm = new FormGroup({
      number: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      state: new FormControl('', [Validators.required, Validators.minLength(3)]),
      city: new FormControl('', [Validators.required, Validators.minLength(3)]),
      postalCode: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      fullAddress: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]),
      isMain: new FormControl(false),
      place: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
    });
  }
  
  onSubmit(){
    console.log(this.modalForm.value);
    if (this.modalForm.invalid){
       this.modalForm.markAsTouched();
       return;
    }

    this.addressService.create(this.modalForm.value).subscribe({
    next: newAddress => {
      console.log('Saved:', newAddress);
      this.newAddress.emit(newAddress);
      this.toast.success('Address added successfully');
      this.bsModalRef.hide();
    },
    error: err => {
      console.error(err);
      console.log(err.error);
      this.toast.error('Failed to add address');
    }
  });
  }

}
