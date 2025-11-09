import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent, BreadcrumbService} from 'xng-breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  imports: [BreadcrumbComponent],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss'
})
export class Breadcrumb {

  bcLength = 0;
  constructor(private bc: BreadcrumbService){
    this.bc.breadcrumbs$.subscribe(breadcrumb => {
      this.bcLength = breadcrumb?.length;
    })
  }

  
}
