import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IProduct } from '../models/IProduct';
import { CardShop } from '../card-shop/card-shop';
import { HomeService } from '../services/home-service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, CardShop],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {

  product: IProduct;

  featuredProducts = [
    { id: 1, title: 'Headphones', price: 89.99, pictureUrl: 'https://picsum.photos/250?random=1' },
    { id: 2, title: 'Smart Watch', price: 149.99, pictureUrl: 'https://picsum.photos/250?random=2' },
    { id: 3, title: 'Bluetooth Speaker', price: 59.99, pictureUrl: 'https://picsum.photos/250?random=3' },
    { id: 4, title: 'Tablet 10"', price: 299.99, pictureUrl: 'https://picsum.photos/250?random=4' },
  ];

  likedProducts = [
    { id: 5, title: 'Gaming Mouse', price: 39.99, pictureUrl: 'https://picsum.photos/250?random=5' },
    { id: 6, title: 'Keyboard', price: 89.99, pictureUrl: 'https://picsum.photos/250?random=6' },
    { id: 7, title: 'VR Headset', price: 199.99, pictureUrl: 'https://picsum.photos/250?random=7' }
  ];

  viewedProducts = [
    { id: 8, title: '4K Monitor', price: 249.99, pictureUrl: 'https://picsum.photos/250?random=8' },
    { id: 9, title: 'Portable SSD', price: 129.99, pictureUrl: 'https://picsum.photos/250?random=9' },
    { id: 10, title: 'Earbuds', price: 99.99, pictureUrl: 'https://picsum.photos/250?random=10' }
  ];

  categories = ['Electronics', 'Clothing', 'Home & Kitchen', 'Beauty', 'Toys', 'Sports'];

  allProducts: IProduct[] = [];
  liked: IProduct[] = [];
  viewed: IProduct[] = [];
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.loadData();
    //this.loadProducts();
  }

  loadData() {
    this.homeService.getFeatured().subscribe(res => {
      this.allProducts = res;
      console.log(this.allProducts);
    });
    this.homeService.getMostLiked(6).subscribe(res => {
      this.liked = res;
      console.log(this.liked);
    });
    this.homeService.getMostViewed(6).subscribe(res => {
      this.viewed = res;
      console.log(this.viewed);
    });
  }

//   loadProducts(categoryId?: number, brandId?: number, search?: string) {
//   this.homeService.getFeatured({ categoryId, brandId, search }).subscribe({
//     next: (res) => this.allProducts = res,
//     error: (err) => console.error('Error loading products:', err)
//   });
// }

// this.productService.getAll('likes').subscribe(res => {
//   this.mostLikedProducts = res;
// });

// this.productService.getAll('views').subscribe(res => {
//   this.mostViewedProducts = res;
// });

  addItemToBasket(){}

  toggleLike(){}

  viewDetails(product: any) {
    alert(`Viewing details for ${product.name}`);
  }
}
