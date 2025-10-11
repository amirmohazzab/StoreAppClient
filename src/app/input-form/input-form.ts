import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  imports: [CommonModule],
  templateUrl: './input-form.html',
  styleUrl: './input-form.scss'
})
export class InputForm implements OnInit, ControlValueAccessor{

  @ViewChild('input', { static: true }) input: ElementRef;
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() label = '';
  disabled = false;

   constructor(@Self() @Optional() public controlDir: NgControl) {
    if (controlDir) this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    const control = this.controlDir.control;
    const validators = control.validator ? [control.validator] : [];
    const asyncValidator = control.asyncValidator ? [control.asyncValidator] : [];
    control.setValidators(validators);
    control.setAsyncValidators(asyncValidator);
    control.updateValueAndValidity();
  }

  onChange(event: any) {}
  onTouched(event?: any) {}

  writeValue(obj: any): void {
    this.controlDir.getError('');
    this.input.nativeElement.value = obj || '';
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
