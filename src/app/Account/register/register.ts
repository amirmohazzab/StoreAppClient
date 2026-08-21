import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';
import { AccountService } from '../../services/account-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
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
    password: new FormControl('', [
                  Validators.required,
                  Validators.minLength(6),
                  Validators.pattern(
                    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).+$'
                  )
                ]),
    repeatPassword: new FormControl('', [Validators.required]),
    displayName: new FormControl({value: '', disabled: false}, [Validators.required, Validators.minLength(3)]),
    email: new FormControl({value: '', disabled: false}, [Validators.required, Validators.maxLength(100)])
  },
  {
    validators: this.passwordMatchValidator
  }
  );
  
  ngOnInit(): void {
   //this.bc.set('@register', 'Register in Site');
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const repeatPassword = form.get('repeatPassword')?.value;

    return password === repeatPassword
      ? null
      : { passwordMismatch: true };
  }

  onSubmit(){
     if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const { repeatPassword, ...data } = this.registerForm.getRawValue();
    this.accountService.register(data)
    .subscribe({
      next: () => {
        this.toast.success('Register successful');
      },
      error: err => {
        this.toast.error(err.error.message || 'Register failed');
      }
    });
  }


}
