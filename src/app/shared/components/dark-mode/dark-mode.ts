import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-dark-mode',
  imports: [MatSlideToggleModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './dark-mode.html',
  styleUrl: './dark-mode.scss',
})
export class DarkMode {
  darkModeForm = new FormControl(false);

  ngOnInit(): void {
    // Check local storage for dark mode preference
    this.darkModeForm.valueChanges.subscribe((isDarkMode) => {
      console.log('Dark mode toggled:', isDarkMode);
      if (isDarkMode) {
        document.body.classList.add('dark-mode');
        console.log('Added:', isDarkMode);
      } else {
        document.body.classList.remove('dark-mode');
        console.log('Removed:', isDarkMode);
      }
    });
  }
}
