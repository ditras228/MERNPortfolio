import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDescCarouselComponent } from './info-desc-carousel.component';

describe('DescCarouselComponent', () => {
  let component: InfoDescCarouselComponent;
  let fixture: ComponentFixture<InfoDescCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoDescCarouselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoDescCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
