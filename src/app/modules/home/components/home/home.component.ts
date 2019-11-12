import { Component, OnInit, OnDestroy } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { MainActions } from '../../../../redux/actions/main';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @select(['app']) appState$: Observable<any>;

  constructor(private mainActions: MainActions) {
    console.log("LOADEDDD");
  }

}
