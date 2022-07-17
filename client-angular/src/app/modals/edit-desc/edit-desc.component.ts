import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {setEditDescForm, submitEditDescForm} from "./store/edit-desc.actions";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {selectEditInfoFormInput} from "./store/edit-desc.selectors";
import {ValidationService} from "../../services/validation.service";
import {setEditDescVisible, setEditInfoVisible} from "../login/store/login-modal.actions";

@Component({
  selector: 'app-edit-desc',
  templateUrl: './edit-desc.component.html',
  styleUrls: ['./edit-desc.component.scss']
})
export class EditDescComponent implements OnInit {
  public errors: { [key: string]: string } = {};
  public id = new FormControl
  public text = new FormControl
  public imgUrl = new FormControl

  public form: FormGroup<{
    id: FormControl<number>;
    text: FormControl<string>;
    imgUrl: FormControl<string>;
  }> | undefined
  constructor(public store$: Store, public validationService: ValidationService) {
  }

  closeModal(): void {
    this.store$.dispatch(setEditDescVisible())
  }

  getFile (event: any){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend =() =>{
      this.imgUrl.setValue(reader.result)
    }
    reader.readAsDataURL(file);
  }
  submitFormHandler(): void {
    if(this.form?.invalid){
      this.errors = this.validationService.GetValidationMessage(this.form, this.errors)
    }else{
      this.errors = {}
      this.store$.dispatch(setEditDescForm({
        id: this.id.value,
        text: this.text.value,
        imgUrl: this.imgUrl.value
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
