import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product-service';
import { IAdminProductCategory } from '../../models/IAdminProductCategory';
import { IBrand } from '../../models/IBrand';
import { IType } from '../../models/IType';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductCategoryService } from '../../services/product-category-service';
import { ProductTypeService } from '../../services/product-type-service';
import { ProductBrandService } from '../../services/product-brand-service';

@Component({
  selector: 'app-admin-update-product',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-update-product.html',
  styleUrl: './admin-update-product.scss'
})
export class AdminUpdateProduct {

  form: FormGroup;
  mainImageFile: File | null = null;
  mainImagePreview: string | null = null;

  categories: IAdminProductCategory[] = [];
  productBrands: IBrand[] = [];
  productTypes: IType[] = [];

  galleryPreview: string[] = [];
  galleryFiles: File[] = [];
  removedGalleryUrls: string[] = [];  

  productId!: number;

   constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private productBrandService: ProductBrandService,
    private productTypeService: ProductTypeService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    // گرفتن آی دی محصول از مسیر
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    // بارگذاری داده‌های select
    this.loadCategories();
    this.loadBrands();
    this.loadTypes();

    // بارگذاری اطلاعات محصول برای prefill
    this.productService.getProduct(this.productId).subscribe(product => {
      console.log("product:", product);
      this.form.patchValue({
        title: product.title,
        price: product.price,
        oldPrice: product.oldPrice,
        description: product.description,
        summary: product.summary,
        productBrand: product.productBrandId,
        productType: product.productTypeId,
        productCategory: product.categoryId,
        colors: product.colors?.join(','),
        sizes: product.sizes?.join(',')
      });

      // پیش‌نمایش تصاویر موجود
      this.mainImagePreview = product.mainImage ? this.getImageUrl(product.mainImage) : null;
      this.galleryPreview = product.gallery?.map(img => this.getImageUrl(img)) || [];
    });
  }


  createForm() {
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

  loadCategories() {
    this.productCategoryService.getAll().subscribe(res => this.categories = res);
  }

  loadBrands() {
    this.productBrandService.getAll().subscribe(res => this.productBrands = res);
  }

  loadTypes() {
    this.productTypeService.getAll().subscribe(res => this.productTypes = res);
  }

  onMainImageSelected(event: any) {
    const file = event.target.files[0];
    this.mainImageFile = file;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.mainImagePreview = e.target.result;
      reader.readAsDataURL(file);
    }
  }

  // onGallerySelected(event: any) {
  //   this.galleryFiles = Array.from(event.target.files);
  //   this.galleryPreview = [];

  //   for (let file of this.galleryFiles) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => this.galleryPreview.push(e.target.result);
  //     reader.readAsDataURL(file);
  //   }
  // }

  onGallerySelected(event: any) {
  const selectedFiles = Array.from(event.target.files) as File[];

  for (let file of selectedFiles) {
    this.galleryFiles.push(file);

    const reader = new FileReader();
    reader.onload = (e: any) => this.galleryPreview.push(e.target.result);
    reader.readAsDataURL(file);
  }
}

removeGalleryImage(index: number) {

  const removed = this.galleryPreview[index];
  if (!removed.startsWith('data:image')) {
    this.removedGalleryUrls.push(removed);
  }
  this.galleryPreview.splice(index, 1);

  // const item = this.galleryPreview[index];

  // // اگر عکس قدیمی باشد (URL)
  // if (!item.startsWith('data:image')) {
  //   this.removedGalleryUrls.push(item);
  // }

  // // از لیست نمایش حذف کن
  // this.galleryPreview.splice(index, 1);

  // // اگر عکس جدید باشد → فایلش را هم حذف کن
  // // if (this.galleryFiles[index]) {
  // //   this.galleryFiles.splice(index, 1);
  // // }
  // if (index < this.galleryFiles.length) this.galleryFiles.splice(index, 1);
}

  // getImageUrl(pictureUrl: string | null): string {
  //   if (!pictureUrl) return '';
  //   if (!pictureUrl.startsWith('http')) return `https://localhost:7096/images/products/${pictureUrl}`;
  //   return pictureUrl;
  // }

  getImageUrl(pictureUrl: string | null | undefined): string {
    if (!pictureUrl) {
      return '../../../image/shopping-cart';
    }
    if (!pictureUrl.startsWith('http')) {
      return `https://localhost:7096${pictureUrl}`;
    }
    return pictureUrl;
  }

  isBase64(str: string): boolean {
    return str.startsWith('data:image');
  }

  submit() {
  if (this.form.invalid) {
    this.toast.error("Please fill the form");
    return;
  }

  const formData = new FormData();
  formData.append("Id", this.productId.toString());
  formData.append("Title", this.form.value.title);
  formData.append("Price", this.form.value.price.toString());
  formData.append("OldPrice", this.form.value.oldPrice?.toString() ?? "");
  formData.append("Description", this.form.value.description ?? "");
  formData.append("Summary", this.form.value.summary ?? "");
  formData.append("ProductBrandId", this.form.value.productBrand);
  formData.append("ProductTypeId", this.form.value.productType);
  formData.append("CategoryId", this.form.value.productCategory);

  // main image (فایل جدید اگر هست)
  if (this.mainImageFile) {
    formData.append("NewMainImage", this.mainImageFile);
  }

  // new gallery files (فایل‌های جدید)
  for (const file of this.galleryFiles) {
    formData.append("NewGalleryImages", file);
  }

  // removed gallery images (آدرس‌هایی که حذف شده‌اند)
  for (const url of this.removedGalleryUrls) {
    formData.append("RemovedGallery", url);
  }

  // colors
  if (this.form.value.colors) {
    // this.form.value.colors.split(',').forEach(c => {
    //   formData.append("Colors", c.trim());
    // });
    const uniqueColors = Array.from(
      new Set((this.form.value.colors as string).split(',').map(c => c.trim()))
    );
    uniqueColors.forEach(c => formData.append("Colors", c));
  }

  // sizes
  if (this.form.value.sizes) {
    // this.form.value.sizes.split(',').forEach(s => {
    //   formData.append("Sizes", s.trim());
    // });
       const uniqueSizes = Array.from(new Set((this.form.value.sizes as string).split(',').map(s => s.trim()))
      );
      uniqueSizes.forEach(s => formData.append("Sizes", s));
  }

  // ارسال به API
  this.productService.updateProduct(formData).subscribe({
    next: () => {
      this.toast.success("Product updated");
      this.router.navigate(['/admin/product']);
    },
    error: (err) => {
      console.log(err);
      this.toast.error("Update failed");
    }
  });
}


}
