import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {GetWork} from "../../../generated/graphql";
import {setEditInfoVisible, setEditWorkVisible} from "../../modals/login/store/login-modal.actions";
import {Store} from "@ngrx/store";
import {setEditWorkTags} from "../../modals/edit-work/store/edit-work.actions";

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WorkComponent implements OnInit {
  @Input() work: GetWork | undefined
  @Input() isAuth = false

  constructor(public store$: Store) { }
  editWorkHandler():void{
    this.store$.dispatch(setEditWorkTags(this.work?.tags))

    this.store$.dispatch(setEditWorkVisible(this.work))
  }
  ngOnInit(): void {
  }
  public isPortfolio(url: any):boolean{
    return window.location.origin==url
  }
  public openLink(url: any): void{
    window.open(url)
  }
}
