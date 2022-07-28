import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  GetInfoDocument,
  GetInfoQuery,
  GetWorksDocument,
  GetWorksQuery,
} from '../../generated/graphql';
import { GraphqlService } from '../services/graphql.service';
import { HttpClient } from '@angular/common/http';
import { getInfo, getWorks, setInfo, setWorks } from './app.actions';
import { switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AppEffects extends GraphqlService {
  constructor(
    private actions$: Actions,
    override httpClient: HttpClient,
    override cookieService: CookieService
  ) {
    super(httpClient, cookieService);
  }

  getWorks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getWorks),
      switchMap(() => {
        return this.doRequest<GetWorksQuery>(GetWorksDocument, {}).pipe(
          map(({ result }) => setWorks(result))
        );
      })
    )
  );

  getInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getInfo),
      switchMap(() => {
        return this.doRequest<GetInfoQuery>(GetInfoDocument, {}).pipe(
          map(({ result }) => setInfo(result))
        );
      })
    )
  );
}
