import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  AuthDocument,
  AuthMutation,
  AuthMutationVariables,
  GetTagsDocument,
  GetTagsQuery,
  GetTagsQueryVariables
} from "../../../../generated/graphql";
import {GraphqlService} from "../../../services/graphql.service";
import {HttpClient} from '@angular/common/http';
import {switchMap, withLatestFrom} from "rxjs";
import {map} from "rxjs/operators";
import {setAuth, setError, setLoginVisible, submitLoginForm} from "./login-modal.actions";
import {okay} from "../../../store/app.actions";
import {Store} from "@ngrx/store";
import {selectLoginInput} from "./login-modal.selectors";
import {getTags, setFilterTags, setTags} from "../../edit-work/store/edit-work.actions";
import {CookieService} from "ngx-cookie-service";
import {AuthService} from "../../../services/auth.service";

@Injectable()
export class LoginEffects extends GraphqlService {
  constructor(
    private actions$: Actions,
    public store$: Store,
    public authService: AuthService,
    override httpClient: HttpClient) {
    super(httpClient);
  }

  getTags$ = createEffect(() =>
    this.actions$.pipe(ofType(getTags),
      withLatestFrom(this.store$),
      switchMap(([_, state]) => {
          return this.doRequest<GetTagsQuery>(GetTagsDocument, {} as GetTagsQueryVariables)
            .pipe(map((data) => {
              this.store$.dispatch(setTags(data.result))
              this.store$.dispatch(setFilterTags())

                return okay()
              }
            ))
        }
      )
    ))
  setLoginForm$ = createEffect(() =>
    this.actions$.pipe(ofType(submitLoginForm),
      withLatestFrom(this.store$),
      switchMap(([_, state]) => {
        const formValues = selectLoginInput(state)
        return this.doRequest<AuthMutation>(AuthDocument, {
          input: {
            ...formValues
          }
        } as AuthMutationVariables)
          .pipe(map(({auth}) => {
              switch (auth.__typename) {
                case "NotFoundError": {
                  this.store$.dispatch(setError({id: 0, message: auth.message}))
                  break
                }
                case "WrongPassword": {
                  this.store$.dispatch(setError({id: 1, message: auth.message}))
                  break
                }
                case "User": {
                  this.authService.login(auth.accessToken)
                  break
                }
                default: {
                  this.store$.dispatch(setError({id: 2, message: 'Непредвиденная ошибка'}))
                  break
                }
              }
              return okay()
            }
          ))
      }))
  )
}
