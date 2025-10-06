import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Standing } from '../../core/model/standing.model';
import { TeamUi } from '../team-ui/team-ui';

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

  expandedElement: Standing | null = null;

  @Input() dataSource: MatTableDataSource<Standing> | undefined;

  @Input() category: string | undefined;

  @Input() elimination: number | undefined;

  isExpanded(element: any): boolean {
    return this.expandedElement === element;
  }

  toggle(element: Standing): void {
    this.expandedElement = this.isExpanded(element) ? null : element;
  }
}
