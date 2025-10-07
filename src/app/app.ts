import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private router = inject(Router);

  @HostListener('window:beforeunload') goToPage() {
    this.router.navigate(['/']);
  }
}
