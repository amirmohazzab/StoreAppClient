import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';


@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [MatStepper],
  templateUrl: './stepper.html',
  styleUrls: ['./stepper.scss']
})
export class Stepper {

  @Input() linear = false;
  @Output() selectIndex = new EventEmitter<number>();

  @ViewChild('internalStepper') internalStepper!: MatStepper;

  next(): void {
    this.internalStepper?.next();
  }

  previous(): void {
    this.internalStepper?.previous();
  }

  get selectedIndex(): number {
    return this.internalStepper ? this.internalStepper.selectedIndex : 0;
  }

  set selectedIndex(i: number) {
    if (this.internalStepper) this.internalStepper.selectedIndex = i;
  }

  onClick(index: number): void {
    if (this.internalStepper) {
      this.internalStepper.selectedIndex = index;
      this.selectIndex.emit(index);
    }
  }

}
