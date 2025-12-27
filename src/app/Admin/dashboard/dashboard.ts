import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { UserService } from '../../services/user-service';
import { ProductCategoryService } from '../../services/product-category-service';
import { AdminProductReviewList } from "../admin-product-review-list/admin-product-review-list";
import { IMostReviewedProducts, IReview } from '../../models/IReview';
import { RouterModule } from '@angular/router';
import { IMostAddedToBasket } from '../../models/Basket';
import { IMostSoldProduct, IMostWishlistedProduct } from '../../models/IAdminProduct';
import { AdminOrderService } from '../../services/admin-order-service';
import { IPaymentStatus } from '../../models/IAdminOrder';

@Component({
  selector: 'app-dashboard',
  imports: [ AdminProductReviewList, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit{
  
  loading: boolean = false;
  wishlist: any[] = [];
  usersCount: number;
  productsCount!: number;
  categoriesCount!: number;
  wishlistCount!: number;
  mostReviewedProducts: IMostReviewedProducts[] = [];
  mostAddedToBasket: IMostAddedToBasket[] = [];
  mostSoldProducts: IMostSoldProduct[] = [];
  mostWishListedProducts: IMostWishlistedProduct[] = [];
  atLeastOneReview: number;
  paidPaymentStatusNumber: number;
  pendingPaymentStatusNumber: number;
  totalRevenue: number;

  constructor(
    private productService: ProductService, 
    private userService: UserService, 
    private productCategoryService: ProductCategoryService, private adminOrderService: AdminOrderService){}

  ngOnInit(): void {
    this.loadData();
  }

 loadData(){
      this.loading = true;

    this.productService.getAtLeastOneWishlisted().subscribe(res => {
      this.wishlistCount = res;
    });

    this.productCategoryService.getAll().subscribe(res => {
       this.categoriesCount = res.length;
      });

      this.userService.getUsersForDasboard().subscribe(res => {
       this.usersCount = res;
      });

    this.productService.getProducts().subscribe(res => {
      this.productsCount = res.length;
     });

    this.productService.getMostWishlistedProducts(5).subscribe(res => {
      this.mostWishListedProducts = res;
    });

    this.productService.getMostReviewedProducts().subscribe(res => {
      this.mostReviewedProducts = res;
    });

    this.productService.getMostAddedToBasket()
      .subscribe({
        next: res => {
          this.mostAddedToBasket = res;
        }
    });

     this.productService.getMostSoldProducts().subscribe(res => {
      this.mostSoldProducts = res;
    });

    this.productService.getAtLeastOneReview().subscribe(res => {
      this.atLeastOneReview = res;
    });

     this.adminOrderService.getPaymentStatus().subscribe(res => {
      this.paidPaymentStatusNumber = res.paidCount;
      this.pendingPaymentStatusNumber = res.pendingCount;
    });

    this.adminOrderService.getTotalRevenue().subscribe(res => {
      this.totalRevenue = res;
      console.log(this.totalRevenue);
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



}
