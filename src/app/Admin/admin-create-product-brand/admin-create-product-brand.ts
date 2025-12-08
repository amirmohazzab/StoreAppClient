import { Component } from '@angular/core';
import { IBrand } from '../../models/IBrand';
import { Router, RouterModule } from '@angular/router';
import { ProductBrandService } from '../../services/product-brand-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-create-product-brand',
  imports: [RouterModule, FormsModule],
  templateUrl: './admin-create-product-brand.html',
  styleUrl: './admin-create-product-brand.scss'
})
export class AdminCreateProductBrand {

  
    model: IBrand = {
      id: 0,
      title: '',
      description: '',
      summary: ''
    };
  
    constructor(
      private productBrandService: ProductBrandService,
      private router: Router
    ) {}
  
    save() {
      this.productBrandService.create(this.model).subscribe(() => {
        this.router.navigate(['/admin/productBrand']);
      });
    }
}
