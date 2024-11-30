import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { inject } from '@angular/core';

export const appGuard: CanActivateFn = (route, state) => {
  return true;
};


export const isLoggedIn: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router)

  if (authService.isLoggedIn()) {
    router.navigate(['/home'])
  }

  return !authService.isLoggedIn();


  //IMPORTANTE PROBAR OTRA OPCION DE PROFESOR
  /*const canContinue = !authService.isLoggedIn();
  if (!canContinue) {
    router.navigate(['/home'])
  }

  return canContinue;
  */
}