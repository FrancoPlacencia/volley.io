/* eslint-disable @angular-eslint/no-output-rename */
/* eslint-disable @typescript-eslint/consistent-generic-constructors */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from '../../core/model/game.model';
import { GameUi } from '../game-ui/game-ui';

@Component({
  selector: 'app-week',
  imports: [GameUi],
  templateUrl: './week.html',
  styleUrl: './week.scss',
})
export class Week {
  @Input() days: Map<string, Game[]> = new Map<string, Game[]>();
  @Input() isAdmin: boolean = false;
  @Input() displayName: boolean = false;

  @Output('parentEdit') parentEdit: EventEmitter<any> = new EventEmitter();

  @Output('parentDelete') parentDelete: EventEmitter<any> = new EventEmitter();

  public edit(game: Game): void {
    this.parentEdit.emit(game);
  }
  public delete(game: Game): void {
    this.parentDelete.emit(game);
  }
}
