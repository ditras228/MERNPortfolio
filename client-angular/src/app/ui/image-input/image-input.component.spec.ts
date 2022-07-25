import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageInputComponent } from './image-input.component';
import { StoreModule } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ImageInputComponent', () => {
  let component: ImageInputComponent;
  let fixture: ComponentFixture<ImageInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageInputComponent],
      imports: [StoreModule.forRoot({})],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
