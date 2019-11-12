import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';

@Injectable()
export class CanLoadService implements CanActivate {

    constructor(private redux: NgRedux<any>, private router: Router) { }

    canActivate() {
        const login = this.redux.getState().login;
        if (login && login.logged) {
            return true;
        } else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }

}
