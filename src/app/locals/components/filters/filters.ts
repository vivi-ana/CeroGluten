import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.html',
  styleUrl: './filters.scss'
})
export class Filters {
  @Output() searchChange = new EventEmitter<Event>();
  @Output() tipoChange = new EventEmitter<'solo sin gluten' | 'mixto' | null>();
  @Output() categoriaChange = new EventEmitter<'comida' | 'insumos' | null>();

  onSearchChange(event: Event) {
    this.searchChange.emit(event);
  }

  onTipoChange(tipo: 'solo sin gluten' | 'mixto' | null) {
    this.tipoChange.emit(tipo);
  }

  onCategoriaChange(categoria: 'comida' | 'insumos' | null) {
    this.categoriaChange.emit(categoria);
  }
}
