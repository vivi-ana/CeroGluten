import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Local } from './local.model';
import { FormsModule } from '@angular/forms';
import { LocalService } from './local.service';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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

  locales$: Observable<Local[]> = of([]);

  loading = true;
  errorMessage: string | null = null;

  constructor(private localService: LocalService) { }

    ngOnInit(): void {
    this.loadLocals();
  }

  loadLocals() {
    this.loading = true;
    this.errorMessage = null;

    this.locales$ = this.localService.getLocals().pipe(
      tap(() => {
        this.loading = false;
      }),
      catchError(err => {
        console.error('Error al obtener locales:', err);
        this.loading = false;
        this.errorMessage = 'No se pudieron cargar los locales. Intenta más tarde.';
        return of([]);
      })
    );
  }

  encodeQuery(query: string): string {
    return encodeURIComponent(query);
  }

  filtrarYOrdenar(locales: Local[]): Local[] {
    return locales
      .map(local => ({
        local,
        score: this.getFiltroScore(local)
      }))
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.local.name.localeCompare(b.local.name, 'es', { sensitivity: 'base' });
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