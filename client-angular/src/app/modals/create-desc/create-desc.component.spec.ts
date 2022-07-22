import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDescComponent } from './create-desc.component';

describe('EditDescComponent', () => {
  let component: CreateDescComponent;
  let fixture: ComponentFixture<CreateDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateDescComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
