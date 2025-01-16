import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateCategoriesService {

  private apiUrl = 'https://app-qa-ticket-api.azurewebsites.net/api/Ticket'; // Cambia esto a la URL correcta de tu API

  constructor(private http: HttpClient) {}

  // Método para crear una categoría
  createCategory(nombre: string, descripcion: string): Observable<any> {
    const fechaRegistro = new Date().toISOString();  // Fecha actual en formato ISO 8601
    const categoria = {
      nombre: nombre,
      descripcion: descripcion,
      fechaRegistro: fechaRegistro
    };
    return this.http.post(`${this.apiUrl}/CrearCategoria`, categoria);
  }

  // Obtener las categorías
  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ListarCategoria`);
  }

  // Crear Subcategoría
  createSubCategory(subCategoryData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/CrearSubcategoria`, subCategoryData);
  }

  // Aquí puedes agregar más métodos si necesitas hacer lo mismo con subcategorías
}
