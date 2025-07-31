import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Local } from './local.model';
import { LocalService } from './local.service';
import { Disclaimer } from './components/disclaimer/disclaimer';
import { Filters } from './components/filters/filters';
import { Cards } from './components/cards/cards';

@Component({
  selector: 'app-locals',
  standalone: true,
  imports: [CommonModule, FormsModule, Disclaimer, Filters, Cards],
  templateUrl: './locals.html',
  styleUrls: ['./locals.scss']
})
export class Locals implements OnInit {
  private tipoFiltro$ = new BehaviorSubject<'solo sin gluten' | 'mixto' | null>(null);
  private categoriaFiltro$ = new BehaviorSubject<'comida' | 'insumos' | null>(null);
  private searchTerm$ = new BehaviorSubject<string>('');

  private localesOriginales$: Observable<Local[]> = of([]);

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

    this.localesOriginales$ = this.localService.getLocals().pipe(
      tap(() => (this.loading = false)),
      catchError(err => {
        console.error('Error al obtener locales:', err);
        this.loading = false;
        this.errorMessage = 'No se pudieron cargar los locales. Intenta más tarde.';
        return of([]);
      })
    );

    this.locales$ = combineLatest([
      this.localesOriginales$,
      this.tipoFiltro$,
      this.categoriaFiltro$,
      this.searchTerm$
    ]).pipe(
      map(([locales, tipoFiltro, categoriaFiltro, searchTerm]) => {
        const filtradosYOrdenados = this.filtrarYOrdenarLocales(locales, tipoFiltro, categoriaFiltro);

        if (!searchTerm.trim() || searchTerm.length < 3) {
          return filtradosYOrdenados;
        }

        const searchTermLower = searchTerm.toLowerCase();

        return filtradosYOrdenados.filter(local =>
          local.name.toLowerCase().includes(searchTermLower)
        );
      })
    );
  }

  private filtrarYOrdenarLocales(
    locales: Local[],
    tipoFiltro: string | null,
    categoriaFiltro: string | null
  ): Local[] {
    if (!tipoFiltro && !categoriaFiltro) {
      return locales;
    }

    return locales
      .filter(local => {
        const tipoOk = !tipoFiltro || local.type === tipoFiltro;
        const categoriaOk = !categoriaFiltro || local.category === categoriaFiltro;
        return tipoOk && categoriaOk;
      })
  }

  setTipoFiltro(valor: 'solo sin gluten' | 'mixto' | null) {
    this.tipoFiltro$.next(valor);
  }

  setCategoriaFiltro(valor: 'comida' | 'insumos' | null) {
    this.categoriaFiltro$.next(valor);
  }

  onSearchTermChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm$.next(value);
  }
}