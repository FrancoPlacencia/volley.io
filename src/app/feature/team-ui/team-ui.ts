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

  public getShortName(name: string): string {
    const nameArray = name.split(' ');
    let retVal: string = '';
    if (nameArray.length === 1) {
      retVal = nameArray[0];
    } else {
      if (nameArray.length === 2) {
        retVal = nameArray[0] + ' ' + nameArray[1].charAt(0) + '.';
      } else {
        retVal =
          nameArray[0] +
          ' ' +
          nameArray[1] +
          ' ' +
          nameArray[2].charAt(0) +
          '.';
      }
    }
    return retVal;
  }
}
