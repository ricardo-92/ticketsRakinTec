import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://app-qa-ticket-api.azurewebsites.net/api/login/iniciarsesion'

  constructor(private http: HttpClient) { }

  verifyRun(run: string): Observable<any> {
    const headers = new HttpHeaders({
      'content-type': 'application/json'
    });

    const body = { run };
    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
