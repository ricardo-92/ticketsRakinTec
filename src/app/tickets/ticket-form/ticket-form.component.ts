import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoriaService } from '../services/categorias.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-ticket-form',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './ticket-form.component.html',
  styleUrl: './ticket-form.component.css'
})
export class TicketFormComponent implements OnInit {
  categories: { idcategoria: number; nombre: string }[] = []; // Almacenará las categorías
  subCategories: any[] = []; // Almacenará las subcategorías
  selectedCategory: number | null = null;
  selectedSubcategory: number | null = null;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.loadCategories();
    console.log('Categorías inicializadas:', this.categories);
    console.log('Categoría seleccionada inicialmente:', this.selectedCategory);
  }

  // Obtener las categorías desde el servicio
  loadCategories(): void {
    this.categoriaService.getCategories().subscribe(
      (response) => {
        console.log('Categorías obtenidas:', response.resultado);
        if (response.esExitoso) {
          this.categories = response.resultado; // Verifica que las categorías tienen 'idcategoria'
        } else {
          console.error('Error al obtener las categorías');
        }
      },
      (error) => {
        console.error('Error en la petición de categorías', error);
      }
    );
  }



  // Obtener subcategorías (sin filtrar)
  loadSubCategories(): void {
    this.categoriaService.getSubCategories().subscribe(
      (response) => {
        if (response.esExitoso) {
          this.subCategories = response.resultado;
        } else {
          console.error('Error al obtener las subcategorías');
        }
      },
      (error) => {
        console.error('Error en la petición de subcategorías', error);
      }
    );
  }

  // Cargar las subcategorías según la categoría seleccionada
  onCategoryChange(): void {
    console.log('ID de categoría seleccionada:', this.selectedCategory);

    if (this.selectedCategory !== null && this.selectedCategory !== undefined) {
      this.categoriaService.getSubCategoriesByCategory(this.selectedCategory).subscribe(
        (response) => {
          if (response.esExitoso) {
            console.log('Subcategorías obtenidas:', response.resultado);
            this.subCategories = response.resultado;
          } else {
            console.error('Error al obtener las subcategorías para la categoría seleccionada');
          }
        },
        (error) => {
          console.error('Error en la petición de subcategorías por categoría', error);
        }
      );
    } else {
      console.error('La categoría seleccionada no es válida:', this.selectedCategory);
      this.subCategories = [];
    }
  }

  onSubCategoryChange(): void {
    console.log('ID de subcategoría seleccionada:', this.selectedSubcategory);

    if (this.selectedSubcategory === null || this.selectedSubcategory === undefined) {
      console.warn('No se ha seleccionado una subcategoría válida');
    }
  }



}
