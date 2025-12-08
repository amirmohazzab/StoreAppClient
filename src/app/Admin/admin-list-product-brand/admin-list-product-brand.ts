import { Component, OnInit } from '@angular/core';
import { IBrand } from '../../models/IBrand';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductBrandService } from '../../services/product-brand-service';
import { AdminEditProductBrandModal } from '../../modal/admin-edit-product-brand-modal/admin-edit-product-brand-modal';

@Component({
  selector: 'app-admin-list-product-brand',
  imports: [RouterModule, AdminEditProductBrandModal],
  templateUrl: './admin-list-product-brand.html',
  styleUrl: './admin-list-product-brand.scss'
})
export class AdminListProductBrand implements OnInit{

   productBrands: IBrand[] = [];
   editModalOpen = false;
      editModel: any = {};
    
       constructor(private productBrandService: ProductBrandService, private toast: ToastrService, private router: Router){}
    
       ngOnInit(): void {
        this.loadProductBrands();
      }
    
      loadProductBrands() {
        this.productBrandService.getAll().subscribe({
          next: res => {
            this.productBrands = res;
          }
        });
      }
    
      
     openEditModal(cat: any) {
    this.editModel = { ...cat }; // کپی جداگانه
    this.editModalOpen = true;
  }

  updateProductBrand(edited: any) {
    this.productBrandService.update(edited.id, edited).subscribe(() => {
      this.editModalOpen = false;
      this.loadProductBrands();  // رفرش جدول بدون رفرش صفحه
    });
  }
    
      delete(id: number) {
        if (!confirm('Delete this product brand?')) return;
    
        this.productBrandService.delete(id).subscribe({
          next: () => {
            this.toast.success('Product Brand deleted');
            this.loadProductBrands();
          }
        });
      }
    
     
}
