import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoContactsComponent } from './info-contacts.component';

describe('InfoContactsComponent', () => {
  let component: InfoContactsComponent;
  let fixture: ComponentFixture<InfoContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoContactsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
