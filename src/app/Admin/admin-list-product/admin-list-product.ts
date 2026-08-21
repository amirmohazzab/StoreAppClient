import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { IProduct } from '../../models/IProduct';
import { IAdminProduct, ProductParams } from '../../models/IAdminProduct';
import { environment } from '../../../environments/environment';
import { IPagination } from '../../models/IPagination';
import { PaginationComponent } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-list-product',
  imports: [RouterModule, PaginationComponent, FormsModule],
  templateUrl: './admin-list-product.html',
  styleUrl: './admin-list-product.scss'
})
export class AdminListProduct implements OnInit {

   //products: IAdminProduct[] = [];
   productParams = new ProductParams();
   public data? : IPagination<IAdminProduct>;
   totalCount = 0;
   search: "";
   @ViewChild('search', {static: false}) searchItem: ElementRef

   constructor(private productService: ProductService, private toast: ToastrService, private router: Router){}

  ngOnInit(): void {
    this.loadProducts();
  }

   loadProducts() {
    this.productService.getProducts(this.productParams.pageNumber, this.productParams.pageSize, this.productParams.search)
      .subscribe(res => {
        this.data = res;
        this.totalCount = res.totalCount;
    });
   }

  // loadProducts() {
  //   this.productService.getProducts().subscribe({
  //     next: res => {
  //       this.products = res;
  //       console.log(this.products);
  //     }
  //   });
  // }

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
      return `${environment.imageBaseUrl}${pictureUrl}`;
    }
    return pictureUrl;
  }

  Detail(id: number){
    this.router.navigate(['/admin/product/detail', id]);
  }

  onPageChange(event: any){
     this.productParams.pageNumber = event.page;
     this.loadProducts();
  }

  //  onSearch() {
  //   this.productParams.pageNumber = 1; // IMPORTANT
  //   this.loadProducts();
  // }

  onSearch(){
    this.productParams.search = this.searchItem.nativeElement.value;
    this.productParams.pageNumber = 1;
    this.loadProducts();
   }


}
