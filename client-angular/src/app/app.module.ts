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
import {LoginModalComponent} from "./modals/login/login-modal.component";
import {ModalComponent} from "./modals/modal/modal.component";
import { InputFieldComponent } from './components/input-field/input-field.component';
import {FormsModule} from "@angular/forms";
import {loginModalReducer} from "./modals/login/store/login-modal.reducer";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginEffects} from "./modals/login/store/login-modal.effects";
import { SwiperModule } from 'swiper/angular';
import { DescCarouselComponent } from './components/desc-carousel/desc-carousel.component';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { EditInfoComponent } from './modals/edit-info/edit-info.component';
import { EditWorkComponent } from './modals/edit-work/edit-work.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import {EditWorkEffects} from "./modals/edit-work/store/edit-work.effects";
import {editWorkReducer} from "./modals/edit-work/store/edit-work.reducer";
import {editInfoReducer} from "./modals/edit-info/store/edit-info.reducer";
import {EditInfoEffects} from "./modals/edit-info/store/edit-info.effects";

@NgModule({
  declarations: [
    AppComponent,
    WorkListComponent,
    WorkComponent,
    NavbarComponent,
    SidebarInfoComponent,
    InfoToolsComponent,
    InfoSkillsComponent,
    InfoContactsComponent,
    ModalComponent,

    LoginModalComponent,
    InputFieldComponent,
    DescCarouselComponent,
    TextAreaComponent,
    EditInfoComponent,
    EditWorkComponent,
    DropdownComponent,
  ],
    imports: [
      SwiperModule,

      BrowserModule.withServerTransition({appId: 'serverApp'}),
        StoreModule.forRoot({info: appReducer, login: loginModalReducer, editWork: editWorkReducer, editInfo: editInfoReducer}, {}),
        StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
        EffectsModule.forRoot([AppEffects, LoginEffects,EditWorkEffects, EditInfoEffects]),
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
    ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
