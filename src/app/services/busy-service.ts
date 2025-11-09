import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  
  private count = 0;
  private _busy = new BehaviorSubject<boolean>(false);
  busy$ = this._busy.asObservable();

  private spinnerVisible = false;
  private showTimer: any;
  private hideTimer: any;

  constructor(private spinner: NgxSpinnerService) {}

  showBusy() {
    this.count++;

    // فقط وقتی spinner نمایش داده نشده، تایمر شروع کن
    if (!this.spinnerVisible) {
      clearTimeout(this.showTimer);
      this.showTimer = setTimeout(() => {
        if (this.count > 0) {
          this.spinnerVisible = true;
          this._busy.next(true);
          this.spinner.show(undefined, {
            type: 'square-jelly-box',
            size: 'medium',
            bdColor: 'rgba(0,0,0,0.6)',
            color: '#fff',
            fullScreen: true
          });
        }
      }, 400); // 👈 فقط اگه درخواست بیشتر از 400ms طول بکشه، spinner نشون داده میشه
    }
  }

  hideBusy() {
    this.count--;

    if (this.count <= 0) {
      this.count = 0;
      clearTimeout(this.showTimer);

      // spinner رو کمی با تأخیر مخفی کن تا flicker نشه
      clearTimeout(this.hideTimer);
      this.hideTimer = setTimeout(() => {
        if (this.spinnerVisible) {
          this.spinnerVisible = false;
          this._busy.next(false);
          this.spinner.hide();
        }
      }, 200);
    }
  }
}
