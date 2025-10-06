import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  input,
  OnDestroy,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  ActivatedRoute,
  ParamMap,
  Router,
  RouterModule,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { Tournament } from '../../../core/model/tournament.model';
import { DarkMode } from '../dark-mode/dark-mode';

@Component({
  selector: 'app-top-bar',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    RouterModule,
    DarkMode,
  ],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.scss',
})
export class TopBar implements OnInit, OnDestroy {
  // DI
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  @Input() public collapsed: boolean = false;
  @Input() public tournamentName: string = '';

  @Output() toggleNavigation = new EventEmitter<boolean>();

  public tournament = input<Tournament>();

  private routeSubscription: Subscription | undefined;

  private url: string = '';
  public isTournament: boolean = false;
  public categories: string[] = ['FEMENIL', 'VARONIL', 'MIXTO'];
  public categoryParam: string = '';

  public authenticated = signal(false);

  ngOnInit(): void {
    this.url = this.router.url;
    if (this.url.startsWith('/admin/tournament')) {
      this.isTournament = true;
    } else {
      if (this.url.startsWith('/admin/team')) {
        this.routeSubscription = this.route.queryParamMap.subscribe(
          (paramMap: ParamMap) => {
            this.categoryParam = paramMap.get('category') || '';
          },
        );
      }
    }
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  public goToEliminations(tournamentId: number, stage: string): void {
    this.router.navigate(['/admin/game'], {
      relativeTo: this.route,
      queryParams: {
        id: tournamentId,
        stage: stage,
      },
    });
  }

  public goToTeam(): void {
    this.router.navigate(['/admin/team'], {
      relativeTo: this.route,
      queryParams: {
        id: this.tournament()?.tournamentId,
      },
    });
  }

  public goToPlayer(): void {
    this.router.navigate(['/admin/player'], {
      relativeTo: this.route,
      queryParams: {
        id: this.tournament()?.tournamentId,
      },
    });
  }

  public goToGame(tournamentId: number, week: number) {
    this.router.navigate(['/admin/game'], {
      relativeTo: this.route,
      queryParams: {
        id: tournamentId,
        category: 'REGULAR',
        week: week,
      },
    });
  }

  public goToNewGame(tournamentId: number, newWeekNumber: number) {
    newWeekNumber++;
    this.router.navigate(['/admin/game'], {
      relativeTo: this.route,
      queryParams: {
        id: tournamentId,
        category: 'REGULAR',
        week: newWeekNumber,
      },
    });
  }

  public goToTournaments(): void {
    this.router.navigate(['/admin/tournament'], {
      relativeTo: this.route,
    });
  }

  public getCategoryClass(category: string): string {
    switch (category) {
      case 'FEMENIL':
        return 'pink-theme';
      case 'VARONIL':
        return 'blue-theme';
      case 'MIXTO':
        return 'green-theme';
      default:
        return '';
    }
  }

  public home(): void {
    this.router.navigate(['/app'], {
      relativeTo: this.route,
    });
  }

  public cleannName(name: string): string {
    return name.replace('_', ' ');
  }

  public collapseNavigation(): void {
    this.toggleNavigation.emit(this.collapsed);
  }
}
