import {Component, ViewEncapsulation, ViewChild, OnInit, Input} from "@angular/core";
import {SwiperComponent} from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, {Autoplay, Navigation, Pagination, SwiperOptions} from "swiper";
import {GetDesc, GetInfo} from "../../../generated/graphql";
import {Store} from "@ngrx/store";
import {setEditDescVisible} from "../../modals/login/store/login-modal.actions";
import {selectIsAuth} from "../../modals/login/store/login-modal.selectors";
import Swiper from "swiper";

// install Swiper modules
SwiperCore.use([Pagination, Navigation, Autoplay]);

@Component({
  selector: 'app-desc-carousel',
  templateUrl: './info-desc-carousel.component.html',
  styleUrls: ['./info-desc-carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class InfoDescCarouselComponent {
  @Input() info$: GetInfo | undefined
  @Input() isAuth = false
  @ViewChild('swiper', {static: false}) swiper?: SwiperComponent;


  constructor(public store$: Store) {
  }

  editDescHandler(): void {
    this.store$.dispatch(setEditDescVisible(this.info$?.desc[this.swiper?.swiperRef.realIndex || 0] || undefined))
  }

}
