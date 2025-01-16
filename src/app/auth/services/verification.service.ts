// src/app/services/verificar-codigo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerificarCodigoService {
  private apiUrl = 'https://app-qa-ticket-api.azurewebsites.net/api/login/verificarcodigo';

  constructor(private http: HttpClient) {}

  verificarCodigo(data: { codigoverificacion: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl, data, { headers }).pipe(
      tap((response) => console.log('Respuesta del servidor:', response))  // Esto imprimirá toda la respuesta
    );
  }

}
