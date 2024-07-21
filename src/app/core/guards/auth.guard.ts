import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  if (token !== null) {
    return true;
  } else {
    router.navigateByUrl('login');
    return false;
  }
};
