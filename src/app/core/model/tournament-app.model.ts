import { Game } from './game.model';
import { Playoffs } from './playoffs.model';
import { Standing } from './standing.model';
import { TeamOption } from './team-option.model';
import { Team } from './team.model';
import { Tournament } from './tournament.model';

export interface TournamentApp extends Tournament {
  // DTO
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
