import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkComponent } from './create-work.component';
import { StoreModule } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { createWorkReducer } from './store/create-work.reducer';
import { editWorkReducer } from '../edit-work/store/edit-work.reducer';

describe('EditWorkComponent', () => {
  let component: CreateWorkComponent;
  let fixture: ComponentFixture<CreateWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateWorkComponent],
      imports: [
        StoreModule.forRoot({
          createWork: createWorkReducer,
          editWork: editWorkReducer,
        }),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
