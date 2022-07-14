import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectInfo} from "../../store/app.selectors";
import {GetInfo} from "../../../generated/graphql";
import {SwiperOptions} from "swiper";
import {SwiperComponent} from "swiper/angular";
import {fadeAnimation} from "../../app.animation";

@Component({
  selector: 'app-sidebar-info',
  templateUrl: './sidebar-info.component.html',
  styleUrls: ['./sidebar-info.component.scss'] ,
  encapsulation: ViewEncapsulation.None,
  animations: [fadeAnimation]
})
export class SidebarInfoComponent implements OnInit {
  info$: GetInfo | undefined

  constructor(
    public store$: Store,

  ) {
  }
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  slideNext(){
    this.swiper?.swiperRef.slideNext(100);
  }
  slidePrev(){
    this.swiper?.swiperRef.slidePrev(100);
  }
  ngOnInit(): void {
    this.store$.select(selectInfo).subscribe(info => {
        this.info$ = info
      }
    )

  }


}
