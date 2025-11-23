import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ShopService } from '../services/shop-service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../models/IProduct';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { BreadcrumbService } from 'xng-breadcrumb';
import { CardShop } from '../card-shop/card-shop';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BasketService } from '../services/basket-service';
import { IReview } from '../models/IReview';
import { trigger, style, transition, animate } from '@angular/animations';
import { ProductGallery } from '../product-gallery/product-gallery';
import { ProductSkeleton } from '../product-skeleton/product-skeleton';
import { ProductInfo } from '../product-info/product-info';
import { ProductRelated } from '../product-related/product-related';
import { ProductTabs } from '../product-tabs/product-tabs';

@Component({
  selector: 'app-shop-detail',
  imports: [FormsModule, 
            CommonModule, 
            ReactiveFormsModule,
            CardShop, DecimalPipe],
  templateUrl: './shop-detail.html',
  styleUrl: './shop-detail.scss',
   animations: [
     trigger('fadeIn', [
       transition(':enter', [
         style({ opacity: 0, transform: 'translateY(8px)' }),
         animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
       ])
     ])
   ]
})
export class ShopDetail implements OnInit{  
  public product : IProduct;
  id: number;
  relatedProducts: IProduct[] = [];
  selectedSize?: string;
  selectedColor?: string;
  quantity = 1;
  public reviews: IReview[] = [];
  public newReview = { rating: 5, comment: '' };
  selectedImage?: string | null = null;
  activeTab: string = 'description';
  loading: boolean = true;
  isDark: boolean = false
  reviewForm: FormGroup;
  averageRating: number = 0;

  constructor(
    private shopService: ShopService, 
    private route: ActivatedRoute, 
    private router: Router,
    private toast: ToastrService,
    private title: Title,
    private bc: BreadcrumbService,
    private basketService: BasketService,
     private cd: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.load();
    this.loadReviews();
    this.reviewForm = new FormGroup({
      rating: new FormControl(null, Validators.required),
      comment: new FormControl('', Validators.required)
    });
  }

  load(){
    this.loading = true;
    this.shopService.getProduct(this.id).subscribe(res => {
      if (res){
        this.product = res;
        this.selectedImage = res.pictureUrl;
        this.shopService.incrementViewCount(this.id).subscribe();
        this.loadRelatedProducts();
        this.loading = false;
        this.title.setTitle(res?.title);
        this.bc.set('@ProductDetail', res?.title);
      } else {
        this.router.navigateByUrl('/notFound');
        this.toast.error("Product not found");
      }
    }, 
    (error) => {
      this.loading = false;
      this.router.navigateByUrl('/notFound');
        this.toast.error("product not found");
    }
  )
  }

   toggleLike(product: IProduct) {
    if (!this.product) return;
    this.shopService.toggleLike(product.id).subscribe({
      next: (res: any) => {
        product.liked = res.liked;
        product.likeCount = res.likeCount;
     
        this.toast.info(
          res.liked ? 'Added to favorites ❤️' : 'Removed from favorites'
        );
        //this.likedChanged.emit(product);
      }
    });
  }

  loadRelatedProducts() {
    this.shopService.getRelatedProducts(this.id).subscribe({
      next: (res) => this.relatedProducts = res
    });
  }

  changeMainImage(imgUrl: string) {
    this.product.pictureUrl = imgUrl;
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  addToBasket() {
    if (!this.product) return;
    this.basketService.addItemToBasket(this.product, this.quantity);
    this.toast.success('Product added to basket');
  }

loadReviews() {
  this.shopService.getReviews(this.id).subscribe({
    next: (res) => {
      this.reviews = res;
      this.calculateAverageRating();
    }
  });
}

submitReview() {
  if (this.reviewForm.invalid) return;

  this.shopService.addReview(this.id, this.reviewForm.value).subscribe({
    next: (createdReview: IReview) => {
      this.toast.success('Your review has been submitted');
      this.reviews = [...this.reviews, createdReview];
      this.loadReviews();
      this.loadProduct();
      //this.product.reviewCount += 1;
      this.calculateAverageRating();
      this.reviewForm.reset({ rating: 5, comment: '' });
    }
  });
}


getImageUrl(pictureUrl: string | null | undefined): string {
  if (!pictureUrl) {
    return '../../../image/shopping-cart';
  }
  if (!pictureUrl.startsWith('http')) {
    return `https://localhost:7096/images/products/${pictureUrl}`;
  }
  return pictureUrl;
}

loadProduct() {
  this.shopService.getProduct(this.id).subscribe({
    next: (res) => {
      this.product = res;
    }
  });
}

calculateAverageRating() {
  if (!this.reviews || this.reviews.length === 0) {
    this.averageRating = 0;
    return;
  }

  const total = this.reviews.reduce((sum, r) => sum + r.rating, 0);
  this.averageRating = total / this.reviews.length;
}

 getStars(): number[] {
  return [1, 2, 3, 4, 5];
}

isStarFilled(star: number, rating: number): 'full' | 'half' | 'empty' {
  if (rating >= star) return 'full';
  if (rating >= star - 0.5) return 'half';
  return 'empty';
}

}

