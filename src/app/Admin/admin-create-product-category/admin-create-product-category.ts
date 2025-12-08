import { Component } from '@angular/core';
import { IAdminProductCategory } from '../../models/IAdminProductCategory';
import { ProductCategoryService } from '../../services/product-category-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-create-product-category',
  imports: [FormsModule],
  templateUrl: './admin-create-product-category.html',
  styleUrl: './admin-create-product-category.scss'
})
export class AdminCreateProductCategory {

  model: IAdminProductCategory = {
    id: 0,
    name: '',
  };

  constructor(
    private categoryService: ProductCategoryService,
    private router: Router
  ) {}

  save() {
    this.categoryService.create(this.model).subscribe(() => {
      this.router.navigate(['/admin/category']);
    });
  }
}
