// src/app/services/verificar-codigo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

    return this.http.post<any>(this.apiUrl, data, { headers });
  }

}
