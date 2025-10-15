import { Component, Input, OnInit, signal } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { TeamPlay } from '../../core/model/team-play.model';
import { emptyApp, VolleyApp } from '../../core/model/volley-app.model';
import { Standings } from '../standings/standings';
import { TeamPlayed } from '../team-played/team-played';

@Component({
  selector: 'app-categories',
  imports: [MatTabsModule, Standings, TeamPlayed],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories implements OnInit {
  @Input() app: VolleyApp = emptyApp();

  public femElimination = signal<number>(0);
  public varElimination = signal<number>(0);
  public mixElimination = signal<number>(0);

  public standingTable: Map<string, MatTableDataSource<any> | undefined> =
    new Map<string, MatTableDataSource<any> | undefined>();

  public teamPlays = signal<Map<string, TeamPlay[]>>(new Map());
  public rounds = signal<number>(0);

  ngOnInit(): void {
    this.app.standings.forEach((standing, key) => {
      this.standingTable.set(key, new MatTableDataSource(standing));
    });
    this.teamPlays.set(this.app.teamPlays);
    this.rounds.set(this.app.tournament.rounds);

    this.femElimination.set(this.app.tournament.femElimination);
    this.varElimination.set(this.app.tournament.varElimination);
    this.mixElimination.set(this.app.tournament.mixElimination);
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
