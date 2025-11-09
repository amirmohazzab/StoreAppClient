import { Component, HostListener, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-profile-layout',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatIconModule, RouterModule],
  templateUrl: './profile-layout.html',
  styleUrls: ['./profile-layout.scss']
})
export class ProfileLayout implements OnInit{

  sidenavOpen = true;
  //title = 'Personal Profile';
  breadcrumb = 'Personal Profile';

  title = '';
  currentBreadcrumb = '';
  isMobile = false;

  links = [
    { name: 'Personal Profile', href: '/profile', icon: 'person' },
    { name: 'My Baskets', href: '/profile/basket', icon: 'shopping_cart' },
    { name: 'My Orders', href: '/profile/order', icon: 'order' },
    { name: 'My Favorites', href: '/profile/like', icon: 'like' }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const current = this.links.find(l => this.router.url === l.href);
        if (current) {
          this.title = current.name;
          this.breadcrumb = current.name;
        }
      });
  }

  ngOnInit(): void {
    this.title = this.route?.snapshot?.firstChild?.data['title'] as string;
     this.checkScreenSize(); // برای بار اول هم بررسی کن
    console.log('isMobile:', this.isMobile);
  }

  onSelectLink(link: any) {
    this.router.navigate([link.href]);
    if (window.innerWidth < 768) {
      this.sidenavOpen = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  // 🔥 بررسی اندازه صفحه و تنظیم حالت mobile
  checkScreenSize(): void {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth < 768;

    // اگه از دسکتاپ رفتی به موبایل یا برعکس، sidenav رو تنظیم کن
    if (this.isMobile && !wasMobile) {
      this.sidenavOpen = false;
    } else if (!this.isMobile && wasMobile) {
      this.sidenavOpen = true;
    }

    console.log('isMobile:', this.isMobile);
  }
}