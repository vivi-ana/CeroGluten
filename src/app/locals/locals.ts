import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Local } from './local.model';
import { FormsModule } from '@angular/forms';
import { LocalService } from './local.service';

@Component({
  selector: 'app-locals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './locals.html',
  styleUrls: ['./locals.scss']
})
export class Locals implements OnInit {
  tipoFiltro: 'solo sin gluten' | 'mixto' | null = null;
  categoriaFiltro: 'comida' | 'insumos' | null = null;
  locales: Local[] = [];

  loading = true;

  constructor(private localService: LocalService) { }

  ngOnInit(): void {
    this.loading = true;
    this.localService.getLocals().subscribe((data) => {
      this.locales = data;
      this.loading = false;
    });
  }

  encodeQuery(query: string): string {
    return encodeURIComponent(query);
  }

  get localesFiltrados(): Local[] {
    return this.locales
      .map(local => ({
        local,
        score: this.getFiltroScore(local)
      }))
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.local.name.localeCompare(b.local.name);
      })
      .map(item => item.local);
  }

  private getFiltroScore(local: Local): number {
    let score = 0;
    if (this.tipoFiltro && local.type === this.tipoFiltro) score += 1;
    if (this.categoriaFiltro && local.category === this.categoriaFiltro) score += 1;
    return score;
  }

  normalizeLocalidad(localidad: string): string {
    return localidad.toLowerCase() === 'formosa capital' ? 'Formosa' : localidad;
  }
}