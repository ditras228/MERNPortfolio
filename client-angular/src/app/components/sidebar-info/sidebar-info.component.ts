import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectInfo} from "../../store/app.selectors";
import {GetInfo} from "../../../generated/graphql";
import {SwiperOptions} from "swiper";
import {SwiperComponent} from "swiper/angular";
import {fadeAnimation} from "../../app.animation";
import {setEditInfoVisible} from "../../modals/login/store/login-modal.actions";
import {selectIsAuth} from "../../modals/login/store/login-modal.selectors";

@Component({
  selector: 'app-sidebar-info',
  templateUrl: './sidebar-info.component.html',
  styleUrls: ['./sidebar-info.component.scss'] ,
  encapsulation: ViewEncapsulation.None,
  animations: [fadeAnimation]
})
export class SidebarInfoComponent implements OnInit {
  info$: GetInfo | undefined
  @Input() isAuth = false

  constructor(
    public store$: Store,

  ) {
  }

  editInfoHandler():void{
      this.store$.dispatch(setEditInfoVisible())
  }
  ngOnInit(): void {
    this.store$.select(selectInfo).subscribe(info => {
        this.info$ = info
      }
    )

  }


}
