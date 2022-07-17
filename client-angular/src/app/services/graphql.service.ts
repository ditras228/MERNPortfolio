import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Injectable} from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({ providedIn: "root" })
export class GraphqlService {
  constructor(protected httpClient: HttpClient) {}

   doRequest<T>(query: string, variables: any): Observable<T> {
    return this.httpClient
      .post<{ data: T }>('http://localhost:8080/grapql', { query, variables })
      .pipe(map(response => response.data));
  }
}
