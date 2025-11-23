import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reviews-list',
  imports: [DatePipe],
  templateUrl: './reviews-list.html',
  styleUrl: './reviews-list.scss'
})
export class ReviewsList {

  @Input() reviews: any[] = [];
}
