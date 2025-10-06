import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { TopBar } from '../top-bar/top-bar';

@Component({
  selector: 'app-not-found',
  imports: [MatCardModule, MatDividerModule, TopBar],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound {}
