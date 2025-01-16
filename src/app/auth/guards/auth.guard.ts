// auth.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    const role = localStorage.getItem('role');

    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/']); // Redirige al login si no está autenticado
      return false;
    }

    if ( role === '1') {
      return true;
    } else {
     this.router.navigate(['/app/dashboard']);
     return false;
    }
  }



}
