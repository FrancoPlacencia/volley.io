import { Injectable, signal } from '@angular/core';
import { emptyApp, VolleyApp } from '../model/volley-app.model';

@Injectable({
  providedIn: 'root',
})
export class AppSharedService {
  private app = signal(emptyApp());

  public getApp(): VolleyApp {
    return this.app();
  }

  public updateApp(app: VolleyApp): void {
    this.app.set(app);
  }
}
