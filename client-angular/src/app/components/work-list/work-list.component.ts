import { Component, OnInit } from '@angular/core';
import {selectInfo, selectWorks} from "../../store/app.selectors";
import {GetInfo, GetWork} from "../../../generated/graphql";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.scss']
})
export class WorkListComponent implements OnInit {
  works$: GetWork[] | null | undefined

  constructor(public store$: Store) { }

  ngOnInit(): void {
    this.store$.select(selectWorks).subscribe(works => {
        this.works$ = works
      }
    )

  }


}
