import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isNavbarCollapsed = true;  // Track if the navbar is collapsed or not
  
  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;  // Toggle navbar state
  }
}
