import { TeamPlayer } from './team-player.model';

export interface Team {
  teamId?: number;
  tournamentId?: number;
  category: string;
  position: number;
  name: string;
  initials: string;
  isActive: boolean;
  gamesWon: number;
  gamesLost: number;
  setsWon: number;
  setsLost: number;
  pointsWon: number;
  pointsLost: number;
  teamPlayers: TeamPlayer[];
}

export function emptyTeam(): Team {
  const team: Team = {
    name: '',
    initials: '',
    category: '',
    position: 0,
    isActive: true,
    gamesWon: 0,
    gamesLost: 0,
    setsWon: 0,
    setsLost: 0,
    pointsWon: 0,
    pointsLost: 0,
    teamPlayers: [],
  };
  return team;
}
