import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  setDeleteDesc,
  setEditDescForm,
  submitDeleteDesc,
  submitEditDescForm,
} from './store/edit-desc.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { setEditDescVisible } from '../login/store/login-modal.actions';
import { selectCurrentDesc } from '../login/store/login-modal.selectors';

@Component({
  selector: 'app-edit-desc',
  templateUrl: './edit-desc.component.html',
  styleUrls: ['./edit-desc.component.scss'],
})
export class EditDescComponent implements OnInit {
  public errors: { [key: string]: string } = {};
  public text = new FormControl();
  public img = new FormControl();
  public id;
  public form:
    | FormGroup<{
        id: FormControl<number>;
        text: FormControl<string>;
        imgUrl: FormControl<string>;
      }>
    | undefined;

  constructor(
    public store$: Store,
    public validationService: ValidationService
  ) {}

  closeModalHandler(): void {
    this.store$.dispatch(setEditDescVisible(undefined));
  }

  setImgUrlValue(e: string | ArrayBuffer | null): void {
    this.img.setValue(e);
  }
  deleteDescHandler(): void {
    this.store$.dispatch(setDeleteDesc(this.id));
    this.store$.dispatch(submitDeleteDesc());
  }
  submitFormHandler(): void {
    if (this.form?.invalid) {
      this.errors = this.validationService.GetValidationMessage(
        this.form,
        this.errors
      );
    } else {
      this.errors = {};
      this.store$.dispatch(
        setEditDescForm({
          id: this.id,
          text: this.text.value,
          img: this.img.value,
        })
      );
      this.store$.dispatch(submitEditDescForm());
    }
  }

  ngOnInit(): void {
    this.id = new FormControl(null, [Validators.required]);
    this.text = new FormControl(null, [Validators.required]);
    this.img = new FormControl(null, [Validators.required]);

    this.store$.select(selectCurrentDesc).subscribe(info => {
      this.id = info?.id;
      this.text.setValue(info?.text);
      this.img.setValue(info?.img);
    });

    this.form = new FormGroup({
      id: this.id,
      text: this.text,
      imgUrl: this.img,
    });
  }
}
