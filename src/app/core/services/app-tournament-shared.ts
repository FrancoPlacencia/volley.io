import { Injectable, signal } from '@angular/core';
import {
  AppTournament,
  emptyAppTournament,
} from '../model/app-tournament.model';

@Injectable({
  providedIn: 'root',
})
export class AppSharedService {
  private app = signal(emptyAppTournament());

  public getApp(): AppTournament {
    return this.app();
  }

  public updateApp(app: AppTournament): void {
    this.app.set(app);
  }
}
