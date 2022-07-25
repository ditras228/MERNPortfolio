import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreModule } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EditDescComponent } from './edit-desc.component';
import { loginModalReducer } from '../login/store/login-modal.reducer';

describe('EditDescComponent', () => {
  let component: EditDescComponent;
  let fixture: ComponentFixture<EditDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditDescComponent],
      imports: [StoreModule.forRoot({})],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(EditDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
