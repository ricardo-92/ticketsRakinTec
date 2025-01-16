import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true, // Hacemos el componente standalone
  imports: [FormsModule], // Importamos módulos necesarios
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  rut: string = '';

  constructor(private router: Router, private loginService: LoginService, private authService: AuthService) {}

  // Método para manejar el login
  onLogin(): void {
    if (this.rut) {
      this.loginService.verifyRun(this.rut).subscribe(
        (response) => {
          // Verificamos si la respuesta es exitosa
          if (response.statusCode === 200 && response.esExitoso) {
            // Mostrar el mensaje de éxito en consola
            console.log('Login exitoso:', response.mensajeExitoso);
            alert(response.mensajeExitoso); // Mostrar también en la interfaz
            this.authService.login();
            this.router.navigate(['/verification']);
          } else {
            alert('Error de autenticación: ' + response.mensajeError.join(', '));
          }
        },
        (error) => {
          alert('Error de conexión o servidor. Por favor, intente nuevamente.');
          console.error('Error al hacer login', error);
        }
      );
    } else {
      alert('Por favor, ingrese un RUT válido');
    }
  }
}
