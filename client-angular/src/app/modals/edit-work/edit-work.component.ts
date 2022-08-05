import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { selectWorks } from '../../store/app.selectors';
import { Store } from '@ngrx/store';
import { setEditWorkVisible } from '../login/store/login-modal.actions';
import { selectCurrentWorkID } from '../login/store/login-modal.selectors';
import { GetTag, GetWork } from '../../../generated/graphql';
import {
  addTag,
  getTags,
  removeTag,
  setEditWorkForm,
  submitEditWorkForm,
} from './store/edit-work.actions';
import { ValidationService } from '../../services/validation.service';
import {
  selectEditFormTags,
  selectFilterTags,
} from './store/edit-work.selectors';
import { deleteWork } from '../edit-info/store/edit-info.actions';

@Component({
  selector: 'app-edit-work',
  templateUrl: './edit-work.component.html',
  styleUrls: ['./edit-work.component.scss'],
})
export class EditWorkComponent implements OnInit {
  public errors: { [key: string]: string } = {};
  public name = new FormControl();
  public nameRu = new FormControl();
  public description = new FormControl();
  public descriptionRu = new FormControl();
  public tags = [] as any;
  public allTags = [] as any;
  public github = new FormControl();
  public figma = new FormControl();
  public demo = new FormControl();
  public form = {} as FormGroup<{
    name: FormControl<string>;
    description: FormControl<string>;
    demo: FormControl<string>;
    github: FormControl<string>;
    figma: FormControl<string>;
  }>;
  public currentWork = {} as GetWork | undefined;

  constructor(
    public store$: Store,
    public validationService: ValidationService
  ) {}

  deleteWorkHandler(): void {
    this.store$.dispatch(deleteWork());
  }

  closeModalHandler(): void {
    this.store$.dispatch(setEditWorkVisible(undefined));
  }

  remove(tag: GetTag): void {
    this.store$.dispatch(removeTag(tag));
  }

  add(tag: GetTag): void {
    this.store$.dispatch(addTag(tag));
  }

  submitForm(): void {
    if (this.form?.invalid) {
      this.errors = this.validationService.GetValidationMessage(
        this.form,
        this.errors
      );
    } else {
      this.errors = {};
      this.store$.dispatch(
        setEditWorkForm({
          id: this.currentWork?.id,
          name: {
            translations: [
              {
                field: this.name.value,
                locale: 1,
              },
              {
                field: this.nameRu.value,
                locale: 2,
              },
            ],
          },
          description: {
            translations: [
              {
                field: this.description.value,
                locale: 1,
              },
              {
                field: this.descriptionRu.value,
                locale: 2,
              },
            ],
          },
          demo: this.demo.value,
          github: this.github.value,
          tags: this.tags.reduce((idArray, tagObj) => {
            idArray.push(tagObj.id);
            return idArray;
          }, []),
          figma: this.figma.value,
        })
      );
      this.store$.dispatch(submitEditWorkForm());
    }
  }

  ngOnInit(): void {
    this.name = new FormControl(null, [Validators.required]);
    this.description = new FormControl(null, [Validators.required]);
    this.github = new FormControl(null, [Validators.required]);
    this.figma = new FormControl(null);
    this.demo = new FormControl(null, [Validators.required]);

    this.store$.dispatch(getTags());
    this.store$
      .select(selectCurrentWorkID)
      .subscribe(work => (this.currentWork = work));
    this.store$.select(selectWorks).subscribe(works => {
      if (works?.length && this.currentWork) {
        this.name.setValue(this.currentWork.name.translations[0]?.field);
        this.nameRu.setValue(this.currentWork.name.translations[1]?.field);
        this.description.setValue(
          this.currentWork.description.translations[0]?.field
        );
        this.descriptionRu.setValue(
          this.currentWork.description.translations[1]?.field
        );
        this.github.setValue(this.currentWork.github);
        this.figma.setValue(this.currentWork.figma);
        this.demo.setValue(this.currentWork.demo);
      }
      this.store$.select(selectEditFormTags).subscribe(value => {
        this.tags = value;
      });
      this.store$.select(selectFilterTags).subscribe(value => {
        this.allTags = value;
      });
    });
    this.form = new FormGroup({
      name: this.name,
      description: this.description,
      github: this.github,
      figma: this.figma,
      demo: this.demo,
    });
  }
}
