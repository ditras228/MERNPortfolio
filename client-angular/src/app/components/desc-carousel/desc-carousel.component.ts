import {Component, ViewEncapsulation, ViewChild, OnInit, Input} from "@angular/core";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, {Autoplay, Navigation, Pagination} from "swiper";
import {GetDesc, GetInfo} from "../../../generated/graphql";
import {Store} from "@ngrx/store";
import {setEditDescVisible} from "../../modals/login/store/login-modal.actions";
import {selectIsAuth} from "../../modals/login/store/login-modal.selectors";

// install Swiper modules
SwiperCore.use([Pagination, Navigation, Autoplay]);

@Component({
  selector: 'app-desc-carousel',
  templateUrl: './desc-carousel.component.html',
  styleUrls: ['./desc-carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class DescCarouselComponent implements OnInit {
  @Input() info$: GetInfo | undefined
  @Input() isAuth = false

  constructor(public store$: Store) { }

  editDescHandler(desc: GetDesc | null):void{
    this.store$.dispatch(setEditDescVisible( desc || undefined))
  }
  ngOnInit(): void {
  }

}
