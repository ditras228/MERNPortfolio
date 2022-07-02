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
import {APOLLO_OPTIONS} from "apollo-angular";
import {HttpLink} from "apollo-angular/http";
import {InMemoryCache} from "@apollo/client/core";
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
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://48p1r2roz4.sse.codesandbox.io',
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
