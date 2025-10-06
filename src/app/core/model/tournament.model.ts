export interface Tournament {
  tournamentId?: number;
  name: string;
  year: number;
  startDate: Date;
  description: string;
  rounds: number;
  stage: string;
  regularSets: number;
  eliminationSets: number;
  femElimination: number;
  varElimination: number;
  mixElimination: number;
  qualification: number;
  url: string;
  isActive: boolean;

  weeks: number[];
  eliminations: string[];
}

export function emptyTournament(): Tournament {
  /*
  const tournament: Tournament = {
    name: '',
    year: 0,
    description: '',
    rounds: 0,
    stage: '',
    regularSets: 0,
    eliminationSets: 0,
    femElimination: 0,
    varElimination: 0,
    mixElimination: 0,
    url: '',
    isActive: false,
    weeks: [],
    eliminations: [],
  };
*/
  const tournament: Tournament = {
    name: 'TEST',
    year: 2001,
    startDate: new Date(),
    description: 'TEST',
    rounds: 2,
    stage: 'REGULAR',
    regularSets: 3,
    eliminationSets: 5,
    femElimination: 3,
    varElimination: 3,
    mixElimination: 3,
    qualification: 40,
    url: 'TEST',
    isActive: false,
    weeks: [],
    eliminations: [],
  };
  return tournament;
}
