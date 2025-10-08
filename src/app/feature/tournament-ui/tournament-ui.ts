import { Component, Input, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  AppTournament,
  emptyAppTournament,
} from './../../core/model/app-tournament.model';

@Component({
  selector: 'app-tournament-ui',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './tournament-ui.html',
  styleUrl: './tournament-ui.scss',
})
export class TournamentUi implements OnInit {
  @Input() app: AppTournament = emptyAppTournament();

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
    this.name.set(this.app.name);
    const _startDate = new Date(this.app.startDate);
    const day = _startDate.getDate();
    const month = _startDate.toLocaleString('es-ES', { month: 'long' });
    const year = _startDate.getFullYear();
    const fullMonth = month.charAt(0).toUpperCase() + month.slice(1);

    this.startDate.set(day + ' de ' + fullMonth + ' del ' + year);
    this.femTeams.set(this.app.teamsMap.get('FEMENIL')?.length || 0);
    this.varTeams.set(this.app.teamsMap.get('VARONIL')?.length || 0);
    this.mixTeams.set(this.app.teamsMap.get('MIXTO')?.length || 0);
    this.totalEquipos.set(this.femTeams() + this.varTeams() + this.mixTeams());
    this.femElimination.set(this.app.femElimination);
    this.varElimination.set(this.app.varElimination);
    this.mixElimination.set(this.app.mixElimination);

    this.qualification.set(this.app.qualification);
  }
}
