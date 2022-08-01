import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { setEditInfoVisible } from '../login/store/login-modal.actions';
import { Store } from '@ngrx/store';
import { selectInfo } from '../../store/app.selectors';
import { setEditInfoForm, submitEditInfoForm } from './store/edit-info.actions';
import { ValidationService } from '../../services/validation.service';
import { GetInfo } from '../../../generated/graphql';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.scss'],
})
export class EditInfoComponent implements OnInit {
  public info = {} as GetInfo;
  public errors: { [key: string]: string } = {};
  public img = new FormControl();
  public name = new FormControl();
  public nameRu = new FormControl();
  public job = new FormControl();
  public telegramTitle = new FormControl();
  public telegramLink = new FormControl();
  public githubTitle = new FormControl();
  public githubLink = new FormControl();
  public experience = new FormControl();
  public experienceRu = new FormControl();
  public form:
    | FormGroup<{
        githubTitle: FormControl<string>;
        githubLink: FormControl<string>;
        name: FormControl<string>;
        telegramTitle: FormControl<string>;
        telegramLink: FormControl<string>;
        job: FormControl<string>;
        experience: FormControl<string>;
      }>
    | undefined;

  constructor(
    public store$: Store,
    public validationService: ValidationService
  ) {}

  closeModalHandler(): void {
    this.store$.dispatch(setEditInfoVisible());
  }

  setImgUrlValue(e: string | ArrayBuffer | null): void {
    this.img.setValue(e);
  }

  submitForm(): void {
    if (this.form?.invalid) {
      this.errors = this.validationService.GetValidationMessage(
        this.form,
        this.errors
      );
    } else {
      this.store$.dispatch(
        setEditInfoForm({
          img: this.img.value,
          name: {
            translationId: 1,
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
          job: this.job.value,
          telegramTitle: this.telegramTitle.value,
          telegramLink: this.telegramLink.value,
          githubTitle: this.githubTitle.value,
          githubLink: this.githubLink.value,
          experience: {
            translationId: 1,
            translations: [
              {
                field: this.experience.value,
                locale: 1,
              },
              {
                field: this.experienceRu.value,
                locale: 2,
              },
            ],
          },
        })
      );

      this.store$.dispatch(submitEditInfoForm());
    }
  }

  ngOnInit(): void {
    this.name = new FormControl(null, [Validators.required]);
    this.job = new FormControl(null, [Validators.required]);
    this.telegramTitle = new FormControl(null, [Validators.required]);
    this.telegramLink = new FormControl(null, [Validators.required]);
    this.githubTitle = new FormControl(null, [Validators.required]);
    this.githubLink = new FormControl(null, [Validators.required]);
    this.experience = new FormControl(null, [Validators.required]);

    this.store$.select(selectInfo).subscribe(info => {
      this.info = info;
      this.name.setValue(info.name.translations[0]?.field);
      this.nameRu.setValue(info.name.translations[1]?.field || info.name.field);
      this.job.setValue(info.job);
      this.telegramTitle.setValue(info.contacts.telegramTitle);
      this.telegramLink.setValue(info.contacts.telegramLink);
      this.githubTitle.setValue(info.contacts.githubTitle);
      this.githubLink.setValue(info.contacts.githubLink);
      this.experience.setValue(info.experience.translations[0]?.field);
      this.experienceRu.setValue(
        info.experience.translations[1]?.field || info.experience.field
      );
      this.img.setValue(info.img);
    });

    this.form = new FormGroup({
      name: this.name,
      job: this.job,
      telegramTitle: this.telegramTitle,
      telegramLink: this.telegramLink,
      githubTitle: this.githubTitle,
      githubLink: this.githubLink,
      experience: this.experience,
    });
  }
}
