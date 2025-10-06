export interface SetStat {
  setNumber: number;
  state: string;
  points: number;
}

export function emptySetStat(setNumber: number): SetStat {
  const setStat: SetStat = {
    setNumber: setNumber,
    state: '',
    points: 0,
  };
  return setStat;
}
