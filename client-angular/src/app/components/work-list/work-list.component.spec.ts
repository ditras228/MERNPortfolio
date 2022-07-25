import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkListComponent } from './work-list.component';
import { StoreModule } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { appReducer } from '../../store/app.reducer';

describe('WorkListComponent', () => {
  let component: WorkListComponent;
  let fixture: ComponentFixture<WorkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkListComponent],
      imports: [StoreModule.forRoot({ info: appReducer })],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
