import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoToolsComponent } from './info-tools.component';

describe('InfoToolsComponent', () => {
  let component: InfoToolsComponent;
  let fixture: ComponentFixture<InfoToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoToolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
