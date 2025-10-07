import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TeamGame } from '../../core/model/team-game.model';
import { TeamPlay } from '../../core/model/team-play.model';

@Component({
  selector: 'app-team-played',
  imports: [CommonModule],
  templateUrl: './team-played.html',
  styleUrl: './team-played.scss',
})
export class TeamPlayed {
  @Input() category: string | undefined;

  @Input() teamPlays: TeamPlay[] = [];

  @Input() rounds: number = 0;

  public getClass(teamGame: TeamGame): string {
    let _class: string = '';
    if (teamGame.win === teamGame.lost) {
      _class = 'blue-theme';
    }
    if (teamGame.win > teamGame.lost) {
      _class = 'green-theme';
    }
    if (teamGame.win < teamGame.lost) {
      _class = 'orange-theme';
    }
    if (teamGame.played === this.rounds) {
      _class = _class + ' completed';
    }
    if (teamGame.played > this.rounds) {
      _class = 'red-theme exceeded';
    }
    return _class;
  }
}
