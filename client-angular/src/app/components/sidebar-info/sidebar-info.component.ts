import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectInfo} from "../../store/app.selectors";
import {GetInfo} from "../../../generated/graphql";
import {LinkService} from "../../services/link.service";

@Component({
  selector: 'app-sidebar-info',
  templateUrl: './sidebar-info.component.html',
  styleUrls: ['./sidebar-info.component.scss']
})
export class SidebarInfoComponent implements OnInit {
  info$: GetInfo | undefined

  constructor(
    public store$: Store,

  ) {
  }

  ngOnInit(): void {
    this.store$.select(selectInfo).subscribe(info => {
        this.info$ = info
      }
    )

  }


}
