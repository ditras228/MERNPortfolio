import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {MutationUpdateWorkArgs, UpdateWorkDocument, UpdateWorkMutation} from "../../../../generated/graphql";
import {GrapqlService} from "../../../services/grapql.service";
import {HttpClient} from '@angular/common/http';
import {switchMap, withLatestFrom} from "rxjs";
import {map} from "rxjs/operators";
import {okay} from "../../../store/app.actions";
import {Store} from "@ngrx/store";
import {submitEditWorkForm} from "./edit-work.actions";
import {selectEditFormInput} from "./edit-work.selectors";

@Injectable()
export class EditWorkEffects extends GrapqlService {
  constructor(
    private actions$: Actions,
    public store$: Store,
    override httpClient: HttpClient) {
    super(httpClient);
  }

  submitEditWorkForm$ = createEffect(() =>
    this.actions$.pipe(ofType(submitEditWorkForm),
      withLatestFrom(this.store$),
      switchMap(([_, state]) => {
          let editWorkInputs = selectEditFormInput(state)

          return this.doRequest<UpdateWorkMutation>(UpdateWorkDocument, {
            input: {
              id: editWorkInputs.id,
              name: editWorkInputs.name,
              description: editWorkInputs.description.replace(/\r?\n/g, ""),
              demo: editWorkInputs.demo,
              figma: editWorkInputs.figma,
              tags: editWorkInputs.tags,
              github: editWorkInputs.github,

            }
          } as MutationUpdateWorkArgs)
            .pipe(map((data_) => {
              return okay()
            }))

        }
      )
    ))
}
