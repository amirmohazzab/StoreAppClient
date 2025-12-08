import { Component, OnInit } from '@angular/core';
import { IType } from '../../models/IType';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductTypeService } from '../../services/product-type-service';
import { AdminEditProductTypeModal } from '../../modal/admin-edit-product-type-modal/admin-edit-product-type-modal';

@Component({
  selector: 'app-admin-list-product-type',
  imports: [RouterModule, AdminEditProductTypeModal],
  templateUrl: './admin-list-product-type.html',
  styleUrl: './admin-list-product-type.scss'
})
export class AdminListProductType implements OnInit{

  productTypes: IType[] = [];
  editModalOpen = false;
      editModel: any = {};
    
       constructor(private productTypeService: ProductTypeService, private toast: ToastrService, private router: Router){}
    
       ngOnInit(): void {
        this.loadProductTypes();
      }
    
      loadProductTypes() {
        this.productTypeService.getAll().subscribe({
          next: res => {
            this.productTypes = res;
          }
        });
      }
    
        
     openEditModal(cat: any) {
    this.editModel = { ...cat }; // کپی جداگانه
    this.editModalOpen = true;
  }

  updateProductType(edited: any) {
    this.productTypeService.update(edited.id, edited).subscribe(() => {
      this.editModalOpen = false;
      this.loadProductTypes();  // رفرش جدول بدون رفرش صفحه
    });
  }
    
      delete(id: number) {
        if (!confirm('Delete this product type?')) return;
        console.log("DELETE id =", id);
    
        this.productTypeService.delete(id).subscribe({
          next: () => {
            this.toast.success('Product Type deleted');
            this.loadProductTypes();
          }
        });
      }
    
}
