import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateCategoriesService } from '../services/create-categories.service';

@Component({
  standalone: true,
  selector: 'app-create-category',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  categories: { idcategoria: number; nombre: string }[] = [];
  selectedCategory: number | null = null; // Cambiado a selectedCategory
  categoryName: string = '';
  categoryDescription: string = '';
  subCategoryName: string = '';
  subCategoryDescription: string = '';

  constructor(private createCategoriesService: CreateCategoriesService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  createCategory() {
    if (this.categoryName && this.categoryDescription) {
      this.createCategoriesService.createCategory(this.categoryName, this.categoryDescription).subscribe(
        (response) => {
          // Aquí puedes manejar la respuesta, por ejemplo, limpiar el formulario o mostrar un mensaje
          console.log('Categoría creada:', response);
          // Limpiar el formulario después de crear la categoría
          this.categoryName = '';
          this.categoryDescription = '';
          this.loadCategories();
        },
        (error) => {
          // Manejo de errores
          console.error('Error al crear categoría:', error);
        }
      );
    }
  }

  // Obtener las categorías desde el servicio
  loadCategories(): void {
    this.createCategoriesService.getCategories().subscribe(
      (response) => {
        if (response.esExitoso) {
          this.categories = response.resultado; // Cargar categorías en el dropdown
        } else {
          console.error('Error al obtener las categorías');
        }
      },
      (error) => {
        console.error('Error en la petición de categorías', error);
      }
    );
  }

  // Método POST para crear la subcategoría
  createSubCategory(): void {
    if (!this.selectedCategory || !this.subCategoryName || !this.subCategoryDescription) {
      console.warn('Debe seleccionar una categoría y llenar todos los campos');
      return;
    }

    const subCategoryData = {
      idcategoria: this.selectedCategory,
      nombre: this.subCategoryName,
      descripcion: this.subCategoryDescription,
      fechaRegistro: new Date().toISOString() // Obtener la fecha actual
    };

    this.createCategoriesService.createSubCategory(subCategoryData).subscribe(
      (response) => {
        if (response.esExitoso) {
          console.log('Subcategoría creada con éxito', response);
          // Resetear campos después de creación exitosa
          this.subCategoryName = '';
          this.subCategoryDescription = '';
          this.selectedCategory = null;
        } else {
          console.error('Error al crear la subcategoría');
        }
      },
      (error) => {
        console.error('Error en la petición para crear la subcategoría', error);
      }
    );
  }

  // Método para manejar el evento de envío del formulario
  onSubmit(): void {
    this.createSubCategory();
  }
}
