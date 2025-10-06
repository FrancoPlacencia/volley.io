import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AppSharedService } from '../../core/services/app-tournament-shared';
import { Error } from '../../shared/components/error/error';
import { Loading } from '../../shared/components/loading/loading';

@Component({
  selector: 'app-tournament-ui',
  imports: [MatCardModule, MatIconModule, Loading, Error],
  templateUrl: './tournament-ui.html',
  styleUrl: './tournament-ui.scss',
})
export class TournamentUi implements OnInit {
  private appSharedService: AppSharedService = inject(AppSharedService);

  public loaded = signal<boolean>(false);
  public error = signal<string>('');

  public name = signal<string>('');
  public startDate = signal<string>('');
  public femTeams = signal<number>(0);
  public varTeams = signal<number>(0);
  public mixTeams = signal<number>(0);

  public femElimination = signal<number>(0);
  public varElimination = signal<number>(0);
  public mixElimination = signal<number>(0);

  public totalEquipos = signal<number>(0);
  public qualification = signal<number>(0);

  ngOnInit(): void {
    const intervalId = setInterval(() => {
      const app = this.appSharedService.getApp();
      if (app.tournamentId) {
        if (app.tournamentId === -1) {
          this.loaded.set(false);
          this.error.set('No se ha encontrado ningun torneo.');
        } else {
          this.loaded.set(true);
          this.name.set(app.name);
          const _startDate = new Date(app.startDate);
          const day = _startDate.getDate();
          const month = _startDate.toLocaleString('es-ES', { month: 'long' });
          const year = _startDate.getFullYear();
          const fullMonth = month.charAt(0).toUpperCase() + month.slice(1);

          this.startDate.set(day + ' de ' + fullMonth + ' del ' + year);
          this.femTeams.set(app.teamsMap.get('FEMENIL')?.length || 0);
          this.varTeams.set(app.teamsMap.get('VARONIL')?.length || 0);
          this.mixTeams.set(app.teamsMap.get('MIXTO')?.length || 0);
          this.totalEquipos.set(
            this.femTeams() + this.varTeams() + this.mixTeams(),
          );
          this.femElimination.set(app.femElimination);
          this.varElimination.set(app.varElimination);
          this.mixElimination.set(app.mixElimination);

          this.qualification.set(app.qualification);
        }
        clearInterval(intervalId);
      }
    }, 200);
  }
}
