import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VerificarCodigoService } from '../../services/verification.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-verification',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent {
  codigoVerificacion: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private verificationService: VerificarCodigoService,
    private router: Router,
    private authService: AuthService
  ) {}

  // Método para manejar el input
  handleInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.codigoVerificacion = inputElement.value.replace(/[^0-9]/g, '');
  }

  // Método para verificar el código
  verifyCode(): void {
    console.log('Verificando código:', this.codigoVerificacion);

    if (this.codigoVerificacion) {
      this.verificationService.verificarCodigo({ codigoverificacion: this.codigoVerificacion }).subscribe(
        (response) => {
          console.log('Respuesta de la verificación del código:', response);

          if (response.statusCode === 200 && response.esExitoso) {
            console.log('Código de verificación exitoso');

            // Accedemos al token dentro de la propiedad 'resultado'
            const token = response.resultado.token;  // Asegúrate de acceder correctamente al token

            if (token) {
              // Decodificamos el token para obtener el role
              const decodedToken = this.decodeToken(token);
              console.log('Token decodificado:', decodedToken);

              // Si el token es válido y tiene el role
              const role = decodedToken?.role; // Accede al role del token decodificado

              if (role) {
                // Guardamos el token, el rol y el estado de autenticación en localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);  // Guardamos el rol obtenido del token
                localStorage.setItem('isLoggedIn', 'true');   // Guarda el estado de autenticación

                // Realiza el login con el token
                this.authService.login();

                // Redirigimos al dashboard después de verificar el código
                this.router.navigate(['/app/dashboard']);
              } else {
                this.errorMessage = 'El token no contiene un rol válido';
              }
            } else {
              this.errorMessage = 'Token no recibido en la respuesta';
            }
          } else {
            console.log('Error en la verificación del código:', response.mensajeError);
            this.errorMessage = 'Código inválido o expirado';
          }
        },
        (error) => {
          console.error('Error al verificar el código:', error);
          this.errorMessage = 'Error en la conexión o al verificar el código';
        }
      );
    } else {
      console.log('No se ingresó un código de verificación');
      this.errorMessage = 'Por favor ingrese un código de verificación';
    }
  }

  // Método para decodificar el token
  decodeToken(token: string): any {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }
}
