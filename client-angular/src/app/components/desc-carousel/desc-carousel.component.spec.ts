import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescCarouselComponent } from './desc-carousel.component';

describe('DescCarouselComponent', () => {
  let component: DescCarouselComponent;
  let fixture: ComponentFixture<DescCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
