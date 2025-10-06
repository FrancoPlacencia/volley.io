import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Team } from '../../core/model/team.model';

@Component({
  selector: 'app-team-ui',
  imports: [CommonModule, MatCardModule],
  templateUrl: './team-ui.html',
  styleUrl: './team-ui.scss',
})
export class TeamUi {
  @Input() team!: Team;

  @Input() teamFilter: number = 0;
  public minQualify = 30;
  public qualify = 40;
}
