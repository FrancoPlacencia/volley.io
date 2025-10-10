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
import { AppSharedService } from '../../core/services/app-tournament-shared';

import { buildApp } from '../../shared/util/build-util';

import * as jsonData from '../../../assets/data.json';

import { DarkMode } from '../../shared/components/dark-mode/dark-mode';
import { Loading } from '../../shared/components/loading/loading';
import { Categories } from '../categories/categories';
import { Games } from '../games/games';
import { TournamentUi } from '../tournament-ui/tournament-ui';
import { Weeks } from '../weeks/weeks';
import { PlayerStatUi } from '../player-stat-ui/player-stat-ui';

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
    PlayerStatUi,
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
    this.app.set(
      buildApp(JSON.parse(JSON.stringify(jsonData)) as AppTournament),
    );
    this.loaded.set(true);
  }

  public moveTo(url: string): void {
    this.display.set(url);
  }
}

export interface MenuItem {
  label: string;
  icon: string;
  route: string;
  isActive?: boolean;
}
