import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
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
import {
  AppTournament,
  emptyAppTournament,
} from '../../core/model/app-tournament.model';
import { TeamOption } from '../../core/model/team-option.model';
import { Team } from '../../core/model/team.model';
import { AppSharedService } from '../../core/services/app-tournament-shared';
import { TeamUi } from '../team-ui/team-ui';

@Component({
  selector: 'app-teams',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    TeamUi,
  ],
  templateUrl: './teams.html',
  styleUrl: './teams.scss',
})
export class Teams implements OnInit, AfterViewInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private appSharedService: AppSharedService = inject(AppSharedService);
  public appTournament = signal<AppTournament>(emptyAppTournament());
  public error = signal<string>('');

  public category = signal<string>('');
  public teamId = signal<number>(0);

  public teams = signal<Team[]>([]);
  public teamOptions: TeamOption[] = [];

  public filterForm: FormGroup = this.formBuilder.group({
    category: [this.category, Validators.required],
    team: [{ value: this.teamId, disabled: true }, Validators.required],
  });

  private filterCategory(): void {
    this.teams.set(this.appTournament().teamsMap.get(this.category()) ?? []);
  }

  ngOnInit(): void {
    this.subscribeForm();
  }

  ngAfterViewInit(): void {
    const intervalId = setInterval(() => {
      const tmpAppTournament = this.appSharedService.getApp();
      if (tmpAppTournament.tournamentId) {
        this.appTournament.set(tmpAppTournament);
        if (tmpAppTournament.tournamentId === -1) {
          this.error.set('No se ha encontrado ningun torneo.');
        } else {
          this.teams.set(this.appTournament().teams);
          console.log(this.teams);
        }
        clearInterval(intervalId);
      }
    }, 250);
  }

  private filterTeams() {
    const _teams: Team[] = this.teams();
    this.teams.set([]);
    _teams.forEach((team: Team) => {
      if (team.teamId == this.teamId()) {
        // const _team = team;
        // _team.players.sort((a, b) => b.gamesPercentage - a.gamesPercentage);
        this.teams().push(team);
      }
    });
  }

  private subscribeForm(): void {
    this.filterForm
      .get('category')!
      .valueChanges.subscribe((category: string) => {
        this.teamOptions =
          this.appTournament().teamOptionsMap.get(category)! ?? [];
        this.category.set(category);
        this.filterForm.get('team')!.enable();
        this.filterCategory();
      });

    this.filterForm.get('team')!.valueChanges.subscribe((teamId: number) => {
      this.teamId.set(teamId);
      this.filterCategory();
      this.filterTeams();
    });
  }
}
