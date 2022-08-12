import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  DeleteDescDocument,
  MutationDeleteDescArgs,
  MutationUpdateDescArgs,
  UpdateDescDocument,
  UpdateDescMutation,
} from '../../../../generated/graphql';
import { GraphqlService } from '../../../services/graphql.service';
import { HttpClient } from '@angular/common/http';
import { switchMap, withLatestFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { getInfo, okay } from '../../../store/app.actions';
import { Store } from '@ngrx/store';
import { submitDeleteDesc, submitEditDescForm } from './edit-desc.actions';
import {
  selectDeleteDescID,
  selectEditInfoFormInput,
} from './edit-desc.selectors';
import { NotificationService } from '../../../services/notification.service';
import { CookieService } from 'ngx-cookie-service';
import { setEditDescVisible } from '../../modal/store/modal.actions';

@Injectable()
export class EditDescEffects extends GraphqlService {
  constructor(
    private actions$: Actions,
    public notificationService: NotificationService,
    override store$: Store,
    override httpClient: HttpClient,
    override cookieService: CookieService
  ) {
    super(httpClient, cookieService, store$);
  }

  deleteDesc$ = createEffect(() =>
    this.actions$.pipe(
      ofType(submitDeleteDesc),
      withLatestFrom(this.store$),
      switchMap(([_, state]) => {
        let deleteDescID = selectDeleteDescID(state);

        return this.doRequest<UpdateDescMutation>(DeleteDescDocument, {
          input: {
            id: deleteDescID,
          },
        } as MutationDeleteDescArgs).pipe(
          map(({ result }) => {
            switch (result.__typename) {
              case 'GetDesc': {
                this.store$.dispatch(setEditDescVisible(undefined));
                this.store$.dispatch(getInfo());
                break;
              }
              case 'NotFoundError': {
                this.notificationService.addErrorNotification(result.message);
                break;
              }
              default: {
                this.notificationService.addErrorNotification(
                  'Непредвиденная ошибка'
                );
              }
            }
            return okay();
          })
        );
      })
    )
  );

  submitEditDescForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(submitEditDescForm),
      withLatestFrom(this.store$),
      switchMap(([_, state]) => {
        let editDescInputs = selectEditInfoFormInput(state);

        return this.doRequest<UpdateDescMutation>(UpdateDescDocument, {
          input: {
            id: editDescInputs.id,
            text: editDescInputs.text,
            img: editDescInputs.img,
          },
        } as MutationUpdateDescArgs).pipe(
          map(({ result }) => {
            switch (result.__typename) {
              case 'GetDesc': {
                this.notificationService.addSuccessNotification(
                  'Описание успешно изменено'
                );
                this.store$.dispatch(setEditDescVisible(undefined));
                this.store$.dispatch(getInfo());
                break;
              }
              case 'NotFoundError': {
                this.notificationService.addErrorNotification(result.message);
                break;
              }
              default: {
                this.notificationService.addErrorNotification(
                  'Непредвиденная ошибка'
                );
              }
            }

            return okay();
          })
        );
      })
    )
  );
}
