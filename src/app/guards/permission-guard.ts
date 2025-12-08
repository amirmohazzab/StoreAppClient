import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account-service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const PermissionGuard: CanActivateFn = (route, state) => {
  
  const account = inject(AccountService);
  const router = inject(Router);

  const required = route.data['permission'] as string | undefined;

  return account.currentUser$.pipe(
    map(user => {
      if (!required) return true; // اگر permission در data نبود، عبور ده
      const perms = user?.permission ?? [];
      const ok = perms.includes(required);
      if (!ok) router.navigate(['/notFound']);
      return ok;
    })
  );

  // const permissionService = inject(PermissionService);
  // const router = inject(Router);

  // const requiredPermission = route.data['permission'] as string;
  // if (permissionService.hasPermission(requiredPermission)) {
  //   return true;
  // }

  // router.navigate(['/notFound']);
  // return false;
};
