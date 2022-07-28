import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  MutationUpdateInfoArgs,
  UpdateInfoDocument,
  UpdateInfoMutation,
} from '../../../../generated/graphql';
import { GraphqlService } from '../../../services/graphql.service';
import { HttpClient } from '@angular/common/http';
import { switchMap, withLatestFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { getInfo, okay } from '../../../store/app.actions';
import { Store } from '@ngrx/store';
import { submitEditInfoForm } from './edit-info.actions';
import { selectEditInfoFormInput } from './edit-info.selectors';
import { setEditInfoVisible } from '../../login/store/login-modal.actions';
import { NotificationService } from '../../../services/notification.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class EditInfoEffects extends GraphqlService {
  constructor(
    private actions$: Actions,
    public notificationService: NotificationService,
    public store$: Store,
    override httpClient: HttpClient,
    override cookieService: CookieService
  ) {
    super(httpClient, cookieService);
  }

  submitEditInfoForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(submitEditInfoForm),
      withLatestFrom(this.store$),
      switchMap(([_, state]) => {
        let editInfoInputs = selectEditInfoFormInput(state);

        return this.doRequest<UpdateInfoMutation>(UpdateInfoDocument, {
          input: {
            name: editInfoInputs.name,
            img: editInfoInputs.img,
            experience: editInfoInputs.experience.replace(/\r?\n/g, ''),
            telegramTitle: editInfoInputs.telegramTitle,
            telegramLink: editInfoInputs.telegramLink,
            githubTitle: editInfoInputs.githubTitle,
            githubLink: editInfoInputs.githubLink,
            job: editInfoInputs.job,
          },
        } as MutationUpdateInfoArgs).pipe(
          map(({ result }) => {
            switch (result.__typename) {
              case 'GetInfo': {
                this.store$.dispatch(getInfo());
                this.store$.dispatch(setEditInfoVisible());
                this.notificationService.addSuccessNotification(
                  'Информация успешно изменена'
                );
                break;
              }
              default: {
                this.notificationService.addErrorNotification();
              }
            }
            return okay();
          })
        );
      })
    )
  );
}
