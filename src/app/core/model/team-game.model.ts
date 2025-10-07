export interface TeamGame {
  played: number;
  win: number;
  lost: number;
}

export function emptyTeamGame(): TeamGame {
  const teamGame: TeamGame = {
    played: 0,
    win: 0,
    lost: 0,
  };
  return teamGame;
}
