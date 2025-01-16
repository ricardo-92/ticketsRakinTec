import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;

  login() {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true'); // Persistir estado
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn'); // Eliminar estado
  }

  isAuthenticated(): boolean {
    // Leer el estado de localStorage
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
