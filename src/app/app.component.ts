import { SidenavActions } from './redux/actions/sidenav';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { PwaService } from './services/pwa-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(private sidenavActions: SidenavActions) {}

  toggleSidenav() {
    this.sidenavActions.toggleSidenav();
  }
}
