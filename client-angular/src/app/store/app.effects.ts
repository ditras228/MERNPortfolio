import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {GetInfoDocument, GetInfoQuery, GetWorksDocument, GetWorksQuery, Work} from "../../generated/graphql";
import {GrapqlService} from "../../grapql.service";
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


//   return this.feedbackService.getFeedbackList({ input }).pipe(
//     map(({ result }) => {
//   if (result.__typename === 'FeedbacksResult') {
//     return setFeedbacks({ feedbacks: result?.data });
//   }
//   return ok({ label: 'how-to-buy-page.fetchFeedbacks' });
// }),
// catchError(err => of(failure({ error: err })))
// );
//


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
