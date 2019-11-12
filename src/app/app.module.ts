import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PwaService } from './services/pwa-service.service';
import { rootReducer } from './redux/store';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { ToastrModule } from 'ngx-toastr';
import { LoadingActions, MainActions, SidenavActions } from './redux/actions';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LeafletModule.forRoot(),
    LeafletDrawModule.forRoot()
  ],
  providers: [
    PwaService,
    LoadingActions,
    MainActions,
    SidenavActions,
    {provide: LOCALE_ID, useValue: 'es-ES'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private ngRedux: NgRedux<any>, private ngReduxRouter: NgReduxRouter) {
    /* const currState = window.sessionStorage.getItem('reduxState') ? JSON.parse(window.sessionStorage.getItem('reduxState')) : {}; */

    ngRedux.configureStore(rootReducer, {});

    /* ngRedux.subscribe(() => {
      window.sessionStorage.setItem('reduxState', JSON.stringify(ngRedux.getState()));
    }); */
    ngReduxRouter.initialize();

    // the second parameter 'fr' is optional
    registerLocaleData(localeEs, 'es');
  }
}
