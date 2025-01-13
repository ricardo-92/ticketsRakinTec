import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./auth/pages/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'verification',
    loadComponent: () =>
      import('./auth/pages/verification/verification.component').then(
        (m) => m.VerificationComponent
      ),
  },
];
