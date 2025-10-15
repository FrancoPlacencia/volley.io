import { Component, Input, OnInit, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { Game } from '../../core/model/game.model';
import { emptyApp, VolleyApp } from '../../core/model/volley-app.model';
import { Week } from '../week/week';

@Component({
  selector: 'app-weeks',
  imports: [MatTabsModule, Week],
  templateUrl: './weeks.html',
  styleUrl: './weeks.scss',
})
export class Weeks implements OnInit {
  @Input() app: VolleyApp = emptyApp();

  public weeksMap = signal<Map<number, Map<string, Game[]>>>(
    new Map<number, Map<string, Game[]>>(),
  );

  ngOnInit(): void {
    this.weeksMap.set(this.app.weeksMap);
  }
}
