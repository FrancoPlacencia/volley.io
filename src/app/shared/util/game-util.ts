import { Game } from '../../core/model/game.model';
import { TeamOption } from '../../core/model/team-option.model';
import { Team } from '../../core/model/team.model';

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

export function generateGameWeeks(
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
    weeksDayMap.set(key, generateGameWeekDay(value));
  }
  return weeksDayMap;
}

export function generateGameWeekDay(games: Game[]): Map<string, Game[]> {
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

export function generateTeamMap(teams: Team[]) {
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

export function generateTeamOptions(teams: Team[]) {
  const teamOptions: Map<string, TeamOption[]> = new Map<
    string,
    TeamOption[]
  >();
  teams.forEach((team: Team) => {
    const teamOption: TeamOption = {
      teamId: team.teamId,
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
