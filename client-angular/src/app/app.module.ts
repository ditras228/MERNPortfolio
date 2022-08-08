import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WorkListComponent } from './components/work-list/work-list.component';
import { WorkComponent } from './components/work/work.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InfoComponent } from './components/info/info.component';
import { InfoSkillsComponent } from './components/info-skills/info-skills.component';
import { InfoContactsComponent } from './components/info-contacts/info-contacts.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/app.effects';
import { HttpClientModule } from '@angular/common/http';
import { LoginModalComponent } from './modals/login/login-modal.component';
import { ModalComponent } from './modals/modal/modal.component';
import { InputFieldComponent } from './ui/input-field/input-field.component';
import { FormsModule } from '@angular/forms';
import { loginModalReducer } from './modals/login/store/login-modal.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginEffects } from './modals/login/store/login-modal.effects';
import { SwiperModule } from 'swiper/angular';
import { InfoDescCarouselComponent } from './components/info-desc-carousel/info-desc-carousel.component';
import { TextAreaComponent } from './ui/text-area/text-area.component';
import { EditInfoComponent } from './modals/edit-info/edit-info.component';
import { EditWorkComponent } from './modals/edit-work/edit-work.component';
import { EditWorkEffects } from './modals/edit-work/store/edit-work.effects';
import { editWorkReducer } from './modals/edit-work/store/edit-work.reducer';
import { editInfoReducer } from './modals/edit-info/store/edit-info.reducer';
import { EditInfoEffects } from './modals/edit-info/store/edit-info.effects';
import { EditDescComponent } from './modals/edit-desc/edit-desc.component';
import { EditDescEffects } from './modals/edit-desc/store/edit-desc.effects';
import { editDescReducer } from './modals/edit-desc/store/edit-desc.reducer';
import { InfoProfileComponent } from './components/info-profile/info-profile.component';
import { NotificationComponent } from './ui/notification/notification.component';
import { ImageInputComponent } from './ui/image-input/image-input.component';
import { CreateWorkComponent } from './modals/create-work/create-work.component';
import { createWorkReducer } from './modals/create-work/store/create-work.reducer';
import { CreateWorkEffects } from './modals/create-work/store/create-work.effects';
import { CreateDescComponent } from './modals/create-desc/create-desc.component';
import { createDescReducer } from './modals/create-desc/store/create-desc.reducer';
import { CreateDescEffects } from './modals/create-desc/store/create-desc.effects';
import { notificationReducer } from './ui/notification/store/notification.reducer';
import { UrlService } from './services/url.service';
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';
import { ValidationService } from './services/validation.service';
import { GraphqlService } from './services/graphql.service';
import { WindowService } from './services/window.service';
import { NavLanguageComponent } from './components/nav-language/nav-language.component';
import { modalReducer } from './modals/modal/store/modal.reducer';
import { navbarReducer } from './components/navbar/store/navbar.reducer';
import { ModalContainerComponent } from './modals/modal-container/modal-container.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    WorkListComponent,
    WorkComponent,
    NavbarComponent,
    InfoComponent,
    InfoSkillsComponent,
    InfoContactsComponent,
    ModalComponent,
    LoginModalComponent,
    InputFieldComponent,
    InfoDescCarouselComponent,
    TextAreaComponent,
    EditInfoComponent,
    EditWorkComponent,
    EditDescComponent,
    InfoProfileComponent,
    NotificationComponent,
    ImageInputComponent,
    CreateWorkComponent,
    CreateDescComponent,
    NavLanguageComponent,
    ModalContainerComponent,
  ],
  imports: [
    SwiperModule,
    FormsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    StoreModule.forRoot(
      {
        info: appReducer,
        login: loginModalReducer,
        editWork: editWorkReducer,
        editInfo: editInfoReducer,
        editDesc: editDescReducer,
        createWork: createWorkReducer,
        createDesc: createDescReducer,
        notification: notificationReducer,
        modal: modalReducer,
        language: navbarReducer,
      },
      {}
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([
      AppEffects,
      LoginEffects,
      EditWorkEffects,
      EditInfoEffects,
      EditDescEffects,
      CreateWorkEffects,
      CreateDescEffects,
    ]),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthService,
    UrlService,
    NotificationService,
    ValidationService,
    GraphqlService,
    WindowService,
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
