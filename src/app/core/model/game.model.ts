import { emptyTeamStats, TeamStat } from './team-stat.model';

export interface Game {
  gameId?: number;
  tournamentId: number;
  weekNumber: number;
  category: string;
  stage: string;

  gameDate: Date;
  gamePlace: string;

  byDefault: boolean;

  teamStats: TeamStat[];
}

export function emptyGame(
  weekNumber: number = 0,
  stage: string = 'REGULAR',
): Game {
  const game: Game = {
    tournamentId: 0,
    category: '',
    stage: stage,
    weekNumber: weekNumber,
    gameDate: new Date(),
    gamePlace: '',
    teamStats: [emptyTeamStats(), emptyTeamStats()],
    byDefault: false,
  };
  return game;
}
