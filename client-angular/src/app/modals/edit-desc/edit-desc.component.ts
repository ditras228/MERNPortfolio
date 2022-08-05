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
import { GetDesc, GetWork } from '../../../generated/graphql';
import { selectCurrentDesc } from '../modal/store/modal.selectors';
import { setEditDescVisible } from '../modal/store/modal.actions';

@Component({
  selector: 'app-edit-desc',
  templateUrl: './edit-desc.component.html',
  styleUrls: ['./edit-desc.component.scss'],
})
export class EditDescComponent implements OnInit {
  public errors: { [key: string]: string } = {};
  public text = new FormControl();
  public textRu = new FormControl();
  public img = new FormControl();
  public form:
    | FormGroup<{
        text: FormControl<string>;
        textRu: FormControl<string>;
        imgUrl: FormControl<string>;
      }>
    | undefined;

  public currentDesc = {} as GetDesc | undefined;

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
    this.store$.dispatch(setDeleteDesc(this.currentDesc?.id || 0));
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
          id: this.currentDesc?.id || 0,
          text: {
            translations: [
              {
                field: this.text.value,
                locale: 1,
              },
              {
                field: this.textRu.value,
                locale: 2,
              },
            ],
          },

          img: this.img.value,
        })
      );
      this.store$.dispatch(submitEditDescForm());
    }
  }

  ngOnInit(): void {
    this.text = new FormControl(null, [Validators.required]);
    this.img = new FormControl(null, [Validators.required]);

    this.store$.select(selectCurrentDesc).subscribe(info => {
      this.currentDesc = info;
      this.text.setValue(this.currentDesc?.text.translations[0]?.field);
      this.textRu.setValue(this.currentDesc?.text.translations[1]?.field);
      this.img.setValue(info?.img);
    });

    this.form = new FormGroup({
      text: this.text,
      textRu: this.text,
      imgUrl: this.img,
    });
  }
}
