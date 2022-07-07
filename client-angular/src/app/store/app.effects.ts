import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {GetInfoDocument, GetInfoQuery, GetWorksDocument, GetWorksQuery} from "../../generated/graphql";
import {GrapqlService} from "../services/grapql.service";
import {HttpClient} from '@angular/common/http';
import {getInfo, getWorks, setInfo, setWorks} from "./app.actions";
import {switchMap} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class AppEffects extends GrapqlService {
  constructor(
    private actions$: Actions,
    override httpClient: HttpClient) {
    super(httpClient);
  }

  getWorks$ = createEffect(() =>
    this.actions$.pipe(ofType(getWorks),
      switchMap(() => {

        return this.doRequest<GetWorksQuery>(GetWorksDocument, {})
          .pipe(map(({result}) =>
            setWorks(result)
          ))
      }))
  )

  getInfo$ = createEffect(() =>
    this.actions$.pipe(ofType(getInfo),
      switchMap(() => {

        return this.doRequest<GetInfoQuery>(GetInfoDocument, {})
          .pipe(map(({result}) =>

              setInfo(result)
            )
          );
      }))
  );
}
