import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AccountService } from '../services/account-service';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss'
})
export class ChangePassword {

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

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.form.value.newPassword !== this.form.value.confirmPassword) {
      Swal.fire("Error", "New passwords do not match", "error");
      return;
    }

    this.accountService.changePassword(this.form.value).subscribe({
      next: () => Swal.fire("Success", "Password changed successfully", "success"),
      error: () => Swal.fire("Error", "Current password is incorrect", "error")
    });
  }
}
