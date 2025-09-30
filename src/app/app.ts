import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./footer/footer";
import { Navbar } from "./navbar/navbar";
import { RouterModule } from '@angular/router';
import { Shop } from './shop/shop';
import { CommonModule } from '@angular/common';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import {PaginationModule} from 'ngx-bootstrap/pagination';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    Footer, 
    Navbar, 
    RouterModule, 
    Shop, 
    CommonModule, 
    MatSidenavContainer, 
    MatSidenavContent, 
    MatSidenav, 
    PaginationModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App{
  protected title = 'StoreAppClient';

}
