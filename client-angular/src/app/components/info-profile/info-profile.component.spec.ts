import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProfileComponent } from './info-profile.component';
import { StoreModule } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('InfoProfileComponent', () => {
  let component: InfoProfileComponent;
  let fixture: ComponentFixture<InfoProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoProfileComponent],
      imports: [StoreModule.forRoot({})],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
