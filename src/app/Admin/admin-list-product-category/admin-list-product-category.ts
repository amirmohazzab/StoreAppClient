import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { IAdminProductCategory } from '../../models/IAdminProductCategory';
import { ProductCategoryService } from '../../services/product-category-service';
import { AdminEditProductCategoryModal } from '../../modal/admin-edit-product-category-modal/admin-edit-product-category-modal';

@Component({
  selector: 'app-admin-list-product-category',
  imports: [RouterModule, AdminEditProductCategoryModal],
  templateUrl: './admin-list-product-category.html',
  styleUrl: './admin-list-product-category.scss'
})
export class AdminListProductCategory implements OnInit{

    categories: IAdminProductCategory[] = [];
     editModalOpen = false;
      editModel: any = {};
  
     constructor(private productCategoryService: ProductCategoryService, private toast: ToastrService, private router: Router){}
  
     ngOnInit(): void {
      this.loadProductCategories();
    }
  
    loadProductCategories() {
      this.productCategoryService.getAll().subscribe({
        next: res => {
          this.categories = res;
        }
      });
    }
  
     openEditModal(cat: any) {
    this.editModel = { ...cat }; // کپی جداگانه
    this.editModalOpen = true;
  }

  updateCategory(edited: any) {
    this.productCategoryService.update(edited.id, edited).subscribe(() => {
      this.editModalOpen = false;
      this.loadProductCategories();  // رفرش جدول بدون رفرش صفحه
    });
  }
  
    delete(id: number) {
      if (!confirm('Delete this category?')) return;
  
      this.productCategoryService.delete(id).subscribe({
        next: () => {
          this.toast.success('Category deleted');
          this.loadProductCategories();
        }
      });
    }
  
}
