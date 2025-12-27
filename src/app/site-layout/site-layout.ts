import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { Breadcrumb } from '../breadcrumb/breadcrumb';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { BusyService } from '../services/busy-service';

@Component({
  selector: 'app-site-layout',
  imports: [Navbar, Footer, Breadcrumb, NgxSpinnerComponent, RouterOutlet, AsyncPipe],
  templateUrl: './site-layout.html',
  styleUrl: './site-layout.scss'
})
export class SiteLayout {

  constructor(private busyService: BusyService){}

    get busy$() {
      return this.busyService.busy$;
    }
}
