import { Component } from '@angular/core';
import { IType } from '../../models/IType';
import { Router, RouterModule } from '@angular/router';
import { ProductTypeService } from '../../services/product-type-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-create-product-type',
  imports: [RouterModule, FormsModule],
  templateUrl: './admin-create-product-type.html',
  styleUrl: './admin-create-product-type.scss'
})
export class AdminCreateProductType {

  
  model: IType = {
    id: 0,
    title: '',
    description: '',
    summary: ''
  };

  constructor(
    private productTypeService: ProductTypeService,
    private router: Router
  ) {}

  save() {
    this.productTypeService.create(this.model).subscribe(() => {
      this.router.navigate(['/admin/productType']);
    });
  }
}
