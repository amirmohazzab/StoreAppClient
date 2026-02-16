import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home-service';

@Component({
  selector: 'app-about-us',
  imports: [],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss'
})
export class AboutUs implements OnInit{

  about: any;

  constructor(private homeService: HomeService){}

  ngOnInit(): void {
    this.homeService.getAboutUs().subscribe(res => this.about = res)
  }

}
