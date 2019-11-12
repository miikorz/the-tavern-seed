import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Router } from '@angular/router';
@Injectable()
export class MainActions {
  static CHANGE_THEME = 'CHANGE_THEME';
  static CLEAR_ROOT_STATE = 'CLEAR_ROOT_STATE';

  constructor(private redux: NgRedux<any>, private router: Router) { }

    changeTheme(value) {
      this.redux.dispatch({
        type: MainActions.CHANGE_THEME,
        payload: {
          theme: value
        }
      });
    }

    logout() {
      this.redux.dispatch({
        type: MainActions.CLEAR_ROOT_STATE
      });
      this.router.navigate(['/login']);
    }
}
