import {Component, ViewEncapsulation, ViewChild, OnInit, Input} from "@angular/core";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, {Autoplay, Navigation, Pagination} from "swiper";
import {GetInfo} from "../../../generated/graphql";
import {Store} from "@ngrx/store";
import {setEditDescVisible} from "../../modals/login/store/login-modal.actions";

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
  constructor(public store$: Store) { }
  editDescHandler():void{
    this.store$.dispatch(setEditDescVisible())
  }
  ngOnInit(): void {
  }

}
