import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  CreateWorkDocument,
  CreateWorkMutation,
  MutationCreateWorkArgs,
} from '../../../../generated/graphql';
import { GraphqlService } from '../../../services/graphql.service';
import { HttpClient } from '@angular/common/http';
import { switchMap, withLatestFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { getWorks, okay } from '../../../store/app.actions';
import { Store } from '@ngrx/store';
import { submitCreateWorkForm } from './create-work.actions';
import { selectCreateFormInput } from './create-work.selectors';
import { NotificationService } from '../../../services/notification.service';
import { CookieService } from 'ngx-cookie-service';
import { setCreateWorkVisible } from '../../modal/store/modal.actions';

@Injectable()
export class CreateWorkEffects extends GraphqlService {
  constructor(
    private actions$: Actions,
    public notificationService: NotificationService,
    override store$: Store,
    override httpClient: HttpClient,
    override cookieService: CookieService
  ) {
    super(httpClient, cookieService, store$);
  }

  submitCreateWorkForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(submitCreateWorkForm),
      withLatestFrom(this.store$),
      switchMap(([_, state]) => {
        let createWorkInputs = selectCreateFormInput(state);

        return this.doRequest<CreateWorkMutation>(CreateWorkDocument, {
          input: {
            name: createWorkInputs.name,
            description: createWorkInputs.description,
            demo: createWorkInputs.demo,
            figma: createWorkInputs.figma,
            tags: createWorkInputs.tags,
            github: createWorkInputs.github,
          },
        } as MutationCreateWorkArgs).pipe(
          map(({ result }) => {
            switch (result.__typename) {
              case 'GetWork': {
                this.store$.dispatch(getWorks());
                this.store$.dispatch(setCreateWorkVisible());
                this.notificationService.addSuccessNotification(
                  'Работа успешно создана'
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
