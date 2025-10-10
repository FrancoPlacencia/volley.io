export interface PlayerStat {
  name: string;
  lastName: string;
  gamesWon: number;
  gamesLost: number;
  setsWon: number;
  setsLost: number;
  pointsWon: number;
  pointsLost: number;
}

export function emptyPlayerStat(): PlayerStat {
  const player: PlayerStat = {
    name: '',
    lastName: '',
    gamesWon: 0,
    gamesLost: 0,
    setsWon: 0,
    setsLost: 0,
    pointsWon: 0,
    pointsLost: 0,
  };
  return player;
}
