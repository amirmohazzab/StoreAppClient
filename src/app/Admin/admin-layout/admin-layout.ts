import { Component, HostListener, Input } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AccountService } from '../../services/account-service';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../../models/User';
import { AdminHeader } from '../admin-header/admin-header';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  imports: [CommonModule, RouterModule, RouterOutlet, AdminHeader, AdminSidebar],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss'
})
export class AdminLayout {
  
  isMobile = false;
  sidebarOpen = true;

  constructor(private accountService: AccountService, private router: Router){
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  checkScreenSize() {
    this.isMobile = window.innerWidth < 992;

    if (this.isMobile) this.sidebarOpen = false;
    else this.sidebarOpen = true;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout(){
   this.accountService.logout();
  }
}
