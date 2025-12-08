import { Component } from '@angular/core';
import { AddressService } from '../services/address-service';
import Swal from 'sweetalert2';
import { IAddress } from '../models/Address';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-address-list',
  imports: [RouterModule],
  templateUrl: './user-address-list.html',
  styleUrl: './user-address-list.scss'
})
export class UserAddressList {

   addresses: IAddress[] = [];
  loading = true;

  constructor(private addressService: AddressService, private router: Router) {}

  ngOnInit(): void {
    this.loadAddresses();
  }

  loadAddresses() {
    this.addressService.getAll().subscribe(res => {
      this.addresses = res;
      this.loading = false;
    });
  }

  deleteAddress(id: number) {
    Swal.fire({
      title: "Delete Address?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete"
    }).then(result => {
      if (result.isConfirmed) {
        this.addressService.delete(id).subscribe(() => {
          Swal.fire("Deleted!", "Address removed successfully.", "success");
          this.loadAddresses();
        });
      }
    });
  }

  edit(id: number) {
    this.router.navigate(['/profile/address/edit', id]);
  }

  create() {
    this.router.navigate(['/profile/address/create']);
  }

}
