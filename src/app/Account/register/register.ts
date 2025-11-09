import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';
import { AccountService } from '../../services/account-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputForm } from "../../input-form/input-form";
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputForm],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register implements OnInit{

  private returnUrl = '/';

  constructor(
    private bc: BreadcrumbService, 
    private accountService: AccountService, 
    private toast: ToastrService,
    private route: ActivatedRoute,
    private router: Router){}

  registerForm = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    displayName: new FormControl({value: '', disabled: false}, [Validators.required, Validators.minLength(3)])
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
