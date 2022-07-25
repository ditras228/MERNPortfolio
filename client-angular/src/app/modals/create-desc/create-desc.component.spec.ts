import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDescComponent } from './create-desc.component';
import { StoreModule } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EditDescComponent', () => {
  let component: CreateDescComponent;
  let fixture: ComponentFixture<CreateDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateDescComponent],
      imports: [StoreModule.forRoot({})],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
