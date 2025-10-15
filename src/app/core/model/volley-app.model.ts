import { Game } from './game.model';
import { PlayerStat } from './player-stat.model';
import { Playoffs } from './playoffs.model';
import { TeamOption } from './team-option.model';
import { TeamPlay } from './team-play.model';
import { Team } from './team.model';
import { emptyTournament, Tournament } from './tournament.model';

export interface VolleyApp {
  tournament: Tournament;
  // Tournament Data
  /*
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
*/
  teams: Team[];
  teamsMap: Map<string, Team[]>;
  teamOptions: Map<string, TeamOption[]>;

  games: Game[];
  standings: Map<string, Team[]>;
  eliminationGames: Map<string, Game[]>;
  weeksMap: Map<number, Map<string, Game[]>>;
  eliminationGamesMap: Map<string, Game[]>;
  // MODEL

  playoffs: Map<string, Playoffs>;

  teamPlays: Map<string, TeamPlay[]>;
  playerStats: PlayerStat[];
}
export function emptyApp(): VolleyApp {
  const app: VolleyApp = {
    // Tournament Data
    tournament: emptyTournament(),
    /*
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
*/
    games: [],
    teams: [],
    teamOptions: new Map(),
    // standings: new Map(),
    eliminationGames: new Map(),

    // MODEL
    standings: new Map(),
    weeksMap: new Map(),
    teamsMap: new Map(),
    eliminationGamesMap: new Map(),
    playoffs: new Map(),

    teamPlays: new Map(),

    playerStats: [],
  };
  return app;
}
