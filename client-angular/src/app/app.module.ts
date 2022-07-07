import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {WorkListComponent} from './components/work-list/work-list.component';
import {WorkComponent} from './components/work/work.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SidebarInfoComponent} from './components/sidebar-info/sidebar-info.component';
import {InfoToolsComponent} from './components/info-tools/info-tools.component';
import {InfoSkillsComponent} from './components/info-skills/info-skills.component';
import {InfoContactsComponent} from './components/info-contacts/info-contacts.component';
import {StoreModule} from '@ngrx/store';
import {appReducer} from "./store/app.reducer";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from "./store/app.effects";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    WorkListComponent,
    WorkComponent,
    NavbarComponent,
    SidebarInfoComponent,
    InfoToolsComponent,
    InfoSkillsComponent,
    InfoContactsComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({info: appReducer}, {}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([AppEffects]),
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
