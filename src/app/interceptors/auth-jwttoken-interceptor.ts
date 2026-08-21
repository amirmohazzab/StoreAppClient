import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../services/account-service';
import { take } from 'rxjs';

export const authJWTTokenInterceptor: HttpInterceptorFn = (req, next) => {

  // const accountService = inject(AccountService);

  // accountService.currentUser$.pipe(take(1)).subscribe(user => {
  //   if (user) {
  //     req = req.clone({
  //       setHeaders: {
  //         Authorization: `Bearer ${user.token}`
  //       }
  //     });
  //   }
  // })
  // return next(req);
   const user = localStorage.getItem('user_token');

    if (user) {
    const parsed = JSON.parse(user);

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${parsed.token}`
      }
    });
  }

  return next(req);
};
