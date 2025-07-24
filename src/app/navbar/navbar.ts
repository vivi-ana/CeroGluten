import { Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar { 
  hideLogo = false;
  menuOpen = false;
  scrolled = false;
  selectedSection: string = 'inicio';

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  @HostListener('window:scroll', [])
onWindowScroll() {
  const offset = window.scrollY || document.documentElement.scrollTop || 0;
  this.scrolled = offset > 50;
}


  scrollTo(id: string): void {
    this.selectedSection = id;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.closeMenu();
    }
  }
}
