import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  DeleteDescDocument,
  MutationDeleteDescArgs,
  MutationUpdateDescArgs,
  UpdateDescDocument,
  UpdateDescMutation
} from "../../../../generated/graphql";
import {GraphqlService} from "../../../services/graphql.service";
import {HttpClient} from '@angular/common/http';
import {switchMap, withLatestFrom} from "rxjs";
import {map} from "rxjs/operators";
import {getInfo, okay} from "../../../store/app.actions";
import {Store} from "@ngrx/store";
import {submitDeleteDesc, submitEditDescForm} from "./edit-desc.actions";
import {selectDeleteDescID, selectEditInfoFormInput} from "./edit-desc.selectors";
import {setEditDescVisible} from "../../login/store/login-modal.actions";
import {NotificationService} from "../../../services/notification.service";

@Injectable()
export class EditDescEffects extends GraphqlService {
  constructor(
    private actions$: Actions,
    public notificationService: NotificationService,
    public store$: Store,
    override httpClient: HttpClient) {
    super(httpClient);
  }

    deleteDesc$ = createEffect(() =>
      this.actions$.pipe(ofType(submitDeleteDesc),
        withLatestFrom(this.store$),
        switchMap(([_, state]) => {

            let deleteDescID = selectDeleteDescID(state)

            return this.doRequest<UpdateDescMutation>(DeleteDescDocument, {
              input: {
                id: deleteDescID
              }

            } as MutationDeleteDescArgs)
              .pipe(
                map(
                  ({result}) => {
                    switch (result.__typename) {
                      case "GetDesc":{
                        this.store$.dispatch(setEditDescVisible(undefined))
                        this.store$.dispatch(getInfo())
                        break
                      }
                    }
                    return okay()
                  }))

          }
        )
      ))


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
                      this.notificationService.addNotification({typeId: 0, message: 'Описание успешно изменена'})
                      this.store$.dispatch(setEditDescVisible(undefined))
                      this.store$.dispatch(getInfo())
                      break
                    }
                    case "NotFoundError":{
                      this.notificationService.addNotification({typeId: 1, message: "Описание не найдено"})
                      break
                    }
                    case "UnexpectedError":{
                      this.notificationService.addNotification({typeId: 1, message: "Непредвиденная ошибка"})
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
