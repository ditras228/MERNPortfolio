import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {setCreateDescForm, submitCreateDescForm} from "./store/create-desc.actions";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationService} from "../../services/validation.service";
import {setCreateDescVisible} from "../login/store/login-modal.actions";

@Component({
  selector: 'app-create-desc',
  templateUrl: './create-desc.component.html',
  styleUrls: ['./create-desc.component.scss']
})
export class CreateDescComponent implements OnInit {
  public errors: { [key: string]: string } = {};
  public text = new FormControl
  public imgUrl = new FormControl
  public form: FormGroup<{
    text: FormControl<string>;
    imgUrl: FormControl<string>;
  }> | undefined

  constructor(public store$: Store, public validationService: ValidationService) {
  }

  closeModal(): void {
    this.store$.dispatch(setCreateDescVisible())
  }

  setImgUrlValue(e: string | ArrayBuffer | null):void{
    this.imgUrl.setValue(e)
  }
  submitFormHandler(): void {
    console.log('form')
    if (this.form?.invalid) {
      console.log('invalid')

      this.errors = this.validationService.GetValidationMessage(this.form, this.errors)
    } else {
      this.errors = {}
      this.store$.dispatch(setCreateDescForm({
        text: this.text.value,
        imgUrl: this.imgUrl.value
      }))
      this.store$.dispatch(submitCreateDescForm())
    }
  }

  ngOnInit(): void {
    this.text = new FormControl(null, [Validators.required])
    this.imgUrl = new FormControl(null, [Validators.required])


    this.form = new FormGroup({
      text: this.text,
      imgUrl: this.imgUrl,
    })

  }

}
