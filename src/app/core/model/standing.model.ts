import { Team } from './team.model';

export interface Standing {
  position: number;
  teamJJ: number;
  teamJG: number;
  teamJP: number;
  teamDJ: number;

  teamSG: number;
  teamSP: number;
  teamDS: number;

  teamPG: number;
  teamPP: number;
  teamDP: number;

  team: Team;
}
