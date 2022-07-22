import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setCreateWorkVisible } from '../login/store/login-modal.actions';
import { GetTag } from '../../../generated/graphql';
import { ValidationService } from '../../services/validation.service';
import {
  addTag,
  getTags,
  removeTag,
} from '../edit-work/store/edit-work.actions';
import {
  setCreateWorkForm,
  submitCreateWorkForm,
} from './store/create-work.actions';
import {
  selectEditFormTags,
  selectFilterTags,
} from '../edit-work/store/edit-work.selectors';

@Component({
  selector: 'app-create-work',
  templateUrl: './create-work.component.html',
  styleUrls: ['./create-work.component.scss'],
})
export class CreateWorkComponent implements OnInit {
  public errors: { [key: string]: string } = {};
  public name = new FormControl();
  public description = new FormControl();
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

  constructor(
    public store$: Store,
    public validationService: ValidationService
  ) {}

  closeModal(): void {
    this.store$.dispatch(setCreateWorkVisible());
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
        setCreateWorkForm({
          name: this.name.value,
          description: this.description.value,
          demo: this.demo.value,
          github: this.github.value,
          tags: this.tags.reduce((idArray, tagObj) => {
            idArray.push(tagObj.id);
            return idArray;
          }, []),
          figma: this.figma.value,
        })
      );
      this.store$.dispatch(submitCreateWorkForm());
    }
  }

  ngOnInit(): void {
    this.name = new FormControl(null, [Validators.required]);
    this.description = new FormControl(null, [Validators.required]);
    this.github = new FormControl(null, [Validators.required]);
    this.figma = new FormControl(null);
    this.demo = new FormControl(null, [Validators.required]);

    this.store$.dispatch(getTags());
    this.store$.select(selectEditFormTags).subscribe(value => {
      this.tags = value;
    });
    this.store$.select(selectFilterTags).subscribe(value => {
      this.allTags = value;
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
