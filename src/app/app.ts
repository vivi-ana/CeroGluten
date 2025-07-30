import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Locals } from './locals/locals';
import { Navbar } from './navbar/navbar';
import { Contact } from './contact/contact';
import { Hero } from './hero/hero';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Locals, Navbar, Contact, Hero],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Cero Gluten');

}