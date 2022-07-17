import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {setEditDescForm, submitEditDescForm} from "./store/edit-desc.actions";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {selectInfo} from "../../store/app.selectors";
import {selectEditInfoFormInput} from "./store/edit-desc.selectors";
import {ValidationService} from "../../services/validation.service";

@Component({
  selector: 'app-edit-desc',
  templateUrl: './edit-desc.component.html',
  styleUrls: ['./edit-desc.component.scss']
})
export class EditDescComponent implements OnInit {
  public errors: { [key: string]: string } = {};
  public id = new FormControl
  public text = new FormControl
  public imgUrl

  public form: FormGroup<{
    id: FormControl<number>;
    text: FormControl<string>;
    imgUrl: FormControl<File>;
  }> | undefined
 public file
  constructor(public store$: Store, public validationService: ValidationService) {
  }
  getFile (event: any){
    this.form?.patchValue({imgUrl: event.target.files[0]})
    )
  }
  submitFormHandler(): void {
    if(this.form?.invalid){
      this.errors = this.validationService.GetValidationMessage(this.form, this.errors)
    }else{
      this.errors = {}
      this.store$.dispatch(setEditDescForm({
        id: this.id.value,
        text: this.text.value,
        imgUrl: this.imgUrl
      }))
      this.store$.dispatch(submitEditDescForm())
    }
  }

  ngOnInit(): void {
    this.id = new FormControl(null, [Validators.required])
    this.text = new FormControl(null, [Validators.required])
    this.imgUrl = new FormControl(null, [Validators.required])

    this.store$.select(selectEditInfoFormInput).subscribe(info => {
      this.id.setValue(info.id)
      this.text.setValue(info.text)
      this.imgUrl.setValue(info.imgUrl)
    })

    this.form = new FormGroup({
      id: this.id,
      text: this.text,
      imgUrl: this.imgUrl,
    })

  }

}
