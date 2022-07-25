import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkComponent } from './edit-work.component';
import { StoreModule } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { editWorkReducer } from './store/edit-work.reducer';
import { appReducer } from '../../store/app.reducer';
import { loginModalReducer } from '../login/store/login-modal.reducer';

describe('EditWorkComponent', () => {
  let component: EditWorkComponent;
  let fixture: ComponentFixture<EditWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditWorkComponent],
      imports: [
        StoreModule.forRoot({
          editWork: editWorkReducer,
          info: appReducer,
          login: loginModalReducer,
        }),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(EditWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
