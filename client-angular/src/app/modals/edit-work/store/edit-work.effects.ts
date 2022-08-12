import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  DeleteWorkDocument,
  DeleteWorkMutation,
  MutationDeleteWorkArgs,
  MutationUpdateWorkArgs,
  UpdateWorkDocument,
  UpdateWorkMutation,
} from '../../../../generated/graphql';
import { GraphqlService } from '../../../services/graphql.service';
import { HttpClient } from '@angular/common/http';
import { switchMap, withLatestFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { getWorks, okay } from '../../../store/app.actions';
import { Store } from '@ngrx/store';
import { submitEditWorkForm } from './edit-work.actions';
import { selectEditFormInput } from './edit-work.selectors';
import { deleteWork } from '../../edit-info/store/edit-info.actions';
import { NotificationService } from '../../../services/notification.service';
import { CookieService } from 'ngx-cookie-service';
import { selectCurrentWorkID } from '../../modal/store/modal.selectors';
import { setEditWorkVisible } from '../../modal/store/modal.actions';

@Injectable()
export class EditWorkEffects extends GraphqlService {
  constructor(
    private actions$: Actions,
    override store$: Store,
    public notificationService: NotificationService,
    override httpClient: HttpClient,
    override cookieService: CookieService
  ) {
    super(httpClient, cookieService, store$);
  }

  deleteWork$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteWork),
      withLatestFrom(this.store$),
      switchMap(([_, state]) => {
        return this.doRequest<DeleteWorkMutation>(DeleteWorkDocument, {
          input: {
            id: selectCurrentWorkID(state)?.id,
          },
        } as MutationDeleteWorkArgs).pipe(
          map(({ result }) => {
            switch (result.__typename) {
              case 'DeleteWorkResult': {
                this.store$.dispatch(getWorks());
                this.store$.dispatch(setEditWorkVisible(undefined));
                this.notificationService.addSuccessNotification(
                  'Работа успешно удалена'
                );
                break;
              }
              case 'NotFoundError': {
                this.notificationService.addErrorNotification(
                  'Работа не найдена'
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

  submitEditWorkForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(submitEditWorkForm),
      withLatestFrom(this.store$),
      switchMap(([_, state]) => {
        let editWorkInputs = selectEditFormInput(state);

        return this.doRequest<UpdateWorkMutation>(UpdateWorkDocument, {
          input: {
            id: editWorkInputs.id,
            name: editWorkInputs.name,
            description: editWorkInputs.description,
            demo: editWorkInputs.demo,
            figma: editWorkInputs.figma,
            tags: editWorkInputs.tags,
            github: editWorkInputs.github,
          },
        } as unknown as MutationUpdateWorkArgs).pipe(
          map(({ result }) => {
            switch (result.__typename) {
              case 'GetWork': {
                this.store$.dispatch(getWorks());
                this.store$.dispatch(setEditWorkVisible(undefined));
                this.notificationService.addSuccessNotification(
                  'Работа успешно отредактирована'
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
