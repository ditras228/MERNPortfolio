import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  CreateDescDocument,
  CreateDescMutation,
  MutationCreateDescArgs,
} from '../../../../generated/graphql';
import { GraphqlService } from '../../../services/graphql.service';
import { HttpClient } from '@angular/common/http';
import { switchMap, withLatestFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { getInfo, okay } from '../../../store/app.actions';
import { Store } from '@ngrx/store';
import { submitCreateDescForm } from './create-desc.actions';
import { selectEditInfoFormInput } from './create-desc.selectors';
import { setCreateDescVisible } from '../../login/store/login-modal.actions';
import { NotificationService } from '../../../services/notification.service';

@Injectable()
export class CreateDescEffects extends GraphqlService {
  constructor(
    private actions$: Actions,
    public notificationService: NotificationService,
    public store$: Store,
    override httpClient: HttpClient
  ) {
    super(httpClient);
  }

  submitCreateDescForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(submitCreateDescForm),
      withLatestFrom(this.store$),
      switchMap(([_, state]) => {
        let editDescInputs = selectEditInfoFormInput(state);

        return this.doRequest<CreateDescMutation>(CreateDescDocument, {
          input: {
            text: editDescInputs.text,
            img: editDescInputs.img,
          },
        } as MutationCreateDescArgs).pipe(
          map(({ result }) => {
            switch (result.__typename) {
              case 'GetDesc': {
                this.store$.dispatch(setCreateDescVisible());
                this.store$.dispatch(getInfo());
                this.notificationService.addSuccessNotification(
                  'Описание успешно изменено'
                );
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
