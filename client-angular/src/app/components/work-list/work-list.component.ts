import { Component, OnInit } from '@angular/core';
import { selectWorks} from "../../store/app.selectors";
import {GetWork} from "../../../generated/graphql";
import {Store} from "@ngrx/store";
import {listAnimation} from "../../app.animation";

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.scss'],
  animations: [listAnimation]
})
export class WorkListComponent implements OnInit {
  works$: GetWork[] | any

  constructor(public store$: Store) { }

  ngOnInit(): void {
    this.store$.select(selectWorks).subscribe(works => {
        this.works$ = works
      }
    )

  }


}
