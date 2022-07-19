import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {setEditInfoVisible} from "../login/store/login-modal.actions";
import {Store} from "@ngrx/store";
import {selectInfo} from "../../store/app.selectors";
import {setEditInfoForm, submitEditInfoForm} from "./store/edit-info.actions";
import {ValidationService} from "../../services/validation.service";

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.scss']
})
export class EditInfoComponent implements OnInit {
  public errors: { [key: string]: string } = {};
  public img = new FormControl
  public name = new FormControl
  public job = new FormControl
  public telegramTitle = new FormControl
  public telegramLink = new FormControl
  public githubTitle = new FormControl
  public githubLink = new FormControl
  public experience = new FormControl
  public form: FormGroup<{
    githubTitle: FormControl<string>;
    githubLink: FormControl<string>;
    name: FormControl<string>;
    telegramTitle: FormControl<string>;
    telegramLink: FormControl<string>;
    job: FormControl<string>;
    experience: FormControl<string>;
  }> | undefined

  constructor(public store$: Store, public validationService: ValidationService) {
  }

  closeModal(): void {
    this.store$.dispatch(setEditInfoVisible())
  }

  setImgUrlValue(e: string | ArrayBuffer | null):void{
    this.img.setValue(e)
  }
  submitForm(): void {
    if (this.form?.invalid) {
      this.errors = this.validationService.GetValidationMessage(this.form, this.errors)
    } else {
      this.store$.dispatch(setEditInfoForm({
        img:this.img.value,
        name: this.name.value, job: this.job.value,
        telegramTitle: this.telegramTitle.value, telegramLink: this.telegramLink.value,
        githubTitle: this.githubTitle.value,
        githubLink: this.githubLink.value, experience: this.experience.value
      }))

      this.store$.dispatch(submitEditInfoForm())
    }
  }

  ngOnInit(): void {
    this.name = new FormControl(null, [Validators.required])
    this.job = new FormControl(null, [Validators.required])
    this.telegramTitle = new FormControl(null, [Validators.required])
    this.telegramLink = new FormControl(null, [Validators.required])
    this.githubTitle = new FormControl(null, [Validators.required])
    this.githubLink = new FormControl(null, [Validators.required])
    this.experience = new FormControl(null, [Validators.required])

    this.store$.select(selectInfo).subscribe(info => {
      this.name.setValue(info.name)
      this.job.setValue(info.job)
      this.telegramTitle.setValue(info.contacts.telegramTitle)
      this.telegramLink.setValue(info.contacts.telegramLink)
      this.githubTitle.setValue(info.contacts.githubTitle)
      this.githubLink.setValue(info.contacts.githubLink)
      this.experience.setValue(info.experience)
      this.img.setValue(info.img)
    })

    this.form = new FormGroup({
      name: this.name,
      job: this.job,
      telegramTitle: this.telegramTitle,
      telegramLink: this.telegramLink,
      githubTitle: this.githubTitle,
      githubLink: this.githubLink,
      experience: this.experience,
    })
  }

}
