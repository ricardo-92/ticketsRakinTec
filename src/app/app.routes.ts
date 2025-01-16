import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  // Ruta principal que muestra el login
  {
    path: '',
    loadComponent: () =>
      import('./auth/pages/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  // Ruta de verificación
  {
    path: 'verification',
    loadComponent: () =>
      import('./auth/pages/verification/verification.component').then(
        (m) => m.VerificationComponent
      ),
  },
  // Ruta protegida que carga la estructura principal de la aplicación
  {
    path: 'app',
    loadComponent: () =>
      import('./layout/sidebar/sidebar.component').then(
        (m) => m.SidebarComponent
      ),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./tickets/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'ticket',
        loadComponent: () =>
          import('./tickets/ticket-form/ticket-form.component').then(
            (m) => m.TicketFormComponent
          ),
        canActivate: [AuthGuard],
      },
      // Nueva ruta para crear categoría, solo visible para roles específicos
      {
        path: 'create-category',
        loadComponent: () =>
          import('./tickets/create-category/create-category.component').then(
            (m) => m.CreateCategoryComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  // Redirección por defecto si no se encuentra la ruta
  {
    path: '**',
    redirectTo: '',
  },
];
