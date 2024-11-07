import { Component } from '@angular/core';
import { AppStateService } from "./services/app-state.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'unika-angular';
  loading$ = this.appState.loading$;
  error$ = this.appState.error$;

  constructor(private appState: AppStateService) {}
}
