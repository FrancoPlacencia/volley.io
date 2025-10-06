export interface Player {
  playerId?: number;
  name: string;
  lastName: string;
  sex: string;
  birth: Date;
  age: number;
}

export function emptyPlayer(): Player {
  const player: Player = {
    name: '',
    lastName: '',
    sex: '',
    birth: new Date(),
    age: 0,
  };
  return player;
}
