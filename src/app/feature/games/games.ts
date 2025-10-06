import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Game } from '../../core/model/game.model';
import { TeamOption } from '../../core/model/team-option.model';
import { TeamStat } from '../../core/model/team-stat.model';
import { AppSharedService } from '../../core/services/app-tournament-shared';
import { Week } from '../week/week';

@Component({
  selector: 'app-games',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    Week,
  ],
  templateUrl: './games.html',
  styleUrl: './games.scss',
})
export class Games implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private appSharedService: AppSharedService = inject(AppSharedService);

  public allGames = signal<Game[]>([]);
  public filterGames = signal<Map<string, Game[]>>(new Map<string, Game[]>());
  public error = signal<string>('');

  public teamOptionsMap = signal<Map<string, TeamOption[]>>(
    new Map<string, TeamOption[]>(),
  );
  public teamOptions: TeamOption[] = [];

  public category: string = '';
  public teamId = signal<number>(0);

  public filterForm: FormGroup = this.formBuilder.group({
    category: [this.category, Validators.required],
    team: [{ value: this.teamId(), disabled: true }, Validators.required],
  });

  ngOnInit(): void {
    const intervalId = setInterval(() => {
      const app = this.appSharedService.getApp();
      if (app.tournamentId) {
        if (app.tournamentId === -1) {
          this.error.set('No se ha encontrado ningun torneo.');
        } else {
          this.teamOptionsMap.set(app.teamOptionsMap);
          this.allGames.set(app.games);
          console.log('teamOptionsMap', this.teamOptionsMap());
        }
        clearInterval(intervalId);
      }
    }, 200);

    this.subscribeForm();
  }

  private filterCategory(): void {
    this.filterGames.set(new Map<string, Game[]>());
    const _games: Game[] = [];
    this.allGames().forEach((game: Game) => {
      if (game.category === this.category) {
        _games.push(game);
      }
    });
    this.filterGames().set('', _games);
  }

  private filterTeams() {
    this.filterGames.set(new Map<string, Game[]>());
    const _games: Game[] = [];
    this.allGames().forEach((game: Game) => {
      game.teamStats.forEach((teamStat: TeamStat) => {
        if (teamStat.teamId == this.teamId()) {
          _games.push(game);
        }
      });
    });
    this.filterGames().set('', _games);
    console.log('games', this.filterGames());
  }

  private subscribeForm(): void {
    this.filterForm
      .get('category')!
      .valueChanges.subscribe((selectedValue: string) => {
        this.filterForm.get('team')!.enable();
        this.teamOptions = this.teamOptionsMap().get(selectedValue)! ?? [];
        this.category = selectedValue;
        this.filterCategory();
      });

    this.filterForm.get('team')!.valueChanges.subscribe((teamId: number) => {
      this.teamId.set(teamId);
      this.filterCategory();
      this.filterTeams();
    });
  }
}
