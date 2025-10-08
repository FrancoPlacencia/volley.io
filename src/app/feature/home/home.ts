import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import {
  AppTournament,
  emptyAppTournament,
} from '../../core/model/app-tournament.model';
import { emptyGame, Game } from '../../core/model/game.model';
import { Playoffs } from '../../core/model/playoffs.model';
import { AppSharedService } from '../../core/services/app-tournament-shared';

import {
  generateGameWeeks,
  generateTeamMap,
} from '../../shared/util/game-util';

import * as jsonData from '../../../assets/data.json';
import { TeamPlay } from '../../core/model/team-play.model';
import { DarkMode } from '../../shared/components/dark-mode/dark-mode';
import { Loading } from '../../shared/components/loading/loading';
import { Categories } from '../categories/categories';
import { Games } from '../games/games';
import { TournamentUi } from '../tournament-ui/tournament-ui';
import { Weeks } from '../weeks/weeks';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    RouterModule,
    TournamentUi,
    DarkMode,
    Weeks,
    Categories,
    Games,
    Loading,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private appSharedService: AppSharedService = inject(AppSharedService);

  public loaded = signal<boolean>(false);
  public error = signal<string>('');

  public app = signal<AppTournament>(emptyAppTournament());

  public menuItems = signal<MenuItem[]>([
    {
      label: 'Torneo',
      icon: 'emoji_events',
      route: 'tournament',
    },
    { label: 'Jornadas', icon: 'calendar_month', route: 'weeks' },
    { label: 'Categorias', icon: 'category', route: 'category' },
    { label: 'Juegos', icon: 'sports_volleyball', route: 'game' },
  ]);

  public display = signal<string>('tournament');

  ngOnInit(): void {
    this.loadAppTournament(
      JSON.parse(JSON.stringify(jsonData)) as AppTournament,
    );
    this.appSharedService.updateApp(this.app());
    this.loaded.set(true);
  }

  public moveTo(url: string): void {
    this.display.set(url);
  }

  private loadAppTournament(appTournament: AppTournament): void {
    this.app.set(appTournament);
    this.app().weeksMap = generateGameWeeks(this.app().games);
    this.app().teamsMap = generateTeamMap(this.app().teams);
    this.app().teamOptionsMap = new Map(Object.entries(this.app().teamOptions));
    this.app().standingsMap = new Map(Object.entries(this.app().standings));
    this.app().eliminationGamesMap = new Map(
      Object.entries(this.app().eliminationGames),
    );
    this.app().teamPlays = new Map(Object.entries(this.app().teamPlays));
    this.app().teamPlays.forEach((value: TeamPlay[]) => {
      for (const teamPlay of value) {
        teamPlay.teamsPlayed = new Map(Object.entries(teamPlay.teamsPlayed));
      }
    });
    this.app().playoffs = new Map();
    this.app().eliminationGamesMap.forEach((games, key) => {
      let quarter1: Game = emptyGame(1, 'QUARTER');
      let quarter2: Game = emptyGame(2, 'QUARTER');
      let quarter3: Game = emptyGame(3, 'QUARTER');
      let quarter4: Game = emptyGame(4, 'QUARTER');

      let semi1: Game = emptyGame(1, 'SEMI');
      let semi2: Game = emptyGame(2, 'SEMI');

      let finals: Game = emptyGame(1, 'FINAL');
      let thirds: Game = emptyGame(1, 'THIRD');
      games.forEach((game) => {
        switch (game.stage) {
          case 'QUARTER':
            switch (game.weekNumber) {
              case 1:
                quarter1 = game;
                break;
              case 2:
                quarter2 = game;
                break;
              case 3:
                quarter3 = game;
                break;
              case 4:
                quarter4 = game;
                break;
            }
            break;
          case 'SEMI':
            switch (game.weekNumber) {
              case 1:
                semi1 = game;
                break;
              case 2:
                semi2 = game;
                break;
            }
            break;
          case 'THIRD':
            thirds = game;
            break;
          case 'FINAL':
            finals = game;
            break;
        }
      });
      const playoffs: Playoffs = {
        quarter1: quarter1,
        quarter2: quarter2,
        quarter3: quarter3,
        quarter4: quarter4,

        semi1: semi1,
        semi2: semi2,

        finals: finals,
        thirds: thirds,
      };
      this.app().playoffs.set(key, playoffs);
    });
  }
}

export interface MenuItem {
  label: string;
  icon: string;
  route: string;
  isActive?: boolean;
}
