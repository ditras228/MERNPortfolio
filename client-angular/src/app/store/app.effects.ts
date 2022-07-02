import {Injectable} from "@angular/core";
import {getHabitsSuccessAction, setInfo} from "./app.actions";
import {Store} from "@ngrx/store";
import {exhaustMap, map, mergeMap, switchMap, withLatestFrom} from "rxjs";
import {Effect, ofType, Actions, createEffect} from '@ngrx/effects';
import {gql, GraphQLService} from "./grapql.service";
const getHabitsQuery = gql`
  query getWorks {
    getWorks {
      demo:
      description
      figma
      github
      id
      name
      tags
    }
  }
`;
@Injectable()
export class AppEffects {
  getHabits$ = createEffect(() => {
    // Listen for the "enter home page action"
    // then issue my graphql request
    return this.actions$.pipe(
      ofType(setInfo),
      exhaustMap(() => {
        return this.graphql
          .fetch(getHabitsQuery)
          .pipe(
            map((response: any) =>
              getHabitsSuccessAction(response.data.habits)
            )
          );
      })
    )}
  );
  constructor(
    readonly graphql: GraphQLService,
    private actions$: Actions,
  ) {
  }
}
