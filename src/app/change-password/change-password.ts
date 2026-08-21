import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AccountService } from '../services/account-service';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss'
})
export class ChangePassword implements OnInit{

 form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) {
      this.form = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  });
  }
  ngOnInit(): void {
    console.log("Change password component loaded");
  }

  submit() {
     console.log("SUBMIT TRIGGERED");
  console.log(this.form.value);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.form.value.newPassword !== this.form.value.confirmPassword) {
      Swal.fire("Error", "New passwords do not match", "error");
      return;
    }
    
    const data = {
      currentPassword: this.form.value.currentPassword,
      newPassword: this.form.value.newPassword
    };

    this.accountService.changePassword(data).subscribe({
      next: (res: any) => {

        const user = JSON.parse(localStorage.getItem('user_token')!);
        this.accountService.setCurrentUser({...user, token: res.token});
        this.form.reset();
        Swal.fire("Success", "Password changed successfully", "success");
      },
      // error: () =>
      //   Swal.fire("Error", "Current password is incorrect", "error")
      error: (err) => {
        console.log("FULL ERROR:", err);

        const errors = err?.error?.errors;

        let message = "Unknown error";

        if (Array.isArray(errors)) {
          message = errors.join(", ");
        } else if (typeof errors === 'string') {
          message = errors;
        } else if (err?.error?.message) {
          message = err.error.message;
        }

        Swal.fire("Error", message, "error");
      }
    });
  }
}
