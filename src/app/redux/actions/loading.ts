import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Subscription } from 'rxjs';

@Injectable()
export class LoadingActions {
  static LOADING_STATE = 'LOADING_STATE';
  pendingRequestsSub: Subscription;

  constructor(private redux: NgRedux<any>) { }

    startLoading(blocked?: boolean) {
      this.redux.dispatch({
        type: LoadingActions.LOADING_STATE,
        payload: {
          loadingState: true,
          blocked: blocked
        }
      });
    }

    endLoading(isPendingRequests?) {
      if (isPendingRequests) {
        this.pendingRequestsSub = this.redux.select(['app', 'pendingRequest']).subscribe((pendingRequest) => {
          if (pendingRequest === 0) {
            this.redux.dispatch({
              type: LoadingActions.LOADING_STATE,
              payload: {
                loadingState: false
              }
            });
            this.pendingRequestsSub.unsubscribe();
          }
        });
      } else {
        this.redux.dispatch({
          type: LoadingActions.LOADING_STATE,
          payload: {
            loadingState: false
          }
        });
      }
    }
}
