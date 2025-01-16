import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Obtener el token desde la clave 'token'
  const token = localStorage.getItem('token');

  // Si el token existe, agregarlo en el encabezado Authorization
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(clonedRequest);
  }

  // Continuar con la solicitud sin modificar si no hay token
  return next(req);
};
