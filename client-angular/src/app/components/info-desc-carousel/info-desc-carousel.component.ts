import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { GetInfo } from '../../../generated/graphql';
import { Store } from '@ngrx/store';
import {
  setCreateDescVisible,
  setEditDescVisible,
} from '../../modals/login/store/login-modal.actions';
import { UrlService } from '../../services/url.service';

SwiperCore.use([Pagination, Navigation, Autoplay]);

@Component({
  selector: 'app-desc-carousel',
  templateUrl: './info-desc-carousel.component.html',
  styleUrls: ['./info-desc-carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InfoDescCarouselComponent {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  @Input() info$: GetInfo | undefined;
  @Input() isAuth = false;

  constructor(public store$: Store, public urlService: UrlService) {}

  showCreateDescHandler(): void {
    this.store$.dispatch(setCreateDescVisible());
  }

  editDescHandler(): void {
    this.store$.dispatch(
      setEditDescVisible(
        this.info$?.desc[this.swiper?.swiperRef.realIndex || 0] || undefined
      )
    );
  }
}
