import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavLanguageComponent } from './nav-language.component';

describe('DropdownComponent', () => {
  let component: NavLanguageComponent;
  let fixture: ComponentFixture<NavLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavLanguageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
