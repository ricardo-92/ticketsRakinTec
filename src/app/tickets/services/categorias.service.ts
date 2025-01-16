import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private baseUrl = 'https://app-qa-ticket-api.azurewebsites.net/api/Ticket'; // Base URL de la API

  constructor(private http: HttpClient) {}

  // Obtener las categorías
  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ListarCategoria`);
  }

  // Obtener subcategorías sin id de categoría
  getSubCategories(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ListarSubCategoria`);
  }

  // Obtener subcategorías con id de categoría
  getSubCategoriesByCategory(idCategoria: number): Observable<any> {
    console.log('Obteniendo subcategorías para ID de categoría:', idCategoria);
    return this.http.get<any>(`${this.baseUrl}/ListarSubCategoria?idcategoria=${idCategoria}`);
  }
}
