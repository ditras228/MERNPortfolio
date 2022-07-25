import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoContactsComponent } from './info-contacts.component';
import { StoreModule } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('InfoContactsComponent', () => {
  let component: InfoContactsComponent;
  let fixture: ComponentFixture<InfoContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoContactsComponent],
      imports: [StoreModule.forRoot({})],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
