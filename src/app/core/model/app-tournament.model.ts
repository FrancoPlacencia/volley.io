import { Game } from './game.model';
import { Playoffs } from './playoffs.model';
import { Standing } from './standing.model';
import { TeamOption } from './team-option.model';
import { Team } from './team.model';

export interface AppTournament {
  // Tournament Data
  tournamentId: number;
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

  isActive: boolean;

  games: Game[];
  teams: Team[];
  teamOptions: Map<string, TeamOption[]>;
  standings: Map<string, TeamOption[]>;
  eliminationGames: Map<string, Game[]>;

  // MODEL
  standingsMap: Map<string, Standing[]>;
  weeksMap: Map<number, Map<string, Game[]>>;
  teamsMap: Map<string, Team[]>;
  teamOptionsMap: Map<string, TeamOption[]>;
  eliminationGamesMap: Map<string, Game[]>;
  playoffs: Map<string, Playoffs>;
}
export function emptyAppTournament(): AppTournament {
  const tournament: AppTournament = {
    // Tournament Data
    tournamentId: 0,
    name: '',
    year: 0,
    startDate: new Date(),
    description: '',
    rounds: 0,
    stage: '',
    regularSets: 0,
    eliminationSets: 0,
    femElimination: 0,
    varElimination: 0,
    mixElimination: 0,
    qualification: 0,

    isActive: false,

    games: [],
    teams: [],
    teamOptions: new Map(),
    standings: new Map(),
    eliminationGames: new Map(),

    // MODEL
    standingsMap: new Map(),
    weeksMap: new Map(),
    teamsMap: new Map(),
    teamOptionsMap: new Map(),
    eliminationGamesMap: new Map(),
    playoffs: new Map(),
  };
  return tournament;
}
