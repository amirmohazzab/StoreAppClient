import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account-service';
import { map } from 'rxjs';
import { IUser } from '../models/User';


export const AdminGuard: CanActivateFn = (route, state) => {

  const accountService = inject(AccountService);
  const router = inject(Router);

  return accountService.currentUser$.pipe(
    map((user: IUser | null) => {
      const role = user?.role?.toLowerCase();
      return (role === 'admin') ? true : router.parseUrl('/');
    })
  );
};
