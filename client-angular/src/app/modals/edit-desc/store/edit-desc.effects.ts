import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {MutationUpdateDescArgs, UpdateDescDocument, UpdateDescMutation} from "../../../../generated/graphql";
import {GraphqlService} from "../../../services/graphql.service";
import {HttpClient} from '@angular/common/http';
import {switchMap, withLatestFrom} from "rxjs";
import {map} from "rxjs/operators";
import {getInfo, okay} from "../../../store/app.actions";
import {Store} from "@ngrx/store";
import {submitEditDescForm} from "./edit-desc.actions";
import {selectEditInfoFormInput} from "./edit-desc.selectors";
import {setEditInfoVisible} from "../../login/store/login-modal.actions";

@Injectable()
export class EditDescEffects extends GraphqlService {
  constructor(
    private actions$: Actions,
    public store$: Store,
    override httpClient: HttpClient) {
    super(httpClient);
  }


  submitEditDescForm$ = createEffect(() =>
    this.actions$.pipe(ofType(submitEditDescForm),
      withLatestFrom(this.store$),
      switchMap(([_, state]) => {

          let editDescInputs = selectEditInfoFormInput(state)

          return this.doRequest<UpdateDescMutation>(UpdateDescDocument, {
            input: {
              id: editDescInputs.id,
              text: editDescInputs.text,
              imgURL: editDescInputs.imgUrl
            }

          } as MutationUpdateDescArgs)
            .pipe(
              map(
                ({result}) => {
                  switch (result.__typename) {
                    case "GetDesc":{
                      break
                    }
                  }
                  return okay()
                }))

        }
      )
    ))
}
