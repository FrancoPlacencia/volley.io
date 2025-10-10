import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TeamUi } from '../team-ui/team-ui';
import { Team } from '../../core/model/team.model';

@Component({
  selector: 'app-standings',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    TeamUi,
  ],
  templateUrl: './standings.html',
  styleUrl: './standings.scss',
})
export class Standings {
  // Table Data
  public columns: string[] = ['position', 'name', 'games', 'sets', 'points'];

  public columnsExpanded = [...this.columns, 'expand'];

  expandedElement: Team | null = null;

  @Input() dataSource: MatTableDataSource<Team> | undefined;

  @Input() category: string | undefined;

  @Input() elimination: number | undefined;

  isExpanded(element: any): boolean {
    return this.expandedElement === element;
  }

  toggle(element: Team): void {
    this.expandedElement = this.isExpanded(element) ? null : element;
  }
}
