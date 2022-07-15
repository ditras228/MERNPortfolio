import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {  selectWorks} from "../../store/app.selectors";
import {Store} from "@ngrx/store";
import { setEditWorkVisible} from "../login/store/login-modal.actions";
import {selectCurrentWorkID} from "../login/store/login-modal.selectors";

@Component({
  selector: 'app-edit-work',
  templateUrl: './edit-work.component.html',
  styleUrls: ['./edit-work.component.scss']
})
export class EditWorkComponent implements OnInit {
  public errors: { [key: string]: string } = {};
  public name = new FormControl
  public description = new FormControl
  public tags = new FormControl
  public github = new FormControl
  public figma = new FormControl
  public demo = new FormControl

  constructor(public store$: Store) {
  }
  closeModal():void{
    this.store$.dispatch(setEditWorkVisible(-1))
  }
  ngOnInit(): void {
    let workId
    this.store$.select(selectCurrentWorkID).subscribe(id=>{
      workId = id
      this.store$.select(selectWorks).subscribe(works => {
        if (works?.length && works[workId]) {
          this.name.setValue(works[workId].name);
          this.description.setValue(works[workId].description);
          this.github.setValue(works[workId].github);
          this.figma.setValue(works[workId].figma);
          this.demo.setValue(works[workId].demo);
        }
      })

    })

  }
}
