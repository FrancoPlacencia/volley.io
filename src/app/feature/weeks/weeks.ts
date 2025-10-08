import { Component, Input, OnInit, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import {
  AppTournament,
  emptyAppTournament,
} from '../../core/model/app-tournament.model';
import { Game } from '../../core/model/game.model';
import { Week } from '../week/week';

@Component({
  selector: 'app-weeks',
  imports: [MatTabsModule, Week],
  templateUrl: './weeks.html',
  styleUrl: './weeks.scss',
})
export class Weeks implements OnInit {
  @Input() app: AppTournament = emptyAppTournament();

  public weeksMap = signal<Map<number, Map<string, Game[]>>>(
    new Map<number, Map<string, Game[]>>(),
  );

  ngOnInit(): void {
    this.weeksMap.set(this.app.weeksMap);
  }
}
