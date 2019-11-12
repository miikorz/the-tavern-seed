import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

@Injectable()
export class SidenavActions {
  static SET_SIDENAV_OPEN = 'SET_SIDENAV_OPEN';
  static SET_PAGE = 'SET_PAGE';

  constructor(private redux: NgRedux<any>) { }

  toggleSidenav() {
      this.redux.dispatch({
        type: SidenavActions.SET_SIDENAV_OPEN,
        payload: {
          sidenavOpen: !this.redux.getState().app.sidenavOpen
        }
      });
    }

    setPage(value: boolean) {
      this.redux.dispatch({
        type: SidenavActions.SET_PAGE,
        payload: {
          page: value
        }
      });
    }
}
