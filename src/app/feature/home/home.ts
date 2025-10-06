import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import {
  AppTournament,
  emptyAppTournament,
} from '../../core/model/app-tournament.model';
import { emptyGame, Game } from '../../core/model/game.model';
import { Playoffs } from '../../core/model/playoffs.model';
import { AppSharedService } from '../../core/services/app-tournament-shared';

import { TopBar } from '../../shared/components/top-bar/top-bar';
import {
  generateGameWeeks,
  generateTeamMap,
} from '../../shared/util/game-util';

import * as jsonData from '../../../assets/data.json';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    RouterModule,
    TopBar,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private appSharedService: AppSharedService = inject(AppSharedService);

  public authenticated = signal(false);
  public appTournament = signal<AppTournament>(emptyAppTournament());

  public standingTable: Map<string, MatTableDataSource<any> | undefined> =
    new Map<string, MatTableDataSource<any> | undefined>();

  public collapsed = signal(true);
  public sidenavWidth = computed(() => (this.collapsed() ? '64px' : '250px'));
  public menuItems = signal<MenuItem[]>([
    {
      label: 'Torneos',
      icon: 'emoji_events',
      route: '/app/tournament',
    },
    { label: 'Jornadas', icon: 'calendar_month', route: '/app/weeks' },
    { label: 'Categorias', icon: 'category', route: '/app/category' },
    { label: 'Juegos', icon: 'sports_volleyball', route: '/app/game' },
  ]);
  public adminItems = signal<MenuItem[]>([
    {
      label: 'Torneos',
      icon: 'emoji_events',
      route: '/admin/tournament',
    },
    { label: 'Equipos', icon: 'groups', route: '/admin/team' },
    {
      label: 'Jugadores',
      icon: 'person',
      route: '/admin/player',
    },
    { label: 'Jornadas', icon: 'calendar_month', route: '/admin/game' },
  ]);

  ngOnInit(): void {
    this.loadAppTournament(
      JSON.parse(JSON.stringify(jsonData)) as AppTournament,
    );
    this.appSharedService.updateApp(this.appTournament());
  }

  private loadAppTournament(appTournament: AppTournament): void {
    this.appTournament.set(appTournament);
    this.appTournament().weeksMap = generateGameWeeks(
      this.appTournament().games,
    );
    this.appTournament().teamsMap = generateTeamMap(this.appTournament().teams);
    this.appTournament().teamOptionsMap = new Map(
      Object.entries(this.appTournament().teamOptions),
    );
    this.appTournament().standingsMap = new Map(
      Object.entries(this.appTournament().standings),
    );
    this.appTournament().standingsMap.forEach((standing, key) => {
      this.standingTable.set(key, new MatTableDataSource(standing));
    });
    this.appTournament().eliminationGamesMap = new Map(
      Object.entries(this.appTournament().eliminationGames),
    );
    this.appTournament().playoffs = new Map();
    this.appTournament().eliminationGamesMap.forEach((games, key) => {
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
      this.appTournament().playoffs.set(key, playoffs);
    });
  }
}

export interface MenuItem {
  label: string;
  icon: string;
  route: string;
  isActive?: boolean;
}
