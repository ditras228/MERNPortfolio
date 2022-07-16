import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {MutationUpdateInfoArgs, UpdateInfoDocument, UpdateInfoMutation} from "../../../../generated/graphql";
import {GrapqlService} from "../../../services/grapql.service";
import {HttpClient} from '@angular/common/http';
import {switchMap, withLatestFrom} from "rxjs";
import {map} from "rxjs/operators";
import {getInfo, okay} from "../../../store/app.actions";
import {Store} from "@ngrx/store";
import {submitEditInfoForm} from "./edit-info.actions";
import {selectEditInfoFormInput} from "./edit-info.selectors";
import {setEditInfoVisible} from "../../login/store/login-modal.actions";

@Injectable()
export class EditInfoEffects extends GrapqlService {
  constructor(
    private actions$: Actions,
    public store$: Store,
    override httpClient: HttpClient) {
    super(httpClient);
  }

  submitEditInfoForm$ = createEffect(() =>
    this.actions$.pipe(ofType(submitEditInfoForm),
      withLatestFrom(this.store$),
      switchMap(([_, state]) => {
          let editInfoInputs = selectEditInfoFormInput(state)

          return this.doRequest<UpdateInfoMutation>(UpdateInfoDocument, {
            input: {
              name: editInfoInputs.name,
              desc: editInfoInputs.desc,
              experience: editInfoInputs.experience.replace(/\r?\n/g, ""),
              telegramTitle: editInfoInputs.telegramTitle,
              telegramLink: editInfoInputs.telegramLink,
              githubTitle: editInfoInputs.githubTitle,
              githubLink: editInfoInputs.githubLink,
              job: editInfoInputs.job,
            }
          } as MutationUpdateInfoArgs)
            .pipe(map((data) => {
              this.store$.dispatch(getInfo())
              this.store$.dispatch(setEditInfoVisible())
              return okay()
            }))

        }
      )
    ))
}
