import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { BoardActions } from './actions/app.actions';
import { IAppState } from './models/app-state.interface';
import { INITIAL_STATE, rootReducer } from './store';
import { CellComponentComponent } from './components/cell-component/cell-component.component';


@NgModule({
  declarations: [
    AppComponent,
    CellComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgReduxModule
  ],
  providers: [BoardActions],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
