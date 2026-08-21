import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AddressService } from '../services/address-service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IAddress } from '../models/Address';

@Component({
  selector: 'app-address-form',
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './address-form.html',
  styleUrl: './address-form.scss'
})
export class AddressForm {

  form!: FormGroup;
  id: number | null = null;
  loading = false;
  addresses: IAddress[] = [];

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get("id"));

    this.form = this.fb.group({
      place: ['', [Validators.required, Validators.minLength(2)]],
      state: ['', Validators.required],
      city: ['', Validators.required],
      number: ['', Validators.required],
      postalCode: ['', Validators.required],
      fullAddress: ['', [Validators.required, Validators.minLength(10)]],
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
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


  deleteAddress(id: number) {
  Swal.fire({
    title: 'Delete address?',
    text: 'This action cannot be undone.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Delete'
  }).then(result => {
    if (result.isConfirmed) {
      this.addressService.delete(id).subscribe(() => {
        this.addresses = this.addresses.filter(a => a.id !== id);

        Swal.fire(
          'Deleted!',
          'Address deleted successfully.',
          'success'
        );
      });
    }
  });
}
}
