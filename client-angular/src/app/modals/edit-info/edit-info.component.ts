import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {setEditInfoVisible, setLoginVisible} from "../login/store/login-modal.actions";
import {Store} from "@ngrx/store";
import {selectInfo} from "../../store/app.selectors";

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.scss']
})
export class EditInfoComponent implements OnInit {
  public errors: { [key: string]: string } = {};
  public name = new FormControl
  public job = new FormControl
  public desc = new FormControl
  public telegram = new FormControl
  public github = new FormControl
  public experience = new FormControl

  constructor(public store$: Store  ) { }

  closeModal():void{
    this.store$.dispatch(setEditInfoVisible())
  }
  ngOnInit(): void {
    this.store$.select(selectInfo).subscribe(info=>{
      this.name.setValue(info.name)
      this.job.setValue(info.job)
      this.desc.setValue(info.desc)
      this.telegram.setValue(info.contacts.telegram)
      this.github.setValue(info.contacts.github)
      this.experience.setValue(info.experience)
    })
  }

}
