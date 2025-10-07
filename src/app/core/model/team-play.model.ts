import { TeamGame } from './team-game.model';

export interface TeamPlay {
  team: string;
  initials: string;
  teamsPlayed: Map<string, TeamGame>;
}

export function emptyTeamPlay(): TeamPlay {
  const teamPlay: TeamPlay = {
    team: '',
    initials: '',
    teamsPlayed: new Map(),
  };
  return teamPlay;
}
