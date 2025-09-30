import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop-detail',
  imports: [],
  templateUrl: './shop-detail.html',
  styleUrl: './shop-detail.scss'
})
export class ShopDetail implements OnInit{
  id: number;
  constructor(private shopService: ShopService, private route: ActivatedRoute){
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.shopService.getProduct(this.id).subscribe(res => console.log(res));
  }
}
