import { CommonModule } from '@angular/common';
import { Component, ElementRef, forwardRef, inject, Input, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-form.html',
  styleUrl: './input-form.scss',
//   providers: [{
//   provide: NG_VALUE_ACCESSOR,
//   useExisting: forwardRef(() => InputForm),
//   multi: true
// }]
})
export class InputForm implements OnInit, ControlValueAccessor{

  controlDir = inject(NgControl, { optional: true, self: true });
  
  @ViewChild('input', { static: true }) input: ElementRef;
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() label = '';
  disabled = false;

  //  constructor(@Self() @Optional() public controlDir: NgControl) {
  //   if (controlDir) this.controlDir.valueAccessor = this;
  // }

  ngOnInit(): void {
    if (this.controlDir) {
      const control = this.controlDir.control;
      const validators = control.validator ? [control.validator] : [];
      const asyncValidator = control.asyncValidator ? [control.asyncValidator] : [];
      control.setValidators(validators);
      control.setAsyncValidators(asyncValidator);
      control.updateValueAndValidity();
    }
  }

  onChange(event: any) {}
  onTouched(event?: any) {}

  writeValue(obj: any): void {
    this.controlDir.getError('');
    if (this.input) {
      this.input.nativeElement.value = obj ?? '';
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }
  

}
