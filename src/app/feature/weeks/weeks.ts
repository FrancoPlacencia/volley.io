import { Component, inject, OnInit, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { AppSharedService } from '../../core/services/app-tournament-shared';
import { Error } from '../../shared/components/error/error';

import { Game } from '../../core/model/game.model';
import { Loading } from '../../shared/components/loading/loading';
import { Week } from '../week/week';

@Component({
  selector: 'app-weeks',
  imports: [MatTabsModule, Week, Error, Loading],
  templateUrl: './weeks.html',
  styleUrl: './weeks.scss',
})
export class Weeks implements OnInit {
  private appSharedService: AppSharedService = inject(AppSharedService);

  public loaded = signal<boolean>(false);
  public error = signal<string>('');
  public weeksMap = signal<Map<number, Map<string, Game[]>>>(
    new Map<number, Map<string, Game[]>>(),
  );

  public isAdmin = signal<boolean>(false);

  ngOnInit(): void {
    const intervalId = setInterval(() => {
      const app = this.appSharedService.getApp();
      if (app.tournamentId) {
        if (app.tournamentId === -1) {
          this.loaded.set(false);
          this.error.set('No se ha encontrado ningun torneo.');
        } else {
          this.loaded.set(true);
          this.weeksMap.set(app.weeksMap);
        }
        clearInterval(intervalId);
      }
    }, 200);
  }
}
