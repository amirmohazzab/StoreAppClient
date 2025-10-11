import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from './services/account-service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const accountService = inject(AccountService);
  const toast = inject(ToastrService);
  const router = inject(Router);

  return accountService.currentUser$.pipe(map(user => {
    if (user) {
      return true;
    } else {
      toast.error('At first, Please Login');
      router.navigate(['/account/login', {
        queryParams: {returnUrl: state.url}
      }]);
      return false;
    }
  }))
};
