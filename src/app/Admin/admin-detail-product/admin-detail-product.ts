import { Component, OnInit } from '@angular/core';
import { IAdminProduct } from '../../models/IAdminProduct';
import { ProductService } from '../../services/product-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-detail-product',
  imports: [],
  templateUrl: './admin-detail-product.html',
  styleUrl: './admin-detail-product.scss'
})
export class AdminDetailProduct implements OnInit{

  product: IAdminProduct;

  constructor(private productService: ProductService, private route: ActivatedRoute){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(id).subscribe(res => {
      this.product = res;
      console.log(this.product);
    });
  }

  getImageUrl(pictureUrl: string | null | undefined ): string {
    if (!pictureUrl) {
      return '../../../image/shopping-cart';
    }
    if (!pictureUrl.startsWith('http')) {
      return `https://localhost:7096${pictureUrl}`;
    }
    return pictureUrl;
  }
}
