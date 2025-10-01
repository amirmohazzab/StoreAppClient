import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorHandlingInterceptor: HttpInterceptorFn = (req, next) => {

    const toast = inject(ToastrService);
    const router = inject(Router);


  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    if (error){
      const base = error.error;
      switch (base.statusCode) {
        case 404:
          console.log("statuscode", base.statusCode);
          router.navigateByUrl('/notFound');
          toast.error(base?.message);
          break;
          //return throwError(() => error);
        
        case 500:
          router.navigateByUrl('/serverError');
          toast.error(base?.message);
          break;
        

        default:
          toast.error(base?.message);
          break;
      }
    }

    return throwError(() => {
      console.log(error);
      return error;
    });
  }))
};
