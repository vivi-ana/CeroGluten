import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Local } from '../../local.model';

@Component({
  selector: 'app-cards',
  imports: [CommonModule],
  templateUrl: './cards.html',
  styleUrl: './cards.scss'
})
export class Cards {
   @Input() local!: Local;

   encodeQuery(query: string): string {
    return encodeURIComponent(query);
  }

  normalizeLocalidad(localidad: string): string {
    return localidad.toLowerCase() === 'formosa capital' ? 'Formosa' : localidad;
  }

}