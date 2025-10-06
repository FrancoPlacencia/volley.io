import { Component, inject, OnInit, signal } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { AppSharedService } from '../../core/services/app-tournament-shared';
import { Error } from '../../shared/components/error/error';
import { Loading } from '../../shared/components/loading/loading';
import { Standings } from '../standings/standings';

@Component({
  selector: 'app-categories',
  imports: [MatTabsModule, Error, Loading, Standings],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories implements OnInit {
  private appSharedService: AppSharedService = inject(AppSharedService);
  // public appTournament = signal<AppTournament>(emptyAppTournament());
  public loaded = signal<boolean>(false);
  public error = signal<string>('');

  public femElimination = signal<number>(0);
  public varElimination = signal<number>(0);
  public mixElimination = signal<number>(0);

  public standingTable: Map<string, MatTableDataSource<any> | undefined> =
    new Map<string, MatTableDataSource<any> | undefined>();

  ngOnInit(): void {
    const intervalId = setInterval(() => {
      const _app = this.appSharedService.getApp();
      if (_app.tournamentId) {
        if (_app.tournamentId === -1) {
          this.loaded.set(false);
          this.error.set('No se ha encontrado ningun torneo.');
        } else {
          this.loaded.set(true);
          _app.standingsMap.forEach((standing, key) => {
            this.standingTable.set(key, new MatTableDataSource(standing));
          });
        }
        clearInterval(intervalId);
      }
    }, 250);
  }

  public eliminationByCategory(category: string): number {
    let elimination = 0;
    switch (category) {
      case 'FEMENIL':
        elimination = this.femElimination();
        break;
      case 'VARONIL':
        elimination = this.varElimination();
        break;
      case 'MIXTO':
        elimination = this.mixElimination();
        break;
      default:
        elimination = 4;
        break;
    }
    return elimination;
  }
}
