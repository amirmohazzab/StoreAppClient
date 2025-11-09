import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { BusyService } from '../services/busy-service';
import { inject } from '@angular/core';
import { finalize, tap } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  
   const busyServive = inject(BusyService);
  busyServive.showBusy();

  return next(req).pipe(
    finalize(() => {
      busyServive.hideBusy();
    }))

  
};
