import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { IAdminProductCategory } from '../../models/IAdminProductCategory';
import { ProductCategoryService } from '../../services/product-category-service';
import { IBrand } from '../../models/IBrand';
import { IType } from '../../models/IType';
import { ProductTypeService } from '../../services/product-type-service';
import { ProductBrandService } from '../../services/product-brand-service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-admin-create-product',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-create-product.html',
  styleUrl: './admin-create-product.scss'
})
export class AdminCreateProduct implements OnInit{

  form: FormGroup;
  galleryFiles: File[] = [];
  mainImageFile: File | null = null;

  categories: IAdminProductCategory[] = [];
  selectedCategoryId!: number;

   productBrands: IBrand[] = [];
   selectedProductBrandId!: number;

   productTypes: IType[] = [];
   selectedProductTypeId!: number;

   mainImagePreview: string | null = null;
   galleryPreview: string[] = [];

  constructor(
    private productService: ProductService, 
    private fb: FormBuilder, 
    private toast: ToastrService, 
    private router: Router, 
    private productCategoryService: ProductCategoryService, 
    private productBrandService: ProductBrandService, 
    private productTypeService: ProductTypeService){
    this.createProduct()
  }
  ngOnInit(): void {
     this.productCategoryService.getAll().subscribe(res => {
      this.categories = res;
      console.log('categories', this.categories);
    });

    this.productBrandService.getAll().subscribe(res => {
      this.productBrands = res;
      console.log('brands', this.productBrands);
    });

    this.productTypeService.getAll().subscribe(res => {
      this.productTypes = res;
      console.log('types', this.productTypes);
    });
  }

  createProduct(){
    this.form = this.fb.group({
      title: ['', Validators.required],
      price: [0, Validators.required],
      oldPrice: [0],
      description: ['', Validators.required],
      summary: ['', Validators.required],
      productBrand: [null, Validators.required],
      productType: [null, Validators.required],
      productCategory: [null, Validators.required],
      colors: [''],
      sizes: ['']
    });
  }

  onMainImageSelected(event: any) {
  const file = event.target.files[0];
  this.mainImageFile = file;

  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.mainImagePreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

onGallerySelected(event: any) {
  this.galleryFiles = Array.from(event.target.files);

  this.galleryPreview = [];

  for (let file of this.galleryFiles) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.galleryPreview.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }
}

 submit() {
    console.log(this.form.value);
    if (this.form.invalid || !this.mainImageFile) {
      this.toast.error('Fill form completely');
      return;
    }
    
    const dto = {
      title: this.form.value.title,
      price: this.form.value.price,
      oldPrice: this.form.value.oldPrice,
      description: this.form.value.description,
      summary: this.form.value.summary,

      productBrandId: Number(this.form.value.productBrand),
      productTypeId: Number(this.form.value.productType),
      categoryId: Number(this.form.value.productCategory),
      mainImage: this.mainImageFile,
      gallery: this.galleryFiles,
      colors: this.form.value.colors?.split(','),
      sizes: this.form.value.sizes?.split(',')
    };

    this.productService.createProduct(dto).subscribe({
      next: () => {
        this.toast.success('Product created');
        this.router.navigate(['/admin/product/']);
      }
    });
  };

}