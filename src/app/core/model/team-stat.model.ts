import { PlayerOption } from './player-option.model';
import { SetStat } from './set-stats.model';

export interface TeamStat {
  teamId: number;
  teamName: string;
  score: number;
  sets: number;
  points: number;
  state: string;
  setStats: SetStat[];
  players: PlayerOption[];
}

export function emptyTeamStats(): TeamStat {
  const teamStat: TeamStat = {
    teamId: 0,
    teamName: '',
    score: 0,
    sets: 0,
    points: 0,
    state: '',
    setStats: [],
    players: [],
  };
  return teamStat;
}
