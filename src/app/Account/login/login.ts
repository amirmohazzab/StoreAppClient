import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BreadcrumbService } from 'xng-breadcrumb';
import { AccountService } from '../../services/account-service';
import { InputForm } from "../../input-form/input-form";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit{

  modalForm: FormGroup;
  private returnUrl = '/';
  
  constructor(
    private bc: BreadcrumbService, 
    private accountService: AccountService, 
    private toast: ToastrService, 
    private router: Router, 
    private route: ActivatedRoute){
      this.modalForm = new FormGroup({
        phoneNumber: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
        password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)])
      })
    }



  loginForm = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  ngOnInit(): void {
    //this.bc.set('@login', 'Enter the Site');
    this.returnUrl = this.route.snapshot?.queryParamMap?.get('returnUrl') ?? '/';
  }

  onSubmit(){
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.accountService.login(this.loginForm.getRawValue()).subscribe((response) => {
      if (response) {
        this.router.navigateByUrl(this.returnUrl);
        this.toast.success('Login Successful');
      }
    });
  }


}
