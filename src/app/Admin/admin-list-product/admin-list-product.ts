import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { IProduct } from '../../models/IProduct';
import { IAdminProduct } from '../../models/IAdminProduct';

@Component({
  selector: 'app-admin-list-product',
  imports: [RouterModule],
  templateUrl: './admin-list-product.html',
  styleUrl: './admin-list-product.scss'
})
export class AdminListProduct implements OnInit {

   products: IAdminProduct[] = [];

   constructor(private productService: ProductService, private toast: ToastrService, private router: Router){}

   ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: res => {
        this.products = res;
        console.log(this.products);
      }
    });
  }

  edit(id: number) {
    this.router.navigate(['/admin/product/edit', id]);
  }

  delete(id: number) {
    if (!confirm('Delete this product?')) return;

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.toast.success('Product deleted');
        this.loadProducts();
      }
    });
  }

  getImageUrl(pictureUrl: string | null | undefined): string {
    if (!pictureUrl) {
      return '../../../image/shopping-cart';
    }
    if (!pictureUrl.startsWith('http')) {
      return `https://localhost:7096${pictureUrl}`;
    }
    return pictureUrl;
  }

  Detail(id: number){
    this.router.navigate(['/admin/product/detail', id]);
  }


}
