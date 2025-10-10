import { Component, Input } from '@angular/core';
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
  @Input() displayName: boolean = false;
}
