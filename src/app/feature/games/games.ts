import { Component, inject, Input, OnInit, signal } from '@angular/core';
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
import { emptyApp, VolleyApp } from '../../core/model/volley-app.model';
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
  @Input() app: VolleyApp = emptyApp();

  private formBuilder: FormBuilder = inject(FormBuilder);

  public allGames = signal<Game[]>([]);
  public filterGames = signal<Map<string, Game[]>>(new Map<string, Game[]>());

  public teamOptionsMap = signal<Map<string, TeamOption[]>>(
    new Map<string, TeamOption[]>(),
  );
  public teamOptions: TeamOption[] = [];

  public category: string = '';
  public teamName = signal<string>('');

  public filterForm: FormGroup = this.formBuilder.group({
    category: [this.category, Validators.required],
    team: [{ value: this.teamName(), disabled: true }, Validators.required],
  });

  ngOnInit(): void {
    this.teamOptionsMap.set(this.app.teamOptions);
    this.allGames.set(this.app.games);
    console.log(this.allGames()[0].gameDate);
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
        if (teamStat.teamName == this.teamName()) {
          _games.push(game);
        }
      });
    });
    this.filterGames().set(this.teamName(), _games);
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

    this.filterForm.get('team')!.valueChanges.subscribe((teamName: string) => {
      this.teamName.set(teamName);
      this.filterCategory();
      this.filterTeams();
    });
  }
}
