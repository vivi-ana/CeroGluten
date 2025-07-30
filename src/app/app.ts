import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Locals } from './locals/locals';
import { Navbar } from './navbar/navbar';
import { Contact } from './contact/contact';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Locals, Navbar, Contact],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Cero Gluten');

  scrollToLocals() {
    const el = document.getElementById('locales');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}