import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {selectWorks} from "../../store/app.selectors";
import {Store} from "@ngrx/store";
import {getTags, setEditWorkVisible} from "../login/store/login-modal.actions";
import {selectCurrentWorkID, selectTags} from "../login/store/login-modal.selectors";
import {GetTag, GetWork} from "../../../generated/graphql";
import {setEditWorkForm, submitEditWorkForm} from "./store/edit-work.actions";
import {ValidationService} from "../../services/validation.service";

@Component({
  selector: 'app-edit-work',
  templateUrl: './edit-work.component.html',
  styleUrls: ['./edit-work.component.scss']
})
export class EditWorkComponent implements OnInit {
  public errors: { [key: string]: string } = {};
  public name = new FormControl
  public description = new FormControl
  public tags = [] as any
  public allTags = [] as any
  public github = new FormControl
  public figma = new FormControl
  public demo = new FormControl
  public form = {} as FormGroup<{
    name: FormControl<string>;
    description: FormControl<string>;
    demo: FormControl<string>;
    github: FormControl<string>;
    figma: FormControl<string>;
  }>
  public currentWork = {} as GetWork | undefined

  constructor(public store$: Store, public validationService: ValidationService) {
  }

  closeModal(): void {
    this.store$.dispatch(setEditWorkVisible(undefined))
  }

  remove(i) {
    this.allTags.push(this.tags[i])
    this.tags = this.tags.filter(item => item.id !== i)
  }

  add(i) {
    this.tags = this.tags.push(this.allTags[i])
    this.allTags = this.allTags.filter(item => item.id !== i)

  }

  submitForm(): void {
    if (this.form?.invalid) {
      this.errors = this.validationService.GetValidationMessage(this.form, this.errors)
    } else {
      this.store$.dispatch(setEditWorkForm(
        {
          id: this.currentWork?.id || -1,
          name: this.name.value,
          description: this.description.value,
          demo: this.demo.value,
          github: this.github.value,
          tags: this.allTags.reduce((idArray, tagObj) => {
            idArray.push(tagObj.id)
            return idArray
          }, []),
          figma: this.figma.value,
        }
      ))
      this.store$.dispatch(submitEditWorkForm())
    }

  }

  ngOnInit(): void {
    this.name = new FormControl(null, [Validators.required])
    this.description = new FormControl(null, [Validators.required])
    this.github = new FormControl(null, [Validators.required])
    this.figma = new FormControl(null, [Validators.required])
    this.demo = new FormControl(null, [Validators.required])


    this.store$.dispatch(getTags())
    this.store$.select(selectCurrentWorkID).subscribe(work => this.currentWork = work)
    this.store$.select(selectWorks).subscribe(works => {

      if (works?.length && this.currentWork) {
        this.name.setValue(this.currentWork.name);
        this.description.setValue(this.currentWork.description);
        this.github.setValue(this.currentWork.github);
        this.figma.setValue(this.currentWork.figma);
        this.demo.setValue(this.currentWork.demo);
      }

      this.store$.select(selectTags).subscribe(value => {


        // this.allTags = value.filter(
        //   (array22) =>
        //     works && !works[this.currentWork?.id || -1]
        //       .tags.some((array11) => array11?.id === array22?.id));


      })
    })
    this.form = new FormGroup({
      name: this.name,
      description: this.description,
      github: this.github,
      figma: this.figma,
      demo: this.demo,
    })
  }
}
