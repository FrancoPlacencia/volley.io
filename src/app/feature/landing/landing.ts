import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  AppTournament,
  emptyAppTournament,
} from '../../core/model/app-tournament.model';
import { AppSharedService } from '../../core/services/app-tournament-shared';

@Component({
  selector: 'app-landing',
  imports: [
    CommonModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatTooltipModule,
    ClipboardModule,
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing implements AfterViewInit {
  private appSharedService: AppSharedService = inject(AppSharedService);

  public appTournament = signal<AppTournament>(emptyAppTournament());
  public errorMessage = signal<string>('');

  public standingTable: Map<string, MatTableDataSource<any> | undefined> =
    new Map<string, MatTableDataSource<any> | undefined>();

  ngAfterViewInit(): void {
    const intervalId = setInterval(() => {
      const tmpAppTournament = this.appSharedService.getApp();
      if (tmpAppTournament.tournamentId) {
        this.appTournament.set(tmpAppTournament);
        clearInterval(intervalId);
      }
    }, 250);
  }

  public eliminationByCategory(category: string): number {
    let elimination = 0;
    switch (category) {
      case 'FEMENIL':
        elimination = this.appTournament().femElimination;
        break;
      case 'VARONIL':
        elimination = this.appTournament().varElimination;
        break;
      case 'MIXTO':
        elimination = this.appTournament().mixElimination;
        break;
      default:
        elimination = 4;
        break;
    }
    return elimination;
  }
}
