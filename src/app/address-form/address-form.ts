import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '../services/address-service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-address-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './address-form.html',
  styleUrl: './address-form.scss'
})
export class AddressForm {

  form!: FormGroup;
  id: number | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get("id"));

    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      state: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(10)]],
    });

    if (this.id) {
      this.loading = true;
      this.addressService.getById(this.id).subscribe(res => {
        this.form.patchValue(res);
        this.loading = false;
      });
    }
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;

    if (this.id) {
      this.addressService.update(this.id, data).subscribe(() => {
        Swal.fire("Updated!", "Address updated successfully.", "success");
        this.router.navigate(['/profile/address']);
      });

    } else {
      this.addressService.create(data).subscribe(() => {
        Swal.fire("Created!", "New address added successfully.", "success");
        this.router.navigate(['/profile/address']);
      });
    }
  }
}
