import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HasPermissionDirective } from '../../directive/has-permission-directive';

@Component({
  selector: 'app-admin-sidebar',
  imports: [ReactiveFormsModule, CommonModule, RouterModule, HasPermissionDirective],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.scss'
})
export class AdminSidebar {

//   menu = {
//   products: false,
//   users: false,
//   productCategories: false,
// };

@Input() mobile: boolean = false;
@Input() open: boolean = true;

  productTypeMenuOpen: boolean = false;
  productBrandMenuOpen: boolean = false;
  productCategoryMenuOpen: boolean = false;
  productMenuOpen: boolean = false;
  userMenuOpen: boolean = false;
  orderMenuOpen: boolean = false;

  toggleProductMenu() {
    this.productMenuOpen = !this.productMenuOpen;
  }

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
  }

  toggleProductCategoryMenu() {
    this.productCategoryMenuOpen = !this.productCategoryMenuOpen;
  }

  toggleProductBrandMenu() {
    this.productBrandMenuOpen = !this.productBrandMenuOpen;
  }

  toggleProductTypeMenu() {
    this.productTypeMenuOpen = !this.productTypeMenuOpen;
  }

   toggleOrderMenu() {
    this.orderMenuOpen = !this.orderMenuOpen;
  }
}
