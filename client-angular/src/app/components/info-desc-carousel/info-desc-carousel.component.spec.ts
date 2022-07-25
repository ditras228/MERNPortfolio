import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDescCarouselComponent } from './info-desc-carousel.component';
import { StoreModule } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DescCarouselComponent', () => {
  let component: InfoDescCarouselComponent;
  let fixture: ComponentFixture<InfoDescCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoDescCarouselComponent],
      imports: [StoreModule.forRoot({})],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoDescCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
