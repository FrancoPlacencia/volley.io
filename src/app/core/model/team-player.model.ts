import { Player } from './player.model';

export interface TeamPlayer extends Player {
  teamPlayerId?: number;
  teamId?: number;
  number: number;
  gamePlayed: boolean;
  gamesPlayed: number;
  gamesTotal: number;
  gamesPercentage: number;
  isActive: boolean;
}

export function emptyTeamPlayer(): TeamPlayer {
  const teamPlayer: TeamPlayer = {
    teamPlayerId: 0,
    isActive: true,
    gamesPlayed: 0,
    gamesTotal: 0,
    gamesPercentage: 0,
    playerId: 0,
    name: '',
    lastName: '',
    sex: '',
    number: 0,
    gamePlayed: false,
    birth: new Date(),
    age: 0,
  };
  return teamPlayer;
}
