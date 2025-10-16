import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-stepper',
  imports: [],
  templateUrl: './stepper.html',
  styleUrl: './stepper.scss'
})
export class Stepper extends MatStepper implements OnInit{

  @Input() LinearModeSelected : boolean = false;
  @Output() selectIndex = new EventEmitter<number>();

  ngOnInit(): void {
     this.linear = this.LinearModeSelected;
  }

  onClick(index: number){
    this.selectedIndex = index;
    this.selectIndex.emit(index);
  }

}
