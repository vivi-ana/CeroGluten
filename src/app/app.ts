import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Locals } from './locals/locals';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Locals],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Cero Gluten'); 
}
