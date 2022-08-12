import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavLanguageComponent } from './nav-language.component';
import { StoreModule } from '@ngrx/store';
import { loginModalReducer } from '../../modals/login/store/login-modal.reducer';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { navbarReducer } from '../navbar/store/navbar.reducer';
import { appReducer } from '../../store/app.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NavLanguageComponent', () => {
  let component: NavLanguageComponent;
  let fixture: ComponentFixture<NavLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavLanguageComponent],
      imports: [
        StoreModule.forRoot({ info: appReducer, language: navbarReducer }),
        BrowserAnimationsModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(NavLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
