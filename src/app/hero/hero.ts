import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {
  scrollToLocals() {
    const el = document.getElementById('locales');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
