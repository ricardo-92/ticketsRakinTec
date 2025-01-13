import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VerificarCodigoService } from '../../services/verification.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-verification',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent {
  codigoVerificacion: string = ''; // Contendrá todo el código ingresado
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private verificationService: VerificarCodigoService) {}

  handleInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    // Opcional: Validar que solo se permitan números
    this.codigoVerificacion = inputElement.value.replace(/[^0-9]/g, ''); // Remover caracteres no numéricos
  }

  // Función para verificar el código ingresado
  verifyCode(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.codigoVerificacion.length === 6) {
      // Enviar solicitud HTTP para verificar el código
      this.verificationService.verificarCodigo({ codigoverificacion: this.codigoVerificacion }).subscribe(
        (response: any) => {
          if (response.esExitoso) {
            this.successMessage = response.mensajeExitoso;
            console.log('Token recibido:', response.resultado.token); // Guardar el token si es necesario
          } else {
            this.errorMessage = response.mensajeError.join(', ');
          }
        },
        (error) => {
          if (error.status === 401) {
            this.errorMessage = error.error.mensajeError[0]; // Mensaje de error cuando el código es inválido
          } else {
            this.errorMessage = 'Ocurrió un error inesperado. Por favor, intente nuevamente.';
          }
        }
      );
    } else {
      this.errorMessage = 'Por favor, ingrese el código completo de 6 dígitos.';
    }
  }
}
