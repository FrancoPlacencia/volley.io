import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-buttons',
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './buttons.html',
  styleUrl: './buttons.scss',
})
export class Buttons {}
