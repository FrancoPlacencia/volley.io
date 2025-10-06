import { emptyGame, Game } from './game.model';

export interface Playoffs {
  quarter1: Game;
  quarter2: Game;
  quarter3: Game;
  quarter4: Game;

  semi1: Game;
  semi2: Game;

  finals: Game;
  thirds: Game;
}

export function emptyPlayoff(): Playoffs {
  const playoffs: Playoffs = {
    quarter1: emptyGame(1, 'QUARTER'),
    quarter2: emptyGame(2, 'QUARTER'),
    quarter3: emptyGame(3, 'QUARTER'),
    quarter4: emptyGame(4, 'QUARTER'),

    semi1: emptyGame(1, 'SEMI'),
    semi2: emptyGame(2, 'SEMI'),

    finals: emptyGame(1, 'FINAL'),
    thirds: emptyGame(1, 'THIRD'),
  };
  return playoffs;
}
