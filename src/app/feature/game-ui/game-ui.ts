/* eslint-disable @angular-eslint/no-output-rename */
/* eslint-disable @typescript-eslint/consistent-generic-constructors */
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Game } from '../../core/model/game.model';

@Component({
  selector: 'app-game-ui',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './game-ui.html',
  styleUrl: './game-ui.scss',
})
export class GameUi {
  @Input() game!: Game;
  @Input() displayName: boolean = false;

  @Input() isPlayoffs: boolean = false;

  @Input() elimination: number = 0;

  @Input() teamFilter: string = '';

  @Output() isProcessing: boolean = false;
  @Output('parentEdit') parentEdit: EventEmitter<any> = new EventEmitter();

  @Output('parentDelete') parentDelete: EventEmitter<any> = new EventEmitter();

  public edit(game: Game): void {
    this.parentEdit.emit(game);
  }
  public delete(game: Game): void {
    this.parentDelete.emit(game);
  }

  public getTeamName(teamName: string, index: number = 0): string {
    if (!this.isPlayoffs) {
      return teamName;
    }
    let place: string = '';
    if (this.game.stage === 'QUARTER') {
      if (teamName === '') {
        teamName = 'Lugar';
      }
      if (this.elimination === 8) {
        switch (this.game.weekNumber) {
          case 1:
            place = (index === 0 ? 1 : 8) + '°';
            break;
          case 2:
            place = (index === 0 ? 2 : 7) + '°';
            break;
          case 3:
            place = (index === 0 ? 4 : 5) + '°';
            break;
          case 4:
            place = (index === 0 ? 3 : 6) + '°';
            break;
          default:
            place = '?';
            break;
        }
      } else {
        switch (this.game.weekNumber) {
          case 3:
            place = (index === 0 ? 4 : 5) + '°';
            break;
          case 4:
            place = (index === 0 ? 3 : 6) + '°';
            break;
          default:
            place = '?';
            break;
        }
      }
    } else if (this.game.stage === 'SEMI') {
      switch (this.game.weekNumber) {
        case 1:
          place = index === 0 && this.elimination === 6 ? '1°' : '';
          teamName =
            teamName === ''
              ? index === 0
                ? this.elimination === 6
                  ? 'Lugar'
                  : 'Ganador 1°vs8°'
                : 'Ganador 4°vs5°'
              : teamName;
          break;
        case 2:
          place = index === 0 && this.elimination === 6 ? '2°' : '';
          teamName =
            teamName === ''
              ? index === 0
                ? this.elimination === 6
                  ? 'Lugar'
                  : 'Ganador 2°vs7°'
                : 'Ganador 3°vs6°'
              : teamName;
          break;
        default:
          place = '?';
          break;
      }
    } else if (this.game.stage === 'FINAL') {
      place = '';
      teamName =
        teamName === ''
          ? index === 0
            ? 'Ganador Semi 1'
            : 'Ganador Semi 2'
          : teamName;
    } else {
      place = '';
      teamName =
        teamName === ''
          ? index === 0
            ? 'Perdedor Semi 1'
            : 'Perdedor Semi 2'
          : teamName;
    }

    return place + ' ' + teamName;
  }
}
