import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';
import { AccountService } from '../../services/account-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputForm } from "../../input-form/input-form";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputForm],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register implements OnInit{

  
  constructor(private bc: BreadcrumbService, private accountService: AccountService){}

  registerForm = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    password: new FormControl(''),
    displayName: new FormControl('')
  });
  
  ngOnInit(): void {
   //this.bc.set('@register', 'Register in Site');
  }

  onSubmit(){
     if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.accountService.register(this.registerForm.getRawValue()).subscribe();
  }


}
