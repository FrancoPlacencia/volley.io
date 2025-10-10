import { Component, Input, signal, OnInit } from '@angular/core';
import {
  emptyPlayerStat,
  PlayerStat,
} from '../../core/model/player-stat.model';

@Component({
  selector: 'app-player-stat-ui',
  imports: [],
  templateUrl: './player-stat-ui.html',
  styleUrl: './player-stat-ui.scss',
})
export class PlayerStatUi implements OnInit {
  @Input() player: PlayerStat = emptyPlayerStat();

  public gamesWins = signal<number>(0);
  public gamesLosts = signal<number>(0);
  public gamesTotal = signal<number>(0);

  public setsWins = signal<number>(0);
  public setsLosts = signal<number>(0);
  public setsTotal = signal<number>(0);

  public pointsWins = signal<number>(0);
  public pointsLosts = signal<number>(0);
  public pointsTotal = signal<number>(0);

  ngOnInit() {
    this.gamesTotal.set(this.player.gamesWon + this.player.gamesLost);
    this.gamesWins.set(
      Number(((this.player.gamesWon / this.gamesTotal()) * 100).toFixed(2)),
    );
    this.gamesLosts.set(
      Number(((this.player.gamesLost / this.gamesTotal()) * 100).toFixed(2)),
    );

    this.setsTotal.set(this.player.setsWon + this.player.setsLost);
    this.setsWins.set(
      Number(((this.player.setsWon / this.setsTotal()) * 100).toFixed(2)),
    );
    this.setsLosts.set(
      Number(((this.player.setsLost / this.setsTotal()) * 100).toFixed(2)),
    );

    this.pointsTotal.set(this.player.pointsWon + this.player.pointsLost);
    this.pointsWins.set(
      Number(((this.player.pointsWon / this.pointsTotal()) * 100).toFixed(2)),
    );
    this.pointsLosts.set(
      Number(((this.player.pointsLost / this.pointsTotal()) * 100).toFixed(2)),
    );
  }
}
