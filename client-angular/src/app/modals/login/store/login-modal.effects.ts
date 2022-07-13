import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  AuthDocument, AuthMutation,
  AuthMutationVariables,
  GetInfoQuery,
  GetWorksDocument,
  GetWorksQuery
} from "../../../../generated/graphql";
import {GrapqlService} from "../../../services/grapql.service";
import {HttpClient} from '@angular/common/http';
import {switchMap, withLatestFrom} from "rxjs";
import {map} from "rxjs/operators";
import {setLoginForm, submitLoginForm} from "./login-modal.actions";
import {okay} from "../../../store/app.actions";
import {Store} from "@ngrx/store";
import {selectLoginInput} from "./login-modal.selectors";

@Injectable()
export class LoginEffects extends GrapqlService {
  constructor(
    private actions$: Actions,
    public store$: Store,
    override httpClient: HttpClient) {
    super(httpClient);
  }

  setLoginForm$ = createEffect(() =>
    this.actions$.pipe(ofType(submitLoginForm),
      withLatestFrom(this.store$),
      switchMap(([_, state]) => {
        const formValues = selectLoginInput(state)
        console.log(formValues.login)
        return this.doRequest<AuthMutation>(AuthDocument, {input:{login: formValues.login, password: formValues.password}} as AuthMutationVariables)
          .pipe(map(({auth}) => {
              if (auth.__typename === "NotFoundError") {
                console.log('err!')
              }
              if (auth.__typename === "User") {
                setLoginForm(auth)
              }

              return okay()
            }
          ))
      }))
  )
}
