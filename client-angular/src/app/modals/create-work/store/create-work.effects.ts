import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {CreateWorkDocument, CreateWorkMutation, MutationCreateWorkArgs} from "../../../../generated/graphql";
import {GraphqlService} from "../../../services/graphql.service";
import {HttpClient} from '@angular/common/http';
import {switchMap, withLatestFrom} from "rxjs";
import {map} from "rxjs/operators";
import {getWorks, okay} from "../../../store/app.actions";
import {Store} from "@ngrx/store";
import {submitCreateWorkForm,} from "./create-work.actions";
import {setCreateWorkVisible} from "../../login/store/login-modal.actions";
import {selectCreateFormInput} from "./create-work.selectors";
import {NotificationService} from "../../../services/notification.service";

@Injectable()
export class CreateWorkEffects extends GraphqlService {
  constructor(
    private actions$: Actions,
    public notificationService: NotificationService,
    public store$: Store,
    override httpClient: HttpClient) {
    super(httpClient);
  }

  submitCreateWorkForm$ = createEffect(() =>
    this.actions$.pipe(ofType(submitCreateWorkForm),
      withLatestFrom(this.store$),
      switchMap(([_, state]) => {
          let createWorkInputs = selectCreateFormInput(state)

          return this.doRequest<CreateWorkMutation>(CreateWorkDocument, {
            input: {
              name: createWorkInputs.name,
              description: createWorkInputs.description.replace(/\r?\n/g, ""),
              demo: createWorkInputs.demo,
              figma: createWorkInputs.figma,
              tags: createWorkInputs.tags,
              github: createWorkInputs.github,

            }
          } as MutationCreateWorkArgs)
            .pipe(map(({result}) => {
              switch (result.__typename) {
                case "GetWork": {
                  this.store$.dispatch(getWorks())
                  this.store$.dispatch(setCreateWorkVisible())
                  this.notificationService.addNotification({typeId: 0, message: 'Работа успешно создана'})
                  break
                }
                default:{
                  this.notificationService.addNotification({typeId: 1, message: "Непредвиденная ошибка"})
                }
              }
              return okay()

            }))

        }
      )
    ))
}
