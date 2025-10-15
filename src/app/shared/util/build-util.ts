import { Game } from '../../core/model/game.model';
import { TeamOption } from '../../core/model/team-option.model';
import { TeamPlay } from '../../core/model/team-play.model';
import { Team } from '../../core/model/team.model';
import { VolleyApp } from '../../core/model/volley-app.model';

const daysOfWeek: string[] = [
  'DOMINGO',
  'LUNES',
  'MARTES',
  'MIERCOLES',
  'JUEVES',
  'VIERNES',
  'SABADO',
];

const months: string[] = [
  'ENERO',
  'FEBRERO',
  'MARZO',
  'ABRIL',
  'MAYO',
  'JUNIO',
  'JULIO',
  'AGOSTO',
  'SEPTIEMBRE',
  'OCTUBRE',
  'NOVIEMBRE',
  'DICIEMBRE',
];

const categories: string[] = ['FEMENIL', 'VARONIL', 'MIXTO'];

export function buildApp(app: VolleyApp): VolleyApp {
  app.teamsMap = buildTeamMap(app.teams);
  app.teamOptions = buildTeamOptions(app.teams);

  app.weeksMap = buildGameWeeks(app.games);

  app.standings = buildStandings(app.teams);
  app.eliminationGamesMap = new Map(Object.entries(app.eliminationGames));
  app.teamPlays = buildTeamPlay(app.teamPlays);
  app.playoffs = new Map();

  return app;
}

export function buildTeamMap(teams: Team[]) {
  const teamMap: Map<string, Team[]> = new Map<string, Team[]>();
  teams.forEach((team: Team) => {
    team.teamPlayers.sort((a, b) => b.gamesPercentage - a.gamesPercentage);
    if (teamMap.has(team.category)) {
      teamMap.get(team.category)?.push(team);
    } else {
      teamMap.set(team.category, [team]);
    }
  });
  return teamMap;
}

export function buildTeamOptions(teams: Team[]) {
  const teamOptions: Map<string, TeamOption[]> = new Map<
    string,
    TeamOption[]
  >();
  teams.forEach((team: Team) => {
    const teamOption: TeamOption = {
      name: team.name,
      category: team.category,
    };
    if (teamOptions.has(team.category)) {
      teamOptions.get(team.category)?.push(teamOption);
    } else {
      teamOptions.set(team.category, [teamOption]);
    }
  });
  return teamOptions;
}

export function buildGameWeeks(
  games: Game[],
): Map<number, Map<string, Game[]>> {
  // Add all games in a map with the week as key
  const weeksMap: Map<number, Game[]> = new Map<number, Game[]>();
  games.forEach((game: Game) => {
    if (weeksMap.has(game.weekNumber)) {
      weeksMap.get(game.weekNumber)?.push(game);
    } else {
      weeksMap.set(game.weekNumber, [game]);
    }
  });
  // Iterates the map to generate a new map inside
  const weeksDayMap: Map<number, Map<string, Game[]>> = new Map<
    number,
    Map<string, Game[]>
  >();
  for (const [key, value] of weeksMap) {
    weeksDayMap.set(key, buildGameWeekDay(value));
  }
  return weeksDayMap;
}

export function buildGameWeekDay(games: Game[]): Map<string, Game[]> {
  const weekDayMap: Map<string, Game[]> = new Map<string, Game[]>();
  games.forEach((game: Game) => {
    const dayName = daysOfWeek[new Date(game.gameDate).getDay()];
    const day = new Date(game.gameDate).getDate();
    const month = months[new Date(game.gameDate).getMonth()];
    const key = dayName + ' ' + day + ' ' + month;
    if (weekDayMap.has(key)) {
      weekDayMap.get(key)?.push(game);
    } else {
      weekDayMap.set(key, [game]);
    }
  });
  return weekDayMap;
}

export function buildStandings(teams: Team[]): Map<string, Team[]> {
  const map = new Map();
  for (const team of teams) {
    if (map.has(team.category)) {
      const _teams: Team[] = map.get(team.category);
      _teams.push(team);
      map.set(team.category, _teams);
    } else {
      map.set(team.category, [team]);
    }
  }
  const sortedMap = new Map();
  for (const category of categories) {
    const _teams: Team[] = map.get(category);
    _teams.sort((a, b) => a.position - b.position);
    sortedMap.set(category, _teams);
  }
  return sortedMap;
}

export function buildElminationGamesMap(games: Game[]): Map<string, Game[]> {
  console.log(games);
  /*
  new Map(Object.entries(app.eliminationGames))
  app.eliminationGamesMap.forEach((games, key) => {
    let quarter1: Game = emptyGame(1, 'QUARTER');
    let quarter2: Game = emptyGame(2, 'QUARTER');
    let quarter3: Game = emptyGame(3, 'QUARTER');
    let quarter4: Game = emptyGame(4, 'QUARTER');

    let semi1: Game = emptyGame(1, 'SEMI');
    let semi2: Game = emptyGame(2, 'SEMI');

    let finals: Game = emptyGame(1, 'FINAL');
    let thirds: Game = emptyGame(1, 'THIRD');
    games.forEach((game) => {
      switch (game.stage) {
        case 'QUARTER':
          switch (game.weekNumber) {
            case 1:
              quarter1 = game;
              break;
            case 2:
              quarter2 = game;
              break;
            case 3:
              quarter3 = game;
              break;
            case 4:
              quarter4 = game;
              break;
          }
          break;
        case 'SEMI':
          switch (game.weekNumber) {
            case 1:
              semi1 = game;
              break;
            case 2:
              semi2 = game;
              break;
          }
          break;
        case 'THIRD':
          thirds = game;
          break;
        case 'FINAL':
          finals = game;
          break;
      }
    });
    const playoffs: Playoffs = {
      quarter1: quarter1,
      quarter2: quarter2,
      quarter3: quarter3,
      quarter4: quarter4,

      semi1: semi1,
      semi2: semi2,

      finals: finals,
      thirds: thirds,
    };
    app.playoffs.set(key, playoffs);
  });
  */
  return new Map();
}

export function buildTeamPlay(
  teamPlay: Map<string, TeamPlay[]>,
): Map<string, TeamPlay[]> {
  const _teamPlay = new Map(Object.entries(teamPlay));
  _teamPlay.forEach((value: TeamPlay[]) => {
    for (const teamPlay of value) {
      teamPlay.teamsPlayed = new Map(Object.entries(teamPlay.teamsPlayed));
    }
  });
  return _teamPlay;
}
