import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../../services/account-service';
import { ToastrService } from 'ngx-toastr';
import {BsModalRef } from 'ngx-bootstrap/modal';
import { UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms';
import { IAddress } from '../../models/Address';
import { CommonModule } from '@angular/common';
import { InputForm } from '../../input-form/input-form';


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

  constructor(public bsModalRef: BsModalRef, private accountService: AccountService, private toast: ToastrService){
     this.modalForm = new FormGroup({
      number: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      state: new FormControl('', [Validators.required, Validators.minLength(3)]),
      city: new FormControl('', [Validators.required, Validators.minLength(3)]),
      postalCode: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      fullAddress: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]),
      isMain: new FormControl(true)
    });
  }
  
  onSubmit(){
    // if (this.modalForm.invalid){
    //   this.modalForm.markAsTouched();
    //   return;
    // }
    this.accountService.addAddress(this.modalForm.value).subscribe(newAddress => {
      this.newAddress.emit(newAddress);
      this.toast.success('Address added successfully');
      this.bsModalRef.hide();
    });
  }

}
