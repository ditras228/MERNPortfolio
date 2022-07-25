import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSkillsComponent } from './info-skills.component';
import { StoreModule } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('InfoSkillsComponent', () => {
  let component: InfoSkillsComponent;
  let fixture: ComponentFixture<InfoSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoSkillsComponent],
      imports: [StoreModule.forRoot({})],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
